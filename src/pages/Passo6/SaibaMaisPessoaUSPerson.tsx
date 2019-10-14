import React from "react";
import { Modal } from "@intechprev/componentes-web";

interface Props{
    modal_status: boolean
    toggleModal: any;
}

interface State{}

const artigo = "Conforme acordo (FATCA) firmado entre o Governo Brasileiro e o Governo Americano, com o objetivo de combater a evasão fiscal dos Estados Unidos, a FACEB, como Entidade Fechada de Previdência Complementar, deve identificar todos os participantes denominados US PERSON em sua base de dados, ou seja, pessoas que possuem uma das características:";

const características = [
    "Ter cidadania norte-americana",
    "Ter dula nascionalidade, uma delas norte-americana",
    "Ter passaporte norte-americano, mesmo com residência fora dos Estados Unidos",
    "Ser detentor de Green Card",
    "Ter local de nascimento nos Estados Unidos",
    "Possuir telefone nos Estados Unidos",
    "Ter residência permanente ou presença substancial nos Estados Unidos (se ficou nos Estados Unidos pelo menos 31 dias no ano corrente e / ou 183 dias nos últimos três anos)",
    "Possuir, pelo menos, 10% de participação em empresas nasionais ou internacionais",
];

export class SaibaMaisPessoaUSPerson extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {}
    }
    
    renderListItems(){
        const li = [];
        for(let i = 0; i < características.length; i++){
            li.push(
                <li key={i}>{`${características[i]};`}</li>
            );
        }
        
        return li;
    }
    
    renderBody(){
        return(
            <div>
                <h4>Você é um US PERSON?</h4>
                <p>{artigo}</p>
                <ul>{this.renderListItems()}</ul>
            </div>
        );
    }
    
    render(){
        return(
            <div className={"m-3"}>
                <Modal
                    status={this.props.modal_status}
                    onClick={this.props.toggleModal}
                    titulo={"US PERSON"}
                    conteudo={this.renderBody()}
                />
          </div>
        );
    };
}