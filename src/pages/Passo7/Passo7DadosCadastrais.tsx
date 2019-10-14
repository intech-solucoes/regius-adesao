import React from "react";
import { Box, CampoEstatico } from "@intechprev/componentes-web";

interface Props{
    nome: string;
    email: string;
    nascimento: string;
    sexo: string;
    cpf: string;
    rg: string;
    orgao: string;
    emissao: string;
    estadoCivil: string;
    mae: string;
    pai: string;
    listaSexo: any;
    listaEstadoCivil: any;
    switchToShowcase: any;
};

interface State{
    nome: string;
    email: string;
    nascimento: string;
    sexo: string;
    cpf: string;
    rg: string;
    orgao: string;
    emissao: string;
    estadoCivil: string;
    mae: string;
    pai: string;
}

export class Passo7DadosCadastrais extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            nome: this.props.nome,
            email: this.props.email,
            nascimento: this.props.nascimento,
            sexo: this.props.sexo,
            cpf: this.props.cpf,
            rg: this.props.rg,
            orgao: this.props.orgao,
            emissao: this.props.emissao,
            estadoCivil: this.props.estadoCivil,
            mae: this.props.mae,
            pai: this.props.pai
        };
    }
   
    render(){
        return(
            <Box titulo={"Dados Cadastrais"}>
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Nome Completo"} valor={this.state.nome}/>
                 
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"E-mail"} valor={this.state.email}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Data de Nascimento"} valor={this.state.nascimento}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Sexo"} valor={this.props.switchToShowcase(this.props.listaSexo, this.state.sexo, "IR_SEXO", "DS_SEXO")}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"CPF"} valor={this.state.cpf}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"RG"} valor={this.state.rg}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Orgão Expedidor"} valor={this.state.orgao}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Emissão"} valor={this.state.emissao}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Estado Civil"} valor={this.props.switchToShowcase(this.props.listaEstadoCivil, this.state.estadoCivil, "CD_ESTADO_CIVIL", "DS_ESTADO_CIVIL")}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Nome da Mãe"} valor={this.state.mae}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Nome do Pai"} valor={this.state.pai}/>
            </Box>
        );
    };
}