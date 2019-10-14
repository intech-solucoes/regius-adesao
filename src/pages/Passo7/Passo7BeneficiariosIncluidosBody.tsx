import React from "react";
import { Botao } from "@intechprev/componentes-web";

interface Props{
    nome: string;
    grau: string;
    nascimento: string;
    percentual: string;
};

interface State{};

export class Passo7BeneficiariosIncluidosBody extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {};
    }
    
    deleteItem(){
        const beneficiarios = JSON.parse(localStorage.getItem("beneficiarios"));
        // const index = this._reactInternalFiber.index
        const index = 0;
        beneficiarios.splice(index, 1);
        localStorage.setItem("beneficiarios", JSON.stringify(beneficiarios));
        window.location.reload(true);
    }
    
    render(){
        return(
            <tr>
                <td>{this.props.nome}</td>
                <td>{this.props.grau}</td>
                <td>{this.props.nascimento}</td>
                <td>{this.props.percentual}</td>
            </tr>
        );
    };
}