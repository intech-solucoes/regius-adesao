import React from "react";
import axios from "axios";
import MasterPage from "../MasterPage";
import { History } from "history";
import { Botao } from "@intechprev/componentes-web";
import { Passo5InclusaoBeneficiario } from "./Passo5InclusaoBeneficiario";
import { Passo5BeneficiariosIncluidosTable } from "./Passo5BeneficiariosIncluidosTable";

interface Props{
    history?: History;
};

interface State{
    dominios: any;
    listaGrauParentesco: any;
    listaSexo: any;
    edit_info: any;
};

export const beneficiario_incluido_exemplo = [
    {
        nome: "Yuka",
        grau: "0", //DMN_GRAU_PARENTESCO[0]
        nascimento: "01/01/1990",
        percentual: "100%"
    },
    {
        nome: "Eddy",
        grau: "1", //DMN_GRAU_PARENTESCO[1]
        nascimento: "01/01/1990",
        percentual: "100%"
    }
];

export default class Passo5 extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
          listaGrauParentesco: [],
          listaSexo: [],
    
            dominios: JSON.parse(localStorage.getItem("dominios")),
            edit_info: (JSON.parse(localStorage.getItem("edit_info")) || {})
        };
        localStorage.removeItem("edit_info");
    }
    
    continuar = async () => {
        this.props.history.push("/passo6");
    }
    
    voltar = async () => {
        this.props.history.push("/passo4");
    }
    
    render(){
        return(
            <MasterPage {...this.props}>
                <Passo5InclusaoBeneficiario
                    grau={this.state.edit_info.grau}
                    nome={this.state.edit_info.nome}
                    nascimento={this.state.edit_info.nascimento}
                    sexo={this.state.edit_info.sexo}
                    cpf={this.state.edit_info.cpf}
                    percentual={this.state.edit_info.percentual}
                    index={parseInt(this.state.edit_info.index, 10)}
                    listaGrauParentesco={this.state.dominios.listaGrauParentesco}
                    listaSexo={this.state.dominios.listaSexo}
                    padraoGrau={this.state.dominios.listaGrauParentesco[0]["CD_GRAU_PARENTESCO"]}
                    padraoSexo={this.state.dominios.listaSexo[0]["IR_SEXO"]}
                />
                
                <Passo5BeneficiariosIncluidosTable/>
                
                <Botao onClick={this.continuar} titulo={"Continuar"} icone={"fa-angle-double-right"} iconeDireita block/>
                
                <Botao onClick={this.voltar} titulo={"Voltar"} icone={"fa-angle-double-left"} block/>
            </MasterPage>
        );
    };
}