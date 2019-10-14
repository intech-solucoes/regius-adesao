import React from "react";
import axios from "axios";
import MasterPage from "../MasterPage";
import { History } from "history";
import { Passo3DadosRenumeracao } from "./Passo3DadosRenumeracao";
import { SaibaMaisContribuicao } from "./SaibaMaisContribuicao";
import { SaibaMaisRegime } from "./SaibaMaisRegime";

interface Props{
    history?: History;
};

interface State{
    dominios: any;
    
    modal1_status: boolean;
    modal2_status: boolean;
};

export default class Passo3 extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            modal1_status: false,
            modal2_status: false,
          
            dominios: JSON.parse(localStorage.getItem("dominios")),
        };
    }
    
    toggleModal1 = () => {
        this.setState({
            modal1_status: !this.state.modal1_status
        });
    }
    
    toggleModal2 = () => {
        this.setState({
            modal2_status: !this.state.modal2_status
        });
    }
    
    render(){
        return(
            <MasterPage {...this.props}>
                <Passo3DadosRenumeracao
                    listaRegime={this.state.dominios.listaRegime}
                    padraoRegime={this.state.dominios.listaRegime[0]["SQ_OPCAO_TRIBUTACAO"]}
                    toggleModal1={this.toggleModal1}
                    toggleModal2={this.toggleModal2}
                    {...this.props}
                />
                
                <SaibaMaisContribuicao
                    modal_status={this.state.modal1_status}
                    toggleModal={this.toggleModal1}
                />
                
                <SaibaMaisRegime
                    modal_status={this.state.modal2_status}
                    toggleModal={this.toggleModal2}
                />
            </MasterPage>
        );
    };
}