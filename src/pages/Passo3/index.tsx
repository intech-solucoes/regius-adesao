import React from "react";
import axios from "axios";
import { History } from "history";
import { Alerta, Form, Box, TipoAlerta, Botao, TipoBotao, Row, Col } from "@intechprev/componentes-web";
import moment from "moment";

import MasterPage from "../MasterPage";
import { AdesaoService } from "../../services";
import { UFEntidade, BancoAgEntidade, AdesaoDependenteEntidade } from "../../entidades";
import AdesaoEntidade from "../../entidades/AdesaoEntidade";
import { StatePasso1 } from "../Passo1";
import { StatePasso2 } from "../Passo2";

import { DadosFuncionais } from "./DadosFuncionais";
import { DadosCadastrais } from "./DadosCadastrais";
import { Endereco } from "./Endereco";
import { TermoAdesao } from "./TermoAdesao";
import { Dependentes } from "./Dependentes";
import { OutrasOpcoes } from "./OutrasOpcoes";
import { Documentos } from "./Documentos";

interface Props {
    history?: History;
};

interface StatePasso3 {
    listaBancos: Array<BancoAgEntidade>;
    listaUF: Array<UFEntidade>;
    listaSexo: Array<any>;


    termo1Aceito: boolean;
    termo2Aceito: boolean;
    exigeJoia: boolean;
};

export default class Passo3 extends React.Component<Props, StatePasso3>{

    dadosPasso1: StatePasso1 = JSON.parse(localStorage.getItem("dadosPasso1"));
    dadosPasso2: StatePasso2 = JSON.parse(localStorage.getItem("dadosPasso2"));
    dadosPasso3 = JSON.parse(localStorage.getItem("dadosPasso3"));

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();

    private dadosFuncionais = React.createRef<DadosFuncionais>();
    private dadosCadastrais = React.createRef<DadosCadastrais>();
    private endereco = React.createRef<Endereco>();
    private termoAdesao = React.createRef<TermoAdesao>();
    private dependentes = React.createRef<Dependentes>();
    private outrasOpcoes = React.createRef<OutrasOpcoes>();
    private documentos = React.createRef<Documentos>();

    constructor(props: Props) {
        super(props);

        this.state = {
            listaBancos: [],
            listaUF: [],
            listaSexo: [],

            termo1Aceito: false,
            termo2Aceito: false,
            exigeJoia: false
        };
    }

    componentDidMount = async () => {
        window.addEventListener("load", this.load);
        this.load();
    }

    load = async () => {
        var listaUF = await AdesaoService.BuscarListaUF();
        var listaSexo = await AdesaoService.BuscarListaSexo();
        var listaBancos = await AdesaoService.BuscarListaBancos();

        await this.setState({
            listaUF,
            listaSexo,
            listaBancos
        });

        this.dadosPasso1 = JSON.parse(localStorage.getItem("dadosPasso1"));
        this.dadosPasso2 = JSON.parse(localStorage.getItem("dadosPasso2"));
        this.dadosPasso3 = JSON.parse(localStorage.getItem("dadosPasso3"));

        if (this.dadosPasso3)
            await this.setState(this.dadosPasso3);
    }

    validarPeculio = async (listaDependentes: Array<AdesaoDependenteEntidade>) => {
        var totalPercentualDependentes = 0;
        listaDependentes.forEach((dep: AdesaoDependenteEntidade) => {
            totalPercentualDependentes += dep.COD_PERC_RATEIO;
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

            var listaDependentes = this.dependentes.current.preencherDados();
            var listaArquivos = this.documentos.current.preencherDados();

            if (this.dadosPasso2.cdPlano !== "0003" && listaDependentes.length > 0)
                await this.validarPeculio(listaDependentes);

            if (listaArquivos.length < 1) {
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
                adesao.COD_EMAIL = this.dadosPasso1.email;

                adesao = this.dadosFuncionais.current.preencherDados(adesao);
                adesao = this.dadosCadastrais.current.preencherDados(adesao);
                adesao = this.endereco.current.preencherDados(adesao);

                adesao.Contrib = this.termoAdesao.current.preencherDados();
                adesao.Dependentes = listaDependentes;

                adesao = this.outrasOpcoes.current.preencherDados(adesao);

                adesao.Documentos = listaArquivos;

                var { data: ipv4 } = await axios.get("https://api.ipify.org");
                var { data: ipv6 } = await axios.get("https://api6.ipify.org");

                adesao.IPV4 = ipv4;
                adesao.IPV6 = ipv6;

                var protocolo = await AdesaoService.Inserir(adesao);

                localStorage.setItem("dadosPasso3", JSON.stringify(this.state));
                localStorage.setItem("protocolo", protocolo);
                this.props.history.push('/passo4');
            }
        } catch (err) {
            if (err.response) {
                await this.alert.current.adicionarErro(err.response.data);
            } else {
                await this.alert.current.adicionarErro(err);
            }
        }
    }

    render() {
        return (
            <MasterPage {...this.props}>
                <Form ref={this.form}>
                    <div className={"m-5"}>
                        <h2>Você escolheu o {this.dadosPasso2.nomePlano}!</h2>
                        <h5 className={"mt-4"}>Ótimo! Agora precisamos completar suas informações!</h5>
                    </div>

                    <DadosFuncionais ref={this.dadosFuncionais}
                        parent={this}
                        dadosPasso1={this.dadosPasso1}
                        dadosPasso2={this.dadosPasso2}
                    />

                    <DadosCadastrais ref={this.dadosCadastrais}
                        dadosPasso1={this.dadosPasso1}
                        dadosPasso2={this.dadosPasso2}
                        listaSexo={this.state.listaSexo}
                        listaUF={this.state.listaUF}
                    />

                    <Endereco ref={this.endereco}
                        dadosPasso1={this.dadosPasso1} dadosPasso2={this.dadosPasso2}
                        listaUF={this.state.listaUF}
                    />

                    <TermoAdesao ref={this.termoAdesao}
                        dadosPasso1={this.dadosPasso1} dadosPasso2={this.dadosPasso2}
                    />

                    <Dependentes ref={this.dependentes}
                        dadosPasso1={this.dadosPasso1} dadosPasso2={this.dadosPasso2}
                        listaSexo={this.state.listaSexo}
                    />

                    <OutrasOpcoes ref={this.outrasOpcoes}
                        dadosPasso1={this.dadosPasso1} dadosPasso2={this.dadosPasso2}
                    />

                    <Documentos ref={this.documentos}
                        dadosPasso1={this.dadosPasso1} dadosPasso2={this.dadosPasso2}
                    />

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

                    <Botao
                        tipo={TipoBotao.light}
                        titulo={"Voltar"}
                        icone={"fa-angle-double-left"}
                        onClick={() => this.props.history.push('/passo2')}
                        block
                    />
                    <Botao
                        titulo={"Continuar"}
                        icone={"fa-angle-double-right"}
                        block iconeDireita submit
                        onClick={this.continuar}
                        desativado={!this.state.termo1Aceito || (this.dadosPasso2.cdPlano === "0003" && this.state.exigeJoia && !this.state.termo2Aceito)}
                    />
                </Form>
            </MasterPage>
        )
    }
}