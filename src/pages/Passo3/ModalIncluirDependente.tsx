import React from "react";
import { Modal, CampoTexto, Combo, Botao, Form, Alerta, TipoAlerta } from "@intechprev/componentes-web";
import { AdesaoService } from "../../services";
import { GrauParentescoEntidade } from "../../entidades";
import moment from "moment";

interface Props{
    modalVisivel: boolean
    toggleModal: any;
    parent: any;
}

export interface StateDependente {
    nome: string;
    dataNascimento: string;
    sexo: string;
    listaSexo: Array<any>;
    cpf: string;
    grauParentesco: string;
    listaGrauParentesco: Array<GrauParentescoEntidade>;
}

export class ModalIncluirDependente extends React.Component<Props, StateDependente>{

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();

    constructor(props: Props){
        super(props);

        this.state = {
            nome: "",
            dataNascimento: "",
            sexo: "",
            listaSexo: [],
            cpf: "",
            grauParentesco: "",
            listaGrauParentesco: []
        }
    }

    componentDidMount = async() => {
        var listaSexo = await AdesaoService.BuscarListaSexo();
        var listaGrauParentesco = await AdesaoService.BuscarListaGrauParentesco();

        this.setState({
            listaSexo,
            listaGrauParentesco
        });
    }
    
    validarCpf = async () => {
        try {
            await AdesaoService.ValidarCPF(this.state.cpf);
        } catch(err) {
            if(err.response)
                await this.alert.current.adicionarErro(err.response.data);
            else
                await this.alert.current.adicionarErro(err);

            this.form.current.setState({ valido: false });
        }
    }
    
    validarData = async () => {
        try {
            await AdesaoService.ValidarDataNascimento(moment(this.state.dataNascimento, "YYYY-MM-DD").format("DD.MM.YYYY"));
        } catch(err){
            if(err.response)
                await this.alert.current.adicionarErro(err.response.data);
            else
                await this.alert.current.adicionarErro(err);

            this.form.current.setState({ valido: false });
        }
    }

    salvar = async() => {
        await this.alert.current.limparErros();
        await this.form.current.validar();
        await this.validarData();
        await this.validarCpf();

        if (this.form.current.state.valido) {
            await this.props.parent.adicionarDependente(this.state);
        }
    }
    
    render(){
        return(
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
                            label={"Nome do Dependente"}
                            valor={this.state.nome}
                            tamanhoLabel={"lg-3"}
                            max={100}
                            obrigatorio
                        />
                    
                        <CampoTexto
                            contexto={this}
                            tamanhoLabel={"lg-3"}
                            label={"Data de Nascimento"}
                            tipo={"date"}
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
                            label={"CPF"}
                            valor={this.state.cpf}
                            tamanhoLabel={"lg-3"}
                            mascara={"999.999.999-99"}
                            obrigatorio
                        />

                        <Alerta ref={this.alert} tipo={TipoAlerta.danger} padraoFormulario />
                    </Form>
                </Modal>
            </div>
        );
    };
}