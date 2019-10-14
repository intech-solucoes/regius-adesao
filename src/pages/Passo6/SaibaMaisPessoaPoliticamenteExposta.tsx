import React from "react";
import { Modal } from "@intechprev/componentes-web";

interface Props{
    modal_status: boolean
    toggleModal: any;
}

interface State{}

const artigo = "Enquadra-se na condição de pessoa politicamente exposta os agentes públicos que desempenham ou tenham desempenhado, nos últimos cinco anos, no Brasil ou em países, territórios ou dependências estrangeiras, cargos, empregos ou funcções públicas relevantes, assim como seus familiares na linha direta e até o segundo grau, o cônjuge, o companheiro, a companheira, o enteado e a enteada, na forma do §1º, artigo 2º, da resolução COAF nº 29/2017";

export class SaibaMaisPessoaPoliticamenteExposta extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {}
    }
    
    renderBody(){
        return(
            <div>
                <h4>Você é uma pessoa politicamente exposta?</h4>
                <p>{artigo}</p>
            </div>
        );
    }
    
    render(){
        return(
            <div className={"m-3"}>
                <Modal
                    status={this.props.modal_status}
                    onClick={this.props.toggleModal}
                    titulo={"Pessoa Politicamente Exposta"}
                    conteudo={this.renderBody()}
                />
            </div>
        );
    };
}