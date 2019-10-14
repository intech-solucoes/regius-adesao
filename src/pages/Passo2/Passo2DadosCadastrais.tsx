import React from "react";
import axios from "axios";
import { Box, CampoEstatico, CampoTexto, Combo } from "@intechprev/componentes-web";

interface Props{
    nome: string;
    cpf: string;
    listaSexo: any;
    listaUf: any;
    listaEstadoCivil: any;
    listaNacionalidade: any;
    
    padraoNacionalidade: string;


};

interface State{
    nome: string;
    email: string;
    nascimento: string;
    sexo: string;
    cpf: string;
    nacionalidade: string;
    naturalidade: string;
    uf: string;
    rg: string;
    orgao: string;
    emissao: string;
    estadoCivil: string;
    mae: string;
    pai: string;
}

export class Passo2DadosCadastrais extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            nome: this.props.nome,
            email: "",
            nascimento: "",
            sexo: "",
            cpf: this.props.cpf,
            nacionalidade: "",
            naturalidade: "",
            uf: "",
            rg: "",
            orgao: "",
            emissao: "",
            estadoCivil: "",
            mae: "",
            pai: ""
        };
    }
    
    render(){
        return(
            <Box titulo={"Dados Cadastrais"} renderRow={false}>
                <CampoEstatico
                    tamanhoTitulo={"lg-3"}
                    titulo={"Nome"}
                    valor={this.state.nome}
                    obrigatorio
                />

                <CampoTexto
                    tamanhoLabel={"lg-3"}
                    label={"E-mail"}
                    tipo={"email"}
                    contexto={this}
                    nome={"email"}
                    valor={this.state.email}
                    obrigatorio
                />
         
                <CampoTexto
                    tamanhoLabel={"lg-3"}
                    label={"Data de Nascimento"}
                    tipo={"date"} contexto={this}
                    nome={"nascimento"}
                    valor={this.state.nascimento}
                    obrigatorio
                />
               
                
                <Combo
                    tamanhoLabel={"lg-3"}
                    label={"Sexo"}
                    contexto={this}
                    obrigatorio={true}
                    nome={"sexo"}
                    valor={this.state.sexo}
                    textoVazio={"Selecione o Sexo"}
                    opcoes={this.props.listaSexo}
                    nomeMembro={"DS_SEXO"}
                    valorMembro={"IR_SEXO"}
                />
                
                <CampoEstatico
                    tamanhoTitulo={"lg-3"}
                    titulo={"CPF"}
                    valor={this.state.cpf}
                />
            
                
                <Combo
                    tamanhoLabel={"lg-3"}
                    label={"Nacionalidade"}
                    contexto={this}
                    obrigatorio={true}
                    nome={"nacionalidade"}
                    valor={this.state.nacionalidade}
                    padrao={this.props.padraoNacionalidade}
                    opcoes={this.props.listaNacionalidade}
                    nomeMembro={"DS_NACIONALIDADE"}
                    valorMembro={"CD_NACIONALIDADE"}
                />
                
                <CampoTexto
                    tamanhoLabel={"lg-3"}
                    label={"Local de Nascimento"}
                    tipo={"text"}
                    contexto={this}
                    nome={"naturalidade"}
                    valor={this.state.naturalidade}
                    obrigatorio
                />
                
                <Combo
                    tamanhoLabel={"lg-3"}
                    label={"UF de Nascimento"}
                    contexto={this}
                    obrigatorio={true}
                    nome={"uf"}
                    valor={this.state.uf}
                    textoVazio={"Selecione a UF"}
                    opcoes={this.props.listaUf}
                    nomeMembro={"DS_UF"}
                    valorMembro={"CD_UF"}
                />
             
                <CampoTexto
                    tamanhoLabel={"lg-3"}
                    label={"RG"}
                    tipo={"number"}
                    contexto={this}
                    nome={"rg"}
                    valor={this.state.rg}
                />
               
                <CampoTexto
                    tamanhoLabel={"lg-3"}
                    label={"Orgão Expedidor"}
                    tipo={"text"}
                    contexto={this}
                    nome={"orgao"}
                    valor={this.state.orgao}
                />
               
                <CampoTexto
                    tamanhoLabel={"lg-3"}
                    label={"Data de Expedição"}
                    tipo={"date"}
                    contexto={this}
                    nome={"emissao"}
                    valor={this.state.emissao}
                />
               
                <Combo
                    tamanhoLabel={"lg-3"}
                    label={"Estado Civil"}
                    contexto={this}
                    obrigatorio={true}
                    nome={"estadoCivil"}
                    valor={this.state.estadoCivil}
                    textoVazio={"Selecione o Estado Civil"}
                    opcoes={this.props.listaEstadoCivil}
                    nomeMembro={"DS_ESTADO_CIVIL"}
                    valorMembro={"CD_ESTADO_CIVIL"}
                />
                
                <CampoTexto
                    tamanhoLabel={"lg-3"}
                    label={"Nome da Mãe"}
                    tipo={"text"}
                    contexto={this}
                    nome={"mae"}
                    valor={this.state.mae}
                    obrigatorio
                />
                
                <CampoTexto
                    tamanhoLabel={"lg-3"}
                    label={"Nome do Pai"}
                    tipo={"text"}
                    contexto={this}
                    nome={"pai"}
                    valor={this.state.pai}
                />
            </Box>
        );
    };
}