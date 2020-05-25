import React from "react";
import MasterPage from "../MasterPage";
import { History } from "history";
import {
    Box,
    Form,
    CampoTexto,
    Combo,
    Alerta,
    TipoAlerta,
    Botao,
} from "@intechprev/componentes-web";
import { AdesaoService } from "../../services";
import { StateEmailCelular } from "./SelecionarEmailCelular";
import { StatePasso1 } from ".";

interface Props {
    history?: History;
}

interface State {
    tokenDigitado: string;
    tokenEnviado: string;
}

export default class Passo1 extends React.Component<Props, State> {
    dadosPasso1: StatePasso1 = JSON.parse(localStorage.getItem("dadosPasso1"));
    dadosPasso1_1: StateEmailCelular = JSON.parse(
        localStorage.getItem("dadosPasso1_1")
    );

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();

    constructor(props: Props) {
        super(props);

        this.state = {
            tokenDigitado: "",
            tokenEnviado: "",
        };
    }

    componentDidMount = async () => {
        await this.enviarToken();
    };

    enviarToken = async (alerta: boolean = false) => {
        var tokenEnviado = await AdesaoService.EnviarEmail(
            this.dadosPasso1_1.email,
            this.dadosPasso1_1.celular
        );
        await this.setState({
            tokenEnviado,
        });

        if (alerta) alert("Token enviado com sucesso!");
    };

    continuar = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validar();

        if (this.form.current.state.valido) {
            await this.validarToken();

            if (this.form.current.state.valido) {
                this.props.history.push("/passo2");
            }
        }
    };

    validarToken = async () => {
        try {
            await AdesaoService.ConfirmarToken(
                this.state.tokenDigitado,
                this.state.tokenEnviado
            );
        } catch (err) {
            if (err.response)
                await this.alert.current.adicionarErro(err.response.data);
            else await this.alert.current.adicionarErro(err);

            this.form.current.setState({ valido: false });
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
                            Foi enviado para o seu e-mail e celular, por SMS um
                            número de confirmação. Favor inserir esse número no
                            campo abaixo para continuarmos com o processo de
                            adesão!
                        </p>

                        <CampoTexto
                            contexto={this}
                            nome={"tokenDigitado"}
                            titulo={"Número de Confirmação"}
                            valor={this.state.tokenDigitado}
                            grupo={true}
                            tituloBotao={"Enviar novamente"}
                            onBotaoClick={async () =>
                                await this.enviarToken(true)
                            }
                            tamanhoTitulo={"lg-3"}
                            max={100}
                            tipo={"number"}
                            obrigatorio
                        />

                        <Alerta
                            ref={this.alert}
                            tipo={TipoAlerta.danger}
                            padraoFormulario
                        />
                        <Botao
                            onClick={this.continuar}
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
