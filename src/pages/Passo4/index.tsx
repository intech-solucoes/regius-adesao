import React from "react";
import { History } from "history";
import { Box, Botao, TipoBotao } from "@intechprev/componentes-web";

import MasterPage from "../MasterPage";
import moment from "moment";
import { StatePasso1 } from "../Passo1";

interface Props {
    history?: History;
};

interface State {
    protocolo: string;
};

export default class Passo4 extends React.Component<Props, State> {

    dadosPasso1: StatePasso1 = JSON.parse(localStorage.getItem("dadosPasso1"));

    state: State = {
        protocolo: ""
    }

    componentDidMount = async() => {
        var protocolo = localStorage.getItem("protocolo");
        await this.setState({
            protocolo
        });
        await localStorage.clear();
    }

    render() {
        return (
            <MasterPage {...this.props}>
                <Box titulo={"Proposta de Adesão realizada!"} renderRow={false}>
                    <h4>Sua proposta de adesão foi enviada à REGIUS para homologação.</h4>
                    <h5 className={"mt-5"}>Número de Protocolo</h5>
                    <h2>{this.state.protocolo}</h2>
                </Box>
            </MasterPage>
        );
    }
}