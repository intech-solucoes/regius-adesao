import React from "react";
import axios from "axios";
import { Botao, Box, CampoTexto, Combo, Form, Alerta, TipoAlerta } from "@intechprev/componentes-web";
import { History } from "history";

interface Props {
    listaPatrocinadora: any;
    history?: History;
};

interface State {
    nome: string;
    cpf: string;
    patrocinadora: string;
    matricula: string;
};

export class Passo1IdentificacaoPessoal extends React.Component<Props, State>{

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();

    constructor(props: Props) {
        super(props);

        this.state = {
            nome: "",
            cpf: "",
            patrocinadora: "",
            matricula: ""
        };
    };

    continuar = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validarAlt();
        await this.validarCpf();
        
        if(this.form.current.state.valido) {
            localStorage.setItem("dados_passo_1", JSON.stringify(this.state));
            this.props.history.push('/passo2');
        }
    }
    
    validarCpf = async () => {
        try {
            await axios.get(`http://10.10.170.11/CuritibaPrevAPI/api/adesao/ValidarCPF/${this.state.cpf}`);
        } catch(err) {
            if(err.response)
                await this.alert.current.adicionarErro(err.response.data);
            else
                await this.alert.current.adicionarErro(err);

            this.form.current.setState({ valido: false });
        }
    }

    render() {
        return (
            <Box titulo={"Para começar, precisamos da sua identificação funcional:"}>
                <Form ref={this.form}>
                    <CampoTexto
                        contexto={this}
                        tipo={"text"}
                        nome={"nome"}
                        label={"Nome Completo"}
                        valor={this.state.nome}
                        tamanhoLabel={"lg-3"}
                        max={100}
                        obrigatorio
                    />

                    <CampoTexto
                        contexto={this}
                        tipo={"text"}
                        nome={"cpf"}
                        label={"CPF"}
                        valor={this.state.cpf}
                        tamanhoLabel={"lg-3"}
                        mascara={"999.999.999-99"}
                        obrigatorio
                    />

                    <Combo
                        tamanhoLabel={"lg-3"}
                        label={"Patrocinadora"}
                        contexto={this}
                        obrigatorio
                        nome={"patrocinadora"}
                        valor={this.state.patrocinadora}
                        textoVazio={"Escolha a patrocinadora"}
                        opcoes={this.props.listaPatrocinadora}
                        nomeMembro={"NO_PESSOA"}
                        valorMembro={"CD_PESSOA_PATR"}
                    />

                    <CampoTexto
                        contexto={this}
                        tipo={"number"}
                        nome={"matricula"}
                        label={"Matrícula Funcional"}
                        valor={this.state.matricula}
                        tamanhoLabel={"lg-3"}
                        max={9}
                        obrigatorio
                    />

                    <Alerta ref={this.alert} tipo={TipoAlerta.danger} padraoFormulario />

                    <Botao onClick={this.continuar} titulo={"Continuar"} icone={"fa-angle-double-right"} block iconeDireita submit />
                </Form>
            </Box>
        );
    }
}