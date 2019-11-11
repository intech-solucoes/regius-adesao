import React from "react";
import MasterPage from "../MasterPage";
import { History } from "history";
import { Box, Form, CampoTexto, Combo, Alerta, TipoAlerta, Botao, TipoBotao } from "@intechprev/componentes-web";
import { EmpresaEntidade, AdesaoEntidade, FuncionarioNPEntidade } from "../../entidades";
import { AdesaoService } from "../../services";
import moment from "moment";

interface Props {
    history?: History;
};

export interface StatePasso1 {
    nome: string;
    dataNascimento: string;
    cpf: string;
    email: string;
    patrocinadora: string;
    funcionario: FuncionarioNPEntidade;
    matricula: string;
    empresas: Array<EmpresaEntidade>;
    erro: string;
    erroPlano: any;
    erroDados: any;
};

export default class Passo1 extends React.Component<Props, StatePasso1> {

    dadosPasso1 = JSON.parse(localStorage.getItem("dadosPasso1"));

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();

    constructor(props: Props) {
        super(props);

        this.state = {
            nome: "",
            dataNascimento: "",
            cpf: "",
            email: "",
            patrocinadora: "",
            funcionario: new FuncionarioNPEntidade(),
            matricula: "",
            empresas: [],
            erro: null,
            erroPlano: null,
            erroDados: null
        };
    };

    componentDidMount = async() => {
        if(this.dadosPasso1)
            await this.setState(this.dadosPasso1);

        var empresas = await AdesaoService.BuscarEmpresas();
        await this.setState({
            empresas
        });
    }

    continuar = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validar();
        
        if(this.form.current.state.valido) {
            await this.validarData();
            await this.validarCpf();

            if(this.form.current.state.valido) {
                var funcionario = await AdesaoService.BuscarFuncionario(this.state.patrocinadora, this.state.matricula, this.state.cpf, this.state.dataNascimento);

                if(funcionario.tipo) {
                    this.setState({
                        erro: "plano",
                        erroPlano: funcionario.plano,
                        erroDados: funcionario.dados
                    })
                }

                if(funcionario == null) {
                    this.setState({
                        erro: "funcionarioNP"
                    });
                } else if(funcionario === "email") {
                    this.setState({
                        erro: "email"
                    });
                } else if(funcionario === "adesao") {
                    this.setState({
                        erro: "adesao"
                    });
                } else {
                    await this.setState({
                        funcionario,
                        email: funcionario.E_MAIL
                    });

                    await this.proximaTela();
                }
            }
        }
    }

    proximaTela = async() => {
        localStorage.setItem("dadosPasso1", JSON.stringify(this.state));
        this.props.history.push('/token');
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

    render() {
        return (
            <MasterPage {...this.props}>
                {!this.state.erro &&
                    <Box titulo={"Para começar, precisamos da sua identificação funcional:"}>
                        <Form ref={this.form}>
                            <CampoTexto contexto={this}
                                        nome={"nome"} label={"Nome"} valor={this.state.nome}
                                        tamanhoLabel={"lg-3"} max={100} obrigatorio />
                        
                            <CampoTexto contexto={this}
                                        nome={"dataNascimento"} label={"Data de Nascimento"} valor={this.state.dataNascimento}
                                        tamanhoLabel={"lg-3"} 
                                        tipo={"date"} obrigatorio />

                            <CampoTexto contexto={this}
                                        nome={"cpf"} label={"CPF"} valor={this.state.cpf}
                                        tamanhoLabel={"lg-3"} mascara={"999.999.999-99"} obrigatorio />

                            <Combo contexto={this}
                                    nome={"patrocinadora"} label={"Patrocinadora"} valor={this.state.patrocinadora}
                                    textoVazio={"Selecione a sua Empresa Patrocinadora"}
                                    opcoes={this.state.empresas} nomeMembro={"NOME_ENTID"} valorMembro={"CD_EMPRESA"}
                                    tamanhoLabel={"lg-3"} obrigatorio />

                            <CampoTexto contexto={this} tipo={"number"} 
                                        nome={"matricula"} label={"Matrícula Funcional"} valor={this.state.matricula}
                                        tamanhoLabel={"lg-3"} max={9} obrigatorio />

                            <Alerta ref={this.alert} tipo={TipoAlerta.danger} padraoFormulario />
                            <Botao onClick={this.continuar} titulo={"Continuar"} icone={"fa-angle-double-right"} block iconeDireita submit />
                        </Form>
                    </Box>
                }

                {this.state.erro === "plano" &&
                    <h4 className={"p-4"}>
                        Olá {this.state.erroDados.NOME_ENTID},

                        Você já é participante do plano {this.state.erroPlano.DS_PLANO}, inscrito em {moment(this.state.erroPlano.DT_INSCRICAO).format("DD/MM/YYYY")} e 
                        está atualmente na situação {this.state.erroPlano.DS_CATEGORIA}. 
                        Para saber mais sobre a sua inscrição no plano, acesse o <a href="https://portal.regius.org.br/Login/0" target="_blank">Portal do Participante</a>. 
                    </h4>
                }

                {this.state.erro === "funcionarioNP" &&
                    <h4 className={"p-4"}>
                        Não encontramos o seu registro em nossa base de dados. Verifique se as informações digitadas estão corretas ou entre em 
                        contato conosco pelo nosso canal <a href="http://www.regius.org.br/index.php/fale-conosco" target="_blank">fale conosco</a>. 
                    </h4>
                }

                {this.state.erro === "email" &&
                    <div>
                        <h4 className={"p-4"}>
                            Não encontramos o seu e-mail em nossa base de dados. Entre com um e-mail válido no campo abaixo. Nós enviaremos um e-mail com um número de confirmação para você!
                        </h4>

                        <CampoTexto contexto={this}
                                        nome={"email"} label={"E-mail"} valor={this.state.email}
                                        tamanhoLabel={"lg-3"} max={50} obrigatorio={this.state.erro === "email"} />
                                        
                        <Botao onClick={this.continuar} titulo={"Continuar"} icone={"fa-angle-double-right"} block iconeDireita submit />
                    </div>
                }

                {this.state.erro === "adesao" &&
                    <h4 className={"p-4"}>
                        Não encontramos o seu e-mail em nossa base de dados. Entre em contato conosco pelo nosso canal 
                        <a href="http://www.regius.org.br/index.php/fale-conosco" target="_blank">fale conosco</a>. 
                    </h4>
                }

                {this.state.erro &&
                    <Botao onClick={() => this.setState({ erro: null })} tipo={TipoBotao.light} titulo={"Voltar"} icone={"fa-angle-double-left"} block />
                }
            </MasterPage>
        );
    }
}