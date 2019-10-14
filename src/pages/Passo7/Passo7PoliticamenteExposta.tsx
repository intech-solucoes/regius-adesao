import React from "react";
import { Box, CampoEstatico } from "@intechprev/componentes-web";

interface Props{
    exposto: string;
    expostoFamiliar: string;
    usperson: string;
};

interface State{
    exposto: string;
    expostoFamiliar: string;
    usperson: string;
};

export class Passo7PoliticamenteExposta extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            exposto: this.props.exposto,
            expostoFamiliar: this.props.expostoFamiliar,
            usperson: this.props.usperson
        };
    };
    
    render(){
        return(
            <Box titulo={"Pessoa Politicamente Exposta"}>
                <h4 className={"subtitle"}></h4>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"É uma pessoa politicamente exposta?"} valor={this.state.exposto}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Tem parentes politicamente expostos?"} valor={this.state.expostoFamiliar}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"É FACTA (US-PERSON)"} valor={this.state.usperson}/>
            </Box>
        )
    }
}