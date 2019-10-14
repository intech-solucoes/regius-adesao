import React from "react";
import { Box, CampoEstatico } from "@intechprev/componentes-web";

interface Props{
    banco: string;
    agencia: string;
    conta: string;
    listaBanco: any;
    switchToShowcase: any;
};

interface State{
    banco: string;
    agencia: string;
    conta: string;
}

export class Passo7DadosBancarios extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            banco: this.props.banco,
            agencia: this.props.agencia,
            conta: this.props.conta
        };
    };
    
    render(){
        return(
          <Box titulo={"Dados Bancários"}>
              <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Banco"} valor={this.props.switchToShowcase(this.props.listaBanco, this.state.banco, "CD_BANCO", "NO_BANCO")}/>
              
              <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Agência + DV"} valor={this.state.agencia}/>
              
              <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Nº da Conta + DV"} valor={this.state.conta}/>
          </Box>
        )
    };
}