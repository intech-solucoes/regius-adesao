import React from "react";
import { Modal } from "@intechprev/componentes-web";

interface Props{
    modal_status: boolean
    toggleModal: any;
}

interface State{}

export class SaibaMaisContribuicao extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {}
    }
    
    renderBody(){
        return(
          <div>
            <p>{"Composta de duas parcelas:"}</p>
            <p>{"PARCELA 1 - Corresponde a 3% da sua renumeração que estiver abaixo de 1 UP*;"}</p>
            <p>{"PARCELA 2 - Corresponde a um percentual escolhido por você, entre 3,75% e 7,50%, que será aplicado sobre a sua renumeração que exceder a 1 UP*."}</p>
            <p>{"*UP - Unidade Previdenciária - Corresponde ao valor máximo dos benefícios pagos pelo Regime Geral de Previdência Social (Teto do RGPS)."}</p>
          </div>
        );
    }
    
    render(){
        return(
            <div className={"m-3"}>
                <Modal
                    status={this.props.modal_status}
                    onClick={this.props.toggleModal}
                    titulo={"Contribuição Normal de Participante"}
                    conteudo={this.renderBody()}
                />
            </div>
        );
    };
}