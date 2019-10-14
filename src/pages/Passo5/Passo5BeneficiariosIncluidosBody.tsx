import React from "react";
import { Botao } from "@intechprev/componentes-web";

interface Props{
    id: number;
    nome: string;
    grau: string;
    nascimento: string;
    percentual: string;
};

interface State{};

export class Passo5BeneficiariosIncluidosBody extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {};
    }
    
    editItem(){
        // const index = this._reactInternalFiber.index;
        const index = this.props.id;
        // console.log(this.props.id);
        
        let edit_info = JSON.parse(localStorage.getItem("beneficiarios"))[index];
        // console.log(edit_info);
        edit_info["index"] = index;
        
        // console.log(edit_info);
        localStorage.setItem("edit_info", JSON.stringify(edit_info));
        alert("Por favor insira as novas informações do beneficiário.");
        window.location.reload(true);
    }
    
    deleteItem(){
        const beneficiarios = JSON.parse(localStorage.getItem("beneficiarios"));
        // const index = this._reactInternalFiber.index
        const index = this.props.id;
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
                <td className={"pt-1 pl-7 pb-0 pr-0"}>
                    <button onClick={this.deleteItem.bind(this)} className="transparent trash-button"><i className="far fa-trash-alt"></i></button>
                    <button onClick={this.editItem.bind(this)} className="transparent pencil-button"><i className="fas fa-pencil-alt"></i></button>
                </td>
            </tr>
        );
    };
}