import React, { Component } from "react";
import { History } from "history";
import {
    Box,
    CampoTexto,
    Botao,
    Alerta,
    Form,
    TipoAlerta,
} from "@intechprev/componentes-web";

import MasterPage from "../MasterPage";
import { StatePasso1 } from ".";

interface Props {
    history?: History;
}

export interface StateEmailCelular {
    email: string;
    celular: string;
}

export default class SelecionarEmailCelular extends Component<
    Props,
    StateEmailCelular
> {
    dadosPasso1: StatePasso1 = JSON.parse(localStorage.getItem("dadosPasso1"));

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();

    constructor(props: Props) {
        super(props);

        this.state = {
            email: this.dadosPasso1.funcionario.E_MAIL,
            celular: this.dadosPasso1.funcionario.FONE_CELULAR,
        };
    }

    proximaTela = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validar();

        if (this.form.current.state.valido) {
            await this.setState({
                celular: this.state.celular
                    .replace("(", "")
                    .replace(")", "")
                    .replace(" ", "")
                    .replace("-", ""),
            });
            localStorage.setItem("dadosPasso1_1", JSON.stringify(this.state));
            this.props.history.push("/token");
        }
    };

    render() {
        return (
            <MasterPage {...this.props}>
                <Box
                    titulo={`Olá, ${this.dadosPasso1.funcionario.NOME_ENTID},`}
                >
                    <Form ref={this.form}>
                        <p>
                            Agora, precisamos de saber como entrar em contato
                            com você. Por favor nos informe:
                        </p>

                        <CampoTexto
                            contexto={this}
                            nome={"email"}
                            titulo={"Meu melhor e-mail"}
                            valor={this.state.email}
                            tamanhoCampo={"lg-2"}
                            tamanhoTitulo={"lg-2"}
                            max={50}
                            obrigatorio
                        />

                        <CampoTexto
                            contexto={this}
                            nome={"celular"}
                            titulo={"Meu melhor celular"}
                            mascara={"(99) 99999-9999"}
                            valor={this.state.celular}
                            tamanhoCampo={"lg-2"}
                            tamanhoTitulo={"lg-2"}
                            obrigatorio
                        />

                        <p>
                            Iremos enviar um código de confirmação para seu
                            e-mail e por SMS.
                        </p>

                        <Alerta
                            ref={this.alert}
                            tipo={TipoAlerta.danger}
                            padraoFormulario
                        />
                        <Botao
                            onClick={this.proximaTela}
                            titulo={"Continuar"}
                            icone={"fa-angle-double-right"}
                            block
                            iconeDireita
                            submit
                        />
                    </Form>
                </Box>
            </MasterPage>
        );
    }
}
