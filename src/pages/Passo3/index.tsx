import React from "react";
import axios from "axios";
import { History } from "history";
import { Alerta, Form, Box, CampoEstatico, CampoTexto, Combo, TipoAlerta, Botao, TipoBotao, Row, Col, Tabela, ColunaTabela } from "@intechprev/componentes-web";

import MasterPage from "../MasterPage";
import { AdesaoService } from "../../services";
import { NacionalidadeEntidade, UFEntidade, EstadoCivilEntidade, BancoAgEntidade, LimiteContribuicaoEntidade, AdesaoDependenteEntidade, AdesaoContribEntidade, AdesaoPlanoEntidade, AdesaoDocumentoEntidade } from "../../entidades";
import { ModalIncluirDependente, StateDependente } from "./ModalIncluirDependente";
import AdesaoEntidade from "../../entidades/AdesaoEntidade";
import { StatePasso1 } from "../Passo1";
import { StatePasso2 } from "../Passo2";
import moment from "moment";

import config from '../../config.json';

declare global {
    interface Window {
        webkitRequestFileSystem: any;
        PERSISTENT: any;
    }
}

interface Props {
    history?: History;
};

interface State {
    listaSexo: Array<any>;
    listaNacionalidade: Array<NacionalidadeEntidade>;
    listaUF: Array<UFEntidade>;
    listaEstadoCivil: Array<EstadoCivilEntidade>;
    listaBancos: Array<BancoAgEntidade>;

    patrocinadora: string;
    matricula: string;
    admissao: string;
    email: string;
    nome: string;
    cpf: string;
    nascimento: string;
    sexo: string;
    nacionalidade: string;
    naturalidade: string;
    uf: string;
    rg: string;
    orgao: string;
    emissao: string;
    estadoCivil: string;
    mae: string;
    pai: string;

    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    ufEndereco: string;
    telefoneFixo: string;
    telefoneCelular: string;

    banco: string;
    agencia: string;
    agenciaDv: string;
    conta: string;
    contaDv: string;

    termoAceito: boolean;
    percentual: string;
    percentualPatrocinadora: string;
    limitePercentualPatrocinadora: LimiteContribuicaoEntidade;
    modalVisivel: any;
    listaDependentes: Array<any>;
    listaArquivos: Array<AdesaoDocumentoEntidade>;
    uploadAberto: boolean;
    nomeArquivoUpload: string;
    uploadPercentage: number;
    uploading: boolean;

    regimeImposto: string;
    listaPercentuais: Array<number>;
    politicamenteExposta: string;
    familiaPoliticamenteExposta: string;
    usperson: string;
    termo1Aceito: boolean;
    termo2Aceito: boolean;
    exigeJoia: boolean;
};

const opcoesRegimeImposto = [
    {
        name: "Não opto pelo regime regressivo estabelecido na Lei 11.053/2004",
        value: "NAO"
    },
    {
        name: "Opto pelo regime regressivo estabelecido na Lei 11.053/2004",
        value: "SIM"
    }
];


const opcoesSimNao = [
    {
        name: "Não",
        value: "NAO"
    },
    {
        name: "Sim",
        value: "SIM"
    }
];

export default class Passo3 extends React.Component<Props, State>{

    dadosPasso1: StatePasso1 = JSON.parse(localStorage.getItem("dadosPasso1"));
    dadosPasso2: StatePasso2 = JSON.parse(localStorage.getItem("dadosPasso2"));
    dadosPasso3 = JSON.parse(localStorage.getItem("dadosPasso3"));

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();

    constructor(props: Props) {
        super(props);

        var patrocinadora = this.dadosPasso1.empresas.filter((a) => a.CD_EMPRESA == this.dadosPasso1.patrocinadora)[0];

        this.state = {
            listaSexo: [],
            listaNacionalidade: [],
            listaUF: [],
            listaEstadoCivil: [],
            listaBancos: [],

            patrocinadora: patrocinadora.NOME_ENTID,
            matricula: this.dadosPasso1.matricula,
            admissao: "",
            email: "",
            nome: "Fulano",
            nascimento: "",
            sexo: "",
            cpf: "000.000.000-00",
            nacionalidade: "",
            naturalidade: "",
            uf: "",
            rg: "",
            orgao: "",
            emissao: "",
            estadoCivil: "",
            mae: "",
            pai: "",


            cep: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            ufEndereco: "",
            telefoneFixo: "",
            telefoneCelular: "",

            banco: "",
            agencia: "",
            agenciaDv: "",
            conta: "",
            contaDv: "",

            termoAceito: false,
            percentual: "",
            percentualPatrocinadora: "",
            limitePercentualPatrocinadora: new LimiteContribuicaoEntidade(),
            modalVisivel: false,
            listaDependentes: [],
            listaArquivos: [],
            uploadAberto: false,
            nomeArquivoUpload: "",
            uploadPercentage: 0,
            uploading: false,

            regimeImposto: null,
            listaPercentuais: [],
            politicamenteExposta: "false",
            familiaPoliticamenteExposta: "false",
            usperson: "false",
            termo1Aceito: false,
            termo2Aceito: false,
            exigeJoia: false
        };
    }

    componentDidMount = async () => {
        window.addEventListener("load", this.load);
        this.load();
    }

    load = async() => {
        var listaSexo = await AdesaoService.BuscarListaSexo();
        var listaUF = await AdesaoService.BuscarListaUF();
        var listaNacionalidade = await AdesaoService.BuscarListaNacionalidade();
        var listaEstadoCivil = await AdesaoService.BuscarListaEstadoCivil();
        var listaBancos = await AdesaoService.BuscarListaBancos();
        var listaPercentuais = await AdesaoService.BuscarPercentuais(this.dadosPasso2.cdPlano);

        var limitePercentualPatrocinadora = await AdesaoService.BuscarLimitePatrocinadora(this.dadosPasso2.cdPlano);

        await this.setState({
            listaSexo,
            listaUF,
            listaNacionalidade,
            listaEstadoCivil,
            listaBancos,
            listaPercentuais,
            limitePercentualPatrocinadora,
            percentualPatrocinadora: limitePercentualPatrocinadora.VAL_PERC_MINIMO_PATROC + "%",
        });

        if (this.dadosPasso1.funcionario.DT_ADMISSAO) {
            await this.setState({
                admissao: moment(this.dadosPasso1.funcionario.DT_ADMISSAO, "DD/MM/YYYY").format("DD/MM/YYYY")
            });
        }

        this.dadosPasso1 = JSON.parse(localStorage.getItem("dadosPasso1"));
        this.dadosPasso2 = JSON.parse(localStorage.getItem("dadosPasso2"));
        this.dadosPasso3 = JSON.parse(localStorage.getItem("dadosPasso3"));

        if (this.dadosPasso3)
            await this.setState(this.dadosPasso3);
    }

    alterarPercentualPatrocinadora = async () => {
        var percentualPatrocinadora = parseInt(this.state.percentual);

        if (percentualPatrocinadora > this.state.limitePercentualPatrocinadora.VAL_PERC_MAXIMO_PATROC)
            percentualPatrocinadora = this.state.limitePercentualPatrocinadora.VAL_PERC_MAXIMO_PATROC;

        await this.setState({
            percentualPatrocinadora: percentualPatrocinadora + "%"
        });
    }

    buscarTitulo = (lista: Array<any>, colunaTitulo: string, colunaValor: string, valor: any) =>
        lista.filter(x => x[colunaValor] === valor)[0][colunaTitulo];

    validarPeculio = async () => {
        var totalPercentualDependentes = 0;
        this.state.listaDependentes.forEach((dep: StateDependente) => {
            totalPercentualDependentes += parseInt(dep.percentual);
        });

        if (totalPercentualDependentes < 100) {
            await this.alert.current.adicionarErro("A soma dos percentuais de pecúlio dos dependentes deve ser igual a 100%");
            await this.form.current.setState({ valido: false });
        }
    }

    continuar = async () => {
        try {
            await this.alert.current.limparErros();
            await this.form.current.validar();
            if (this.dadosPasso2.cdPlano !== "0003" && this.state.listaDependentes.length > 0)
                await this.validarPeculio();

            if(this.state.listaArquivos.length < 1) {
                await this.alert.current.adicionarErro("É necessário anexar ao menos um documento");
                await this.form.current.setState({ valido: false });
            }

            if (this.form.current.state.valido) {
                var adesao = new AdesaoEntidade();
                adesao.COD_FUNDACAO = "01";
                adesao.COD_CPF = this.dadosPasso1.cpf;
                adesao.NOM_PESSOA = this.dadosPasso1.nome;
                adesao.DTA_NASCIMENTO = moment(this.dadosPasso1.dataNascimento, "DD/MM/YYYY").toDate();
                adesao.COD_EMPRESA = this.dadosPasso2.cdPlano;
                adesao.DES_EMPRESA = this.dadosPasso2.nomePlano;
                adesao.COD_MATRICULA = this.dadosPasso1.matricula;
                adesao.DTA_ADMISSAO = moment(this.state.admissao, "DD/MM/YYYY").toDate();
                adesao.COD_EMAIL = this.dadosPasso1.email;
                adesao.COD_SEXO = this.state.sexo;
                adesao.DES_SEXO = this.buscarTitulo(this.state.listaSexo, "Value", "Key", this.state.sexo);
                adesao.COD_NACIONALIDADE = this.state.nacionalidade;
                adesao.DES_NACIONALIDADE = this.buscarTitulo(this.state.listaNacionalidade, "DS_NACIONALIDADE", "CD_NACIONALIDADE", this.state.nacionalidade);
                adesao.COD_NATURALIDADE = this.state.naturalidade;
                adesao.DES_NATURALIDADE = this.state.naturalidade;
                adesao.COD_UF_NATURALIDADE = this.state.uf;
                adesao.DES_UF_NATURALIDADE = this.buscarTitulo(this.state.listaUF, "DS_UNID_FED", "CD_UNID_FED", this.state.uf);
                adesao.COD_RG = this.state.rg;
                adesao.DES_ORGAO_EXPEDIDOR = this.state.orgao;
                adesao.DTA_EXPEDICAO_RG = moment(this.state.emissao, "DD/MM/YYYY").toDate();
                adesao.COD_ESTADO_CIVIL = this.state.estadoCivil;
                adesao.DES_ESTADO_CIVIL = this.buscarTitulo(this.state.listaEstadoCivil, "DS_ESTADO_CIVIL", "CD_ESTADO_CIVIL", this.state.estadoCivil);
                adesao.NOM_MAE = this.state.mae;
                adesao.NOM_PAI = this.state.pai;
                adesao.COD_CEP = this.state.cep;
                adesao.DES_END_LOGRADOURO = this.state.logradouro;
                adesao.DES_END_NUMERO = this.state.numero;
                adesao.DES_END_CIDADE = this.state.cidade;
                adesao.DES_END_COMPLEMENTO = this.state.complemento;
                adesao.DES_END_BAIRRO = this.state.bairro;
                adesao.COD_END_UF = this.state.ufEndereco;
                adesao.DES_END_UF = this.buscarTitulo(this.state.listaUF, "DS_UNID_FED", "CD_UNID_FED", this.state.ufEndereco);
                adesao.COD_TELEFONE_FIXO = this.state.telefoneFixo;
                adesao.COD_TELEFONE_CELULAR = this.state.telefoneCelular;
                adesao.COD_BANCO = this.state.banco;

                if (this.state.banco)
                    adesao.DES_BANCO = this.buscarTitulo(this.state.listaBancos, "DESC_BCO_AG", "COD_BANCO", this.state.banco);

                adesao.COD_AGENCIA = this.state.agencia;
                adesao.COD_DV_AGENCIA = this.state.agenciaDv;
                adesao.COD_CONTA_CORRENTE = this.state.conta;
                adesao.COD_DV_CONTA_CORRENTE = this.state.contaDv;
                adesao.IND_PPE = this.state.politicamenteExposta;
                adesao.IND_PPE_FAMILIAR = this.state.familiaPoliticamenteExposta;
                adesao.IND_FATCA = this.state.usperson;

                adesao.Dependentes = new Array<AdesaoDependenteEntidade>();

                this.state.listaDependentes.forEach((dep: StateDependente) => {
                    var dependente = new AdesaoDependenteEntidade();
                    dependente.COD_CPF = dep.cpf;
                    dependente.NOM_DEPENDENTE = dep.nome;
                    dependente.COD_GRAU_PARENTESCO = dep.grauParentesco;
                    dependente.COD_PERC_RATEIO = parseInt(dep.percentual);
                    dependente.COD_SEXO = dep.sexo;
                    dependente.DES_GRAU_PARENTESCO = this.buscarTitulo(dep.listaGrauParentesco, "DS_GRAU_PARENTESCO", "CD_GRAU_PARENTESCO", dep.grauParentesco);
                    dependente.DES_SEXO = this.buscarTitulo(this.state.listaSexo, "Value", "Key", this.state.sexo);
                    dependente.DTA_NASCIMENTO = moment(dep.dataNascimento, "DD/MM/YYYY").toDate();
                    dependente.IND_PENSAO = "SIM";

                    adesao.Dependentes.push(dependente);
                });

                adesao.Contrib = new AdesaoContribEntidade();
                adesao.Contrib.COD_CONTRIBUICAO = "01";
                adesao.Contrib.DES_CONTRIBUICAO = "CONTRIBUIÇÃO PARTICIPANTE";
                adesao.Contrib.VAL_CONTRIBUICAO = parseInt(this.state.percentual);
                adesao.Contrib.IND_VALOR_PERC = "PER";

                adesao.Plano = new AdesaoPlanoEntidade();
                adesao.Plano.COD_PLANO = this.dadosPasso2.cdPlano;
                adesao.Plano.DES_PLANO = this.dadosPasso2.nomePlano;
                adesao.Plano.IND_REGIME_TRIBUTACAO = this.state.regimeImposto === "SIM" ? "2" : "1";

                adesao.Documentos = this.state.listaArquivos;
                
                var { data: ipv4 } = await axios.get("https://api.ipify.org");
                var { data: ipv6 } = await axios.get("https://api6.ipify.org");

                adesao.IPV4 = ipv4;
                adesao.IPV6 = ipv6;

                var protocolo = await AdesaoService.Inserir(adesao);

                localStorage.setItem("dadosPasso3", JSON.stringify(this.state));
                localStorage.setItem("protocolo", protocolo);
                this.props.history.push('/passo4');
            }
        } catch(err) {
            if(err.response) {
                await this.alert.current.adicionarErro(err.response.data);
            } else {
                await this.alert.current.adicionarErro(err);
            }
        }
    }

    loadAddress = async () => {
        try {
            const tempCEP = this.state.cep.replace("-", "");
            if (tempCEP.length !== 8)
                return null;

            var { data: address } = await axios.get(`https://viacep.com.br/ws/${tempCEP}/json/`);
            await this.setState({
                bairro: address.bairro,
                complemento: address.complemento,
                cidade: address.localidade,
                logradouro: address.logradouro,
                ufEndereco: address.uf
            });
        } catch (err) {
            await this.alert.current.adicionarErro("Ocorreu um erro ao buscar o CEP.");
            await this.form.current.setState({ valido: false });
        }
    }

    toggleModal = () => {
        this.setState({
            modalVisivel: !this.state.modalVisivel
        });
    }

    toggleUpload = () => {
        this.setState({
            uploadAberto: !this.state.uploadAberto
        });
    }

    uploadFile = async (e: any) => {
        try {
            const formData = new FormData()
            var arquivoUpload = e.target.files[0];
    
            formData.append("File", arquivoUpload, arquivoUpload.name);
            formData.append("Nome", this.state.nomeArquivoUpload);
    
            await this.setState({ uploading: true });

            axios.post(config.apiUrl + '/adesao/upload', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: async progressEvent => {
                    await this.setState({ 
                        uploadPercentage: Math.round(( progressEvent.loaded * 100 ) / progressEvent.total )
                    });
                },
            })
            .then(result => {
                var lista = this.state.listaArquivos;
                lista.push(result.data);

                this.setState({
                    listaArquivos: lista,
                    uploadAberto: false,
                    uploading: false,
                    uploadPercentage: 0
                });
            })
        } catch(err) { 
            console.error(err);
        }
    }

    excluirArquivo = async(arquivo) => {
        await AdesaoService.ExcluirArquivo(arquivo.OID_ADESAO_DOCUMENTO);
        
        var lista = this.state.listaArquivos;
        lista = lista.filter(arq => arq !== arquivo);

        this.setState({
            listaArquivos: lista
        });
    }

    adicionarDependente = async (dependente: any) => {
        var cpfsExistentes = this.state.listaDependentes.filter(x => x.cpf === dependente.cpf);

        if (cpfsExistentes.length > 0) {
            alert("Já existe um dependente com esse CPF incluído.");
        }
        else {
            var lista = this.state.listaDependentes;
            lista.push(dependente);

            this.setState({
                listaDependentes: lista,
                modalVisivel: false
            });
        }
    }

    excluirDependente = (dependente: any) => {
        var lista = this.state.listaDependentes;
        lista = lista.filter(dep => dep !== dependente);

        this.setState({
            listaDependentes: lista
        });
    }

    comparaDatas = async () => {
        var diferenca = moment().diff(this.state.admissao, 'days');
        await this.setState({
            exigeJoia: diferenca >= 30 && this.dadosPasso2.cdPlano === "0003"
        });
    }

    render() {
        return (
            <MasterPage {...this.props}>
                {this.state.listaEstadoCivil.length > 0 &&
                    <Form ref={this.form}>
                        <div className={"m-5"}>
                            <h2>Você escolheu o {this.dadosPasso2.nomePlano}!</h2>
                            <h5 className={"mt-4"}>Ótimo! Agora precisamos completar suas informações!</h5>
                        </div>

                        <Box titulo={"Dados Funcionais"} renderRow={false}>
                            <CampoEstatico
                                tamanhoTitulo={"lg-3"}
                                titulo={"Patrocinador"}
                                valor={this.state.patrocinadora}
                            />

                            <CampoEstatico
                                tamanhoTitulo={"lg-3"}
                                titulo={"Matrícula Funcional"}
                                valor={this.state.matricula}
                            />

                            <CampoTexto
                                contexto={this}
                                tamanhoLabel={"lg-3"}
                                label={"Data de Admissão"}
                                mascara={"99/99/9999"} 
                                nome={"admissao"}
                                valor={this.state.admissao}
                                onBlur={this.comparaDatas}
                                obrigatorio
                            />

                            <CampoEstatico
                                tamanhoTitulo={"lg-3"}
                                titulo={"E-mail"}
                                valor={this.dadosPasso1.email}
                            />
                        </Box>

                        <Box titulo={"Dados Cadastrais"} renderRow={false}>
                            <CampoEstatico
                                tamanhoTitulo={"lg-3"}
                                titulo={"Nome"}
                                valor={this.dadosPasso1.nome}
                                obrigatorio
                            />

                            <CampoEstatico
                                tamanhoTitulo={"lg-3"}
                                titulo={"CPF"}
                                valor={this.dadosPasso1.cpf}
                            />

                            <CampoEstatico
                                tamanhoTitulo={"lg-3"}
                                titulo={"Data de Nascimento"}
                                valor={this.dadosPasso1.dataNascimento} />

                            <Combo
                                tamanhoLabel={"lg-3"}
                                label={"Sexo"}
                                contexto={this}
                                obrigatorio={true}
                                nome={"sexo"}
                                valor={this.state.sexo}
                                textoVazio={"Selecione o Sexo"}
                                opcoes={this.state.listaSexo}
                                nomeMembro={"Value"}
                                valorMembro={"Key"}
                            />

                            <Combo
                                tamanhoLabel={"lg-3"}
                                label={"Nacionalidade"}
                                contexto={this}
                                obrigatorio={true}
                                nome={"nacionalidade"}
                                valor={this.state.nacionalidade}
                                padrao={this.state.listaNacionalidade[0].CD_NACIONALIDADE}
                                opcoes={this.state.listaNacionalidade}
                                nomeMembro={"DS_NACIONALIDADE"}
                                valorMembro={"CD_NACIONALIDADE"}
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Local de Nascimento"}
                                tipo={"text"}
                                contexto={this}
                                nome={"naturalidade"}
                                valor={this.state.naturalidade}
                                obrigatorio
                            />

                            <Combo
                                tamanhoLabel={"lg-3"}
                                label={"UF de Nascimento"}
                                contexto={this}
                                obrigatorio={true}
                                nome={"uf"}
                                valor={this.state.uf}
                                textoVazio={"Selecione a UF"}
                                opcoes={this.state.listaUF}
                                nomeMembro={"DS_UNID_FED"}
                                valorMembro={"CD_UNID_FED"}
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"RG"}
                                tipo={"number"}
                                contexto={this}
                                nome={"rg"}
                                valor={this.state.rg}
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Orgão Expedidor"}
                                tipo={"text"}
                                contexto={this}
                                nome={"orgao"}
                                valor={this.state.orgao}
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Data de Expedição"}
                                mascara={"99/99/9999"}
                                contexto={this}
                                nome={"emissao"}
                                valor={this.state.emissao}
                            />

                            <Combo
                                tamanhoLabel={"lg-3"}
                                label={"Estado Civil"}
                                contexto={this}
                                obrigatorio={true}
                                nome={"estadoCivil"}
                                valor={this.state.estadoCivil}
                                textoVazio={"Selecione o Estado Civil"}
                                opcoes={this.state.listaEstadoCivil}
                                nomeMembro={"DS_ESTADO_CIVIL"}
                                valorMembro={"CD_ESTADO_CIVIL"}
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Nome da Mãe"}
                                tipo={"text"}
                                contexto={this}
                                nome={"mae"}
                                valor={this.state.mae}
                                obrigatorio
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Nome do Pai"}
                                tipo={"text"}
                                contexto={this}
                                nome={"pai"}
                                valor={this.state.pai}
                            />
                        </Box>

                        <Box titulo={"Endereço"} renderRow={false}>
                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"CEP"}
                                tipo={"text"}
                                mascara={"99999-999"}
                                contexto={this}
                                nome={"cep"}
                                valor={this.state.cep}
                                obrigatorio
                                grupo
                                onBotaoClick={this.loadAddress}
                                tituloBotao={"Buscar Endereço"}
                                iconeBotao={"fa-map-marker-alt"}
                                iconeBotaoDireita
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Logradouro"}
                                tipo={"text"}
                                contexto={this}
                                nome={"logradouro"}
                                valor={this.state.logradouro}
                                obrigatorio
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Número"}
                                tipo={"text"}
                                contexto={this}
                                nome={"numero"}
                                valor={this.state.numero}
                                obrigatorio
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Complemento"}
                                tipo={"text"}
                                contexto={this}
                                nome={"complemento"}
                                valor={this.state.complemento}
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Bairro"}
                                tipo={"text"}
                                contexto={this}
                                nome={"bairro"}
                                valor={this.state.bairro}
                                obrigatorio
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Cidade"}
                                tipo={"text"}
                                contexto={this}
                                nome={"cidade"}
                                valor={this.state.cidade}
                                obrigatorio
                            />

                            <Combo
                                tamanhoLabel={"lg-3"}
                                label={"UF"}
                                contexto={this}
                                obrigatorio={true}
                                nome={"ufEndereco"}
                                valor={this.state.ufEndereco}
                                textoVazio={"Selecione a UF"}
                                opcoes={this.state.listaUF}
                                nomeMembro={"DS_UNID_FED"}
                                valorMembro={"CD_UNID_FED"}
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Telefone Fixo"}
                                tipo={"text"}
                                contexto={this}
                                nome={"telefoneFixo"}
                                valor={this.state.telefoneFixo}
                                mascara={"(99)9999-9999"}
                            />

                            <CampoTexto
                                tamanhoLabel={"lg-3"}
                                label={"Celular"}
                                tipo={"text"}
                                contexto={this}
                                nome={"telefoneCelular"}
                                valor={this.state.telefoneCelular}
                                obrigatorio
                                mascara={"(99)99999-9999"}
                            />
                        </Box>

                        <Box titulo={"Termo de Adesão"} renderRow={false}>
                            <Row>
                                <Col tamanho={"1"} className={"text-right"}>
                                    <input type={"checkbox"} checked={this.state.termoAceito} onChange={() => this.setState({ termoAceito: !this.state.termoAceito })} />
                                </Col>
                                <Col>
                                    <p>
                                        Tenho interesse em participar do Plano de Benefícios {this.dadosPasso2.nomePlano}, administrador pela Regius, e constituir Reserva de Poupança Individual. Assim sendo, autorizo
                                        a referida Patrocinadora, uma vez aprovado o presente pedido, a descontar em folha de pagamento ou debitar em minha conta corrente as contribuições e demais despesas
                                        inerentes ao Plano de Benefícios {this.dadosPasso2.nomePlano}. Para tanto estabeleço o percentual da contribuição pessoal escolhido abaixo.
                                    </p>
                                </Col>
                            </Row>

                            <Combo
                                tamanhoLabel={"lg-3"}
                                label={"Percentual de Contribuição Pessoal"}
                                textoVazio={"Selecione o percentual..."}
                                contexto={this}
                                nome={"percentual"}
                                valor={this.state.percentual}
                                opcoes={this.state.listaPercentuais}
                                onChange={this.alterarPercentualPatrocinadora}
                                nomeMembro={"Key"}
                                valorMembro={"Value"}
                                obrigatorio
                            />

                            <CampoEstatico
                                tamanhoTitulo={"lg-3"}
                                titulo={`Percentual da Patrocinadora (Limitado a ${this.state.limitePercentualPatrocinadora.VAL_PERC_MAXIMO_PATROC}%)`}
                                valor={this.state.percentualPatrocinadora}
                            />

                        </Box>

                        <Box titulo={"Dependentes/Beneficiários"} renderRow={false}>
                            <Botao titulo={"Incluir Dependente"} className={"mb-4"} icone={"fa-plus"} onClick={this.toggleModal} />

                            <Tabela titulo={"Dependentes inseridos"} dados={this.state.listaDependentes} paginacaoHabilitada={false} edicaoHabilitada={false} exclusaoHabilitada onExcluir={this.excluirDependente}>
                                <ColunaTabela titulo={"Nome"} propriedadeValor={"nome"} />
                                <ColunaTabela titulo={"CPF"} propriedadeValor={"cpf"} />
                                {this.dadosPasso2.cdPlano !== "0003" &&
                                    <ColunaTabela titulo={"Percentual Pecúlio"} propriedadeValor={"percentual"} sufixo={"%"} />
                                }
                            </Tabela>
                        </Box>

                        <Box titulo={"Termo de Opção do Imposto de Renda"} renderRow={false}>
                            <p>
                                Opção, em caráter irretratável, pelo regime de tributação previsto na Lei nº 11.053, de 29 de dezembro de 2004 (TABELA REGRESSIVA).
                                Está disponível na internet, no endereço [www.regius.org.br], opção Plano {this.dadosPasso2.nomePlano} / Sobre o Plano, material explicativo com orientações sobre
                                as tabelas regressiva e progressiva do Imposto de Renda.
                            </p>

                            <Combo
                                tamanhoLabel={"5"}
                                contexto={this}
                                nome={"regimeImposto"}
                                valor={this.state.regimeImposto}
                                label={"Termo de Opção do Imposto de Renda"}
                                textoVazio={"Selecione uma opção..."}
                                opcoes={opcoesRegimeImposto}
                                nomeMembro={"name"}
                                valorMembro={"value"}
                                obrigatorio
                                labelOculta
                            />
                        </Box>

                        <Box titulo={"Exigência Instrução Normativa PREVIC Nº 18/2014"} renderRow={false}>
                            <p>
                                São consideradas pessoas politicamente expostas detentores de mandatos eletivos, ocupantes de cargo do Poder Executivo da União,
                                Membros do Conselho Nacional de Justiça/STF e dos Tribunais Superiores (dentre outros).
                            </p>

                            <p>
                                Considera-se enquadrado como PESSOA POLITICAMENTE EXPOSTA* (IN PREVIC 18/2014)?
                            </p>

                            <Combo
                                tamanhoLabel={"5"}
                                contexto={this}
                                nome={"politicamenteExposta"}
                                label={"PESSOA POLITICAMENTE EXPOSTA"}
                                valor={this.state.politicamenteExposta}
                                textoVazio={"Selecione uma opção..."}
                                opcoes={opcoesSimNao}
                                nomeMembro={"name"}
                                valorMembro={"value"}
                                obrigatorio
                                labelOculta
                            />

                            <p>
                                Há familiares (pais, filhos, cônjuje, companheiro(a) ou enteado(a)) que possam estar enquadrados como PESSOA POLITICAMENTE EXPOSTA na mesma situação?
                            </p>

                            <Combo
                                tamanhoLabel={"5"}
                                contexto={this}
                                nome={"familiaPoliticamenteExposta"}
                                label={"Familiares Politicamente Expostos"}
                                valor={this.state.familiaPoliticamenteExposta}
                                textoVazio={"Selecione uma opção..."}
                                opcoes={opcoesSimNao}
                                nomeMembro={"name"}
                                valorMembro={"value"}
                                obrigatorio
                                labelOculta
                            />
                        </Box>

                        <Box titulo={"Instrução Normativa RFB Nº 1.571"} renderRow={false}>
                            <p>
                                O FATCA é uma lei que determina que as Instituições Financeiras Estrangeiras (FFIS) devem identificar em sua base de clientes as “US Persons”,
                                de forma a garantir o repasse de informações anuais de operações de contas mantidas
                                por cidadãos americanos para a receita federal dos Estados Unidos, nos termos do acordo para troca de informações assinado pelo Brasil
                                com a receita federal americana.
                            </p>

                            <p>
                                Serão considerados US Persons os participantes que possuam pelo menos 1(uma) das seguintes características: 1. Cidadania norte-americana,
                                incluindo os detentores de dupla nacionalidade e passaporte norte-americano, ainda que residam fora dos dos Estados Unidos;
                                2. Detentores de Green Card; 3. Local de nascimento nos Estados Unidos; 4. Residência permanente nos
                                Estados Unidos ou presença substancial (se ficou nos Estados Unidos pelo menos 31(trinta e um) dias no ano
                                corrente e/ou 183 (cento e oitenta e três) dias nos últimos 3(três) anos;
                                5. Outras características que possam ser indicadas na regulamentação a ser publicada pela RFB.
                            </p>

                            <p>
                                Considera-se, para os devidos fins de direito sob as poenas da lei, como US PERSON?
                            </p>

                            <Combo
                                tamanhoLabel={"5"}
                                contexto={this}
                                nome={"usperson"}
                                label={"US PERSON"}
                                valor={this.state.usperson}
                                textoVazio={"Selecione uma opção..."}
                                opcoes={opcoesSimNao}
                                nomeMembro={"name"}
                                valorMembro={"value"}
                                obrigatorio
                                labelOculta
                            />
                        </Box>

                        <Box titulo={"Documentos"} renderRow={false}>
                            <p>
                                Envie aqui um documento oficial com foto! Verifique se a imagem não está fora de foco, distorcida, entre outros detalhes como textos, fotos, etc.
                            </p>
                            
                            <Botao titulo={"Incluir Arquivo"} className={"mb-4"} icone={"fa-plus"} onClick={this.toggleUpload} />

                            {this.state.uploadAberto &&
                                <div>
                                    <CampoTexto contexto={this} nome={"nomeArquivoUpload"} max={100} valor={this.state.nomeArquivoUpload} label={"Nome do Arquivo"} obrigatorio />
                                    <input name="selecionar-documento" id="selecionar-documento" type="file" onChange={this.uploadFile} />
                                </div>
                            }

                            <Tabela titulo={"Arquivos Inseridos"} dados={this.state.listaArquivos} paginacaoHabilitada={false} edicaoHabilitada={false} 
                                exclusaoHabilitada 
                                onExcluir={this.excluirArquivo}
                            >
                                <ColunaTabela titulo={"Nome"} propriedadeValor={"TXT_TITULO"} />
                            </Tabela>
                        </Box>

                        <Box renderRow={false}>
                            <Row>
                                <Col tamanho={"1"} className={"text-right"}>
                                    <input type={"checkbox"} checked={this.state.termo1Aceito} onChange={() => this.setState({ termo1Aceito: !this.state.termo1Aceito })} />
                                </Col>
                                <Col>
                                    <p>
                                        Manifesto ciência e plena concordância com as informações aqui registradas, atestando a veracidade das mesmas.
                                    </p>
                                </Col>
                            </Row>

                            {this.state.exigeJoia &&
                                <Row>
                                    <Col tamanho={"1"} className={"text-right"}>
                                        <input type={"checkbox"} checked={this.state.termo2Aceito} onChange={() => this.setState({ termo2Aceito: !this.state.termo2Aceito })} />
                                    </Col>
                                    <Col>
                                        <p>
                                            Manifesto ciência que o plano CV-03 exige o pagamento de jóia, que será calculada posteriormente.
                                        </p>
                                    </Col>
                                </Row>
                            }
                        </Box>

                        <Alerta ref={this.alert} tipo={TipoAlerta.danger} padraoFormulario />
                        <Botao onClick={() => this.props.history.push('/passo2')} tipo={TipoBotao.light} titulo={"Voltar"} icone={"fa-angle-double-left"} block />
                        <Botao onClick={this.continuar} titulo={"Continuar"} icone={"fa-angle-double-right"} block iconeDireita submit
                            desativado={!this.state.termo1Aceito || (this.dadosPasso2.cdPlano === "0003" && !this.state.termo2Aceito)} />
                    </Form>
                }

                <ModalIncluirDependente
                    parent={this}
                    modalVisivel={this.state.modalVisivel}
                    toggleModal={this.toggleModal}
                />
            </MasterPage>
        )
    }
}