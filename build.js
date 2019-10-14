const { filesystem, prompt, system } = require('gluegun');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    var env = null;
    var dev = false;

    // Verifica se possui o argumento --env, utilizado para selecionar uma configuração automaticamente
    var envArgPosition = process.argv.indexOf('--env');
    if(envArgPosition > -1)
        env = process.argv[envArgPosition + 1];

    var envListJson = JSON.parse(filesystem.read("./env.json"));

    // Se o valor do argumento --env for dev, não realiza o build
    if(env == "dev")
        dev = true;

    console.log(`Iniciando script usando o ambiente ${env}...`);

    // Se não for ambiente dev, executa rotina de incremento de versão
    if(!dev) {
        var package = JSON.parse(filesystem.read("./package.json"));
        var versao = package.version;
        versao = versao.split(".");

        var major = Number.parseInt(versao[0]);
        var minor = Number.parseInt(versao[1]);
        var build = Number.parseInt(versao[2]);

        var { newVersion } = await prompt.ask({
            type: "select",
            name: "newVersion",
            message: "Selecione o novo número de versão:",
            choices: [
                `${major + 1}.0.0`,
                `${major}.${minor + 1}.0`,
                `${major}.${minor}.${build + 1}`,
                `${major}.${minor}.${build}`
            ]
        });

        package.version = newVersion;

        await filesystem.writeAsync("./package.json", JSON.stringify(package, null, 4));
        await sleep(300);
    }

    // Se não possuir o argumento --env, seleciona manualmente
    if(!env) {
        var envList = Object.getOwnPropertyNames(envListJson);

        var { selectedEnv } = await prompt.ask({
            type: "select",
            name: "selectedEnv",
            message: "Selecione um ambiente:",
            choices: envList
        });

        env = selectedEnv;

        console.log(envListJson[env]);
    }

    var selectedEnv = envListJson[env];

    // Escreve config.json com os parâmetros utilizados
    filesystem.write("./src/config.json", selectedEnv);

    // Se não for ambiente dev, realiza o build e pergunta se deseja publicar versão
    if(!dev) {
        console.log("Realizando build...");

        try {
            await system.run("react-scripts build");
            console.log("Build realizado com sucesso!");
        } catch(e) {
            throw e;
        }

        if(selectedEnv.dir) {
            var { publish } = await prompt.ask({
                type: "select",
                name: "publish",
                message: "Deseja publicar esta versão?",
                choices: ["Sim", "Não"]
            });

            if(publish === "Não")
                return;

            var distPath = filesystem.find(selectedEnv.dir, { matching: ["*.js", "*.css", "*.map"] });
            distPath.forEach((file) => {
                filesystem.remove(file);
            });

            filesystem.copy("./build", selectedEnv.dir, { overwrite: true });
            console.log("Publicado com sucesso!");
        }
    }
})();