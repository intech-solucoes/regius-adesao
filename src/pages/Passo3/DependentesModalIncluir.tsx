import React from "react";
import {
    Modal,
    CampoTexto,
    Combo,
    Botao,
    Form,
    Alerta,
    TipoAlerta,
} from "@intechprev/componentes-web";
import { AdesaoService } from "../../services";
import { GrauParentescoEntidade } from "../../entidades";
import moment from "moment";
import _ from "lodash";
import { StatePasso2 } from "../Passo2";
import { Dependentes } from "./Dependentes";

interface Props {
    modalVisivel: boolean;
    toggleModal: any;
    parent: Dependentes;
    listaSexo: Array<any>;
}

export interface StateDependente {
    nome: string;
    dataNascimento: string;
    sexo: string;
    listaSexo: Array<any>;
    cpf: string;
    percentual: string;
    grauParentesco: string;
    listaGrauParentesco: Array<GrauParentescoEntidade>;
}

export class DependentesModalIncluir extends React.Component<
    Props,
    StateDependente
> {
    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();

    dadosPasso2: StatePasso2 = JSON.parse(localStorage.getItem("dadosPasso2"));

    constructor(props: Props) {
        super(props);

        this.state = this.resetaState();
    }

    resetaState = () => {
        return {
            nome: "",
            dataNascimento: "",
            sexo: "",
            listaSexo: [],
            cpf: "",
            grauParentesco: "",
            percentual: "0",
            listaGrauParentesco: [],
        };
    };

    componentDidMount = async () => {
        this.load();
    };

    load = async () => {
        var listaSexo = await AdesaoService.BuscarListaSexo();
        var listaGrauParentesco = await AdesaoService.BuscarListaGrauParentesco();

        this.setState({
            listaSexo,
            listaGrauParentesco,
        });
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

    validarData = async () => {
        try {
            await AdesaoService.ValidarDataNascimento(
                moment(this.state.dataNascimento, "DD/MM/YYYY").format(
                    "DD.MM.YYYY"
                )
            );
        } catch (err) {
            if (err.response)
                await this.alert.current.adicionarErro(err.response.data);
            else await this.alert.current.adicionarErro(err);

            this.form.current.setState({ valido: false });
        }
    };

    salvar = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validar();
        await this.validarData();
        if (this.state.cpf.trim() !== "") await this.validarCpf();

        if (this.form.current.state.valido) {
            if (this.dadosPasso2.cdPlano !== "0003") {
                await this.setState({
                    percentual: this.state.percentual
                        .replace("%", "")
                        .replace(new RegExp("_", "g"), ""),
                });
            }

            await this.props.parent.adicionarDependente(this.state);
            await this.setState(this.resetaState());
            await this.load();
        }
    };

    render() {
        return (
            <div className={"m-3"}>
                <Modal
                    visivel={this.props.modalVisivel}
                    onClose={this.props.toggleModal}
                    onConfirm={this.salvar}
                    titulo={"Incluir Dependente"}
                    tituloBotaoFechar={"Salvar"}
                >
                    <Form ref={this.form}>
                        <CampoTexto
                            contexto={this}
                            tipo={"text"}
                            nome={"nome"}
                            titulo={"Nome do Dependente"}
                            valor={this.state.nome}
                            tamanhoTitulo={"lg-3"}
                            max={100}
                            obrigatorio
                        />

                        <CampoTexto
                            contexto={this}
                            tamanhoTitulo={"lg-3"}
                            titulo={"Data de Nascimento"}
                            mascara={"99/99/9999"}
                            nome={"dataNascimento"}
                            valor={this.state.dataNascimento}
                            obrigatorio
                        />

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
                            label={"Grau de Parentesco"}
                            contexto={this}
                            obrigatorio={true}
                            nome={"grauParentesco"}
                            valor={this.state.grauParentesco}
                            textoVazio={"Selecione o Grau de Parentesco"}
                            opcoes={this.state.listaGrauParentesco}
                            nomeMembro={"DS_GRAU_PARENTESCO"}
                            valorMembro={"CD_GRAU_PARENTESCO"}
                        />

                        <CampoTexto
                            contexto={this}
                            tipo={"text"}
                            nome={"cpf"}
                            titulo={"CPF"}
                            valor={this.state.cpf}
                            tamanhoTitulo={"lg-3"}
                            mascara={"999.999.999-99"}
                        />

                        {this.dadosPasso2.cdPlano !== "0003" && (
                            <CampoTexto
                                contexto={this}
                                nome={"percentual"}
                                titulo={"Percentual Pecúlio"}
                                valor={this.state.percentual}
                                tamanhoTitulo={"lg-3"}
                                mascara={"999%"}
                                obrigatorio
                            />
                        )}

                        <Alerta
                            ref={this.alert}
                            tipo={TipoAlerta.danger}
                            padraoFormulario
                        />
                    </Form>
                </Modal>
            </div>
        );
    }
}
