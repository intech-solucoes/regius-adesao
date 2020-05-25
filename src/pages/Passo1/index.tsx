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
    TipoBotao,
} from "@intechprev/componentes-web";
import {
    EmpresaEntidade,
    AdesaoEntidade,
    FuncionarioNPEntidade,
} from "../../entidades";
import { AdesaoService } from "../../services";
import moment from "moment";
import axios from "axios";

interface Props {
    history?: History;
}

export interface StatePasso1 {
    cpf: string;
    email: string;
    celular: string;
    funcionario: FuncionarioNPEntidade;
    erro: string;
    erroPlano: any;
    erroDados: any;
}

export default class Passo1 extends React.Component<Props, StatePasso1> {
    dadosPasso1 = JSON.parse(localStorage.getItem("dadosPasso1"));

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();

    constructor(props: Props) {
        super(props);

        this.state = {
            cpf: "",
            email: "",
            celular: "",
            funcionario: new FuncionarioNPEntidade(),
            erro: null,
            erroPlano: null,
            erroDados: null,
        };
    }

    componentDidMount = async () => {
        window.addEventListener("load", this.load);
        this.load();
    };

    load = async () => {
        if (this.dadosPasso1) {
            this.dadosPasso1.erro = null;
            (this.dadosPasso1.erroPlano = null),
                (this.dadosPasso1.erroDados = null),
                await this.setState(this.dadosPasso1);
        }

        await this.setState({
            erro: null,
            erroPlano: null,
            erroDados: null,
            funcionario: new FuncionarioNPEntidade(),
        });
    };

    continuar = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validar();

        if (this.form.current.state.valido) {
            await this.validarCpf();

            if (this.form.current.state.valido) {
                var funcionario = await AdesaoService.BuscarFuncionario(
                    this.state.cpf
                );

                if (funcionario && funcionario.tipo) {
                    await this.setState({
                        erro: "plano",
                        erroPlano: funcionario.plano,
                        erroDados: funcionario.dados,
                    });
                } else if (funcionario === "funcionarioNP") {
                    this.setState({
                        erro: "funcionarioNP",
                    });
                } else if (funcionario === "email") {
                    this.setState({
                        erro: "email",
                    });
                } else if (funcionario === "adesao") {
                    this.setState({
                        erro: "adesao",
                    });
                } else {
                    await this.setState({
                        funcionario,
                        email: funcionario.E_MAIL,
                    });

                    await this.proximaTela();
                }
            }
        }
    };

    proximaTela = async () => {
        localStorage.setItem("dadosPasso1", JSON.stringify(this.state));
        this.props.history.push("/selecionarEmailCelular");
    };

    validarCpf = async () => {
        try {
            await AdesaoService.ValidarCPF(this.state.cpf);
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
                {!this.state.erro && (
                    <Box
                        titulo={
                            "Para começar, precisamos da sua identificação funcional:"
                        }
                    >
                        <Form ref={this.form}>
                            <CampoTexto
                                contexto={this}
                                nome={"cpf"}
                                titulo={"CPF"}
                                valor={this.state.cpf}
                                tamanhoCampo={"lg-2"}
                                tamanhoTitulo={"lg-1"}
                                mascara={"999.999.999-99"}
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
                )}

                {this.state.erro === "plano" && (
                    <h4 className={"p-4"}>
                        Olá {this.state.erroDados.NOME_ENTID}, Você já é
                        participante do plano {this.state.erroPlano.DS_PLANO},
                        inscrito em{" "}
                        {moment(this.state.erroPlano.DT_INSC_PLANO).format(
                            "DD/MM/YYYY"
                        )}{" "}
                        e está atualmente na situação{" "}
                        {this.state.erroPlano.DS_CATEGORIA}. Para saber mais
                        sobre a sua inscrição no plano, acesse o{" "}
                        <a
                            href="https://portal.regius.org.br/Login/0"
                            target="_blank"
                        >
                            Portal do Participante
                        </a>
                        .
                    </h4>
                )}

                {this.state.erro === "funcionarioNP" && (
                    <h4 className={"p-4"}>
                        Não encontramos o seu registro em nossa base de dados.
                        Verifique se as informações digitadas estão corretas ou
                        entre em contato conosco pelo nosso canal{" "}
                        <a
                            href="http://www.regius.org.br/index.php/fale-conosco"
                            target="_blank"
                        >
                            fale conosco
                        </a>
                        .
                    </h4>
                )}

                {this.state.erro === "email" && (
                    <div>
                        <h4 className={"p-4"}>
                            Não encontramos o seu e-mail em nossa base de dados.
                            Entre com um e-mail válido no campo abaixo. Nós
                            enviaremos um e-mail com um número de confirmação
                            para você!
                        </h4>

                        <CampoTexto
                            contexto={this}
                            nome={"email"}
                            titulo={"E-mail"}
                            valor={this.state.email}
                            tamanhoTitulo={"lg-3"}
                            max={50}
                            obrigatorio={this.state.erro === "email"}
                        />

                        <Botao
                            onClick={this.proximaTela}
                            titulo={"Continuar"}
                            icone={"fa-angle-double-right"}
                            block
                            iconeDireita
                            submit
                        />
                    </div>
                )}

                {this.state.erro === "adesao" && (
                    <h4 className={"p-4"}>
                        Seu processo de adesão está sendo processado pela
                        Regius!
                    </h4>
                )}

                {this.state.erro && (
                    <Botao
                        onClick={() => this.setState({ erro: null })}
                        tipo={TipoBotao.light}
                        titulo={"Voltar"}
                        icone={"fa-angle-double-left"}
                        block
                    />
                )}
            </MasterPage>
        );
    }
}
