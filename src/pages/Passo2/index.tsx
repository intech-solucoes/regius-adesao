import React from "react";
import { History } from "history";
import { Box, Botao, TipoBotao } from "@intechprev/componentes-web";

import MasterPage from "../MasterPage";
import { AdesaoService } from "../../services";
import { StatePasso1 } from "../Passo1";

interface Props {
    history?: History;
};

export interface StatePasso2 {
    planos: Array<any>;
    cdPlano: string;
    nomePlano: string;
};

export default class Passo2 extends React.Component<Props, StatePasso2>{

    dadosPasso1: StatePasso1 = JSON.parse(localStorage.getItem("dadosPasso1"));

    constructor(props: Props) {
        super(props);

        this.state = {
            cdPlano: null,
            nomePlano: "",
            planos: []
        };
    }

    componentDidMount = async () => {
        window.addEventListener("load", this.load);
        this.load();
    }

    load = async () => {
        var planos = await AdesaoService.BuscarPlanos(this.dadosPasso1.funcionario.CD_EMPRESA, this.dadosPasso1.funcionario.NUM_MATRICULA);
        this.setState({
            planos
        });
    }

    continuar = async (plano: any) => {
        await this.setState({
            cdPlano: plano.CD_PLANO,
            nomePlano: plano.DS_PLANO
        });

        await localStorage.setItem("dadosPasso2", JSON.stringify(this.state));
        await localStorage.removeItem("dadosPasso3");
        this.props.history.push('/passo3');
    }

    render() {
        return (
            <MasterPage {...this.props}>
                <Box titulo={"Bem-vindo(a) ao momento que vai mudar o seu futuro!"} renderRow={false}>
                    <h4 className={"mb-5"}>Escolha o Plano de Benefícios que melhor se adeque às suas necessidades:</h4>
                    {this.state.planos.map((plano, index) => {
                        return (
                            <div key={index}>
                                <h4>{plano.DS_PLANO} (CPNB: {plano.CPNB})</h4>
                                <p><div dangerouslySetInnerHTML={{ __html: plano.Texto }} /></p>
                                <Botao titulo={`Aderir ao ${plano.DS_PLANO}`} onClick={() => this.continuar(plano)} />

                                {this.state.planos.length > index + 1 &&
                                    <hr />
                                }
                            </div>
                        );
                    })}
                </Box>
                <Botao onClick={() => this.props.history.push('/')} tipo={TipoBotao.light} titulo={"Voltar"} icone={"fa-angle-double-left"} block />
            </MasterPage>
        )
    }
}