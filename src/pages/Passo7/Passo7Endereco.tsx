import React from "react";
import { Box, CampoEstatico } from "@intechprev/componentes-web";

interface Props{
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    ufEndereco: string;
    telefoneFixo: string;
    telefoneCelular: string;
    listaUf: any;
    switchToShowcase: any;
};

interface State{
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    ufEndereco: string;
    telefoneFixo: string;
    telefoneCelular: string;
}

export class Passo7Endereco extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            cep: this.props.cep,
            logradouro: this.props.logradouro,
            numero: this.props.numero,
            complemento: this.props.complemento,
            bairro: this.props.bairro,
            cidade: this.props.cidade,
            ufEndereco: this.props.ufEndereco,
            telefoneFixo: this.props.telefoneFixo,
            telefoneCelular: this.props.telefoneCelular
        };
    };
    
    render(){
        return(
            <Box titulo={"Endereço"}>
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"CEP"} valor={this.state.cep}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Logradouro"} valor={this.state.logradouro}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Número"} valor={this.state.numero}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Complemento"} valor={this.state.complemento}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Bairro"} valor={this.state.bairro}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Cidade"} valor={this.state.cidade}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"UF"} valor={this.props.switchToShowcase(this.props.listaUf, this.state.ufEndereco, "CD_UF", "DS_UF")}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Fixo"} valor={this.state.telefoneFixo}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Celular"} valor={this.state.telefoneCelular}/>
            </Box>
        );
    }
}