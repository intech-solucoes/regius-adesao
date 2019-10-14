import React from "react";
import axios from "axios";
import { Botao, Box, CampoTexto, Combo } from "@intechprev/componentes-web";

interface Props{
    listaUf: any;
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

export class Passo2Endereco extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            cep: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            ufEndereco: "",
            telefoneFixo: "",
            telefoneCelular: ""
        };
    };
    
    loadAddress = (): void => {
      const tempCEP = this.state.cep.replace("-", "");
      if(tempCEP.length !== 8){
        console.log("CEP is an 8 digit number following either of those formats: 12345678, 12345-678.");
        return null;
      }
      axios
        .get(`https://viacep.com.br/ws/${tempCEP}/json/`)
        .then((res) => {
          if(res.data.erro){
            console.log("That was an invalid CEP, probably.");
            return null;
          }
          const address = res.data;
          this.setState({
            bairro: address.bairro,
            complemento: address.complemento,
            cidade: address.localidade, //meh...
            logradouro: address.logradouro,
            ufEndereco: address.uf
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
    render(){
        return(
          <Box titulo={"Endereço"} renderRow={false}>
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"CEP"}
                  tipo={"text"}
                  mascara={"99999-999"}
                  contexto={this}
                  nome={"cep"}
                  valor={this.state.cep}
                  obrigatorio
                  grupo
                  onBotaoClick={this.loadAddress}
                  tituloBotao={"Buscar Endereço"}
                  iconeBotao={"fa-map-marker-alt"}
                  iconeBotaoDireita
              />
              {/*
              <Botao
                  onClick={this.loadAddress.bind(this)}
                  className={"mb-4"}
                  titulo={"Buscar Endereço"}
                  icone={"fa-map-marker-alt"}
                  iconeDireita
    />*/}
            
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"Logradouro"}
                  tipo={"text"}
                  contexto={this}
                  nome={"logradouro"}
                  valor={this.state.logradouro}
                  obrigatorio
              />
              
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"Número"}
                  tipo={"text"}
                  contexto={this}
                  nome={"numero"}
                  valor={this.state.numero}
                  obrigatorio
              />
              
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"Complemento"}
                  tipo={"text"}
                  contexto={this}
                  nome={"complemento"}
                  valor={this.state.complemento}
              />
              
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"Bairro"}
                  tipo={"text"}
                  contexto={this}
                  nome={"bairro"}
                  valor={this.state.bairro}
                  obrigatorio
              />
              
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"Cidade"}
                  tipo={"text"}
                  contexto={this}
                  nome={"cidade"}
                  valor={this.state.cidade}
                  obrigatorio
              />
              
              <Combo
                  tamanhoLabel={"lg-3"}
                  label={"UF"}
                  contexto={this}
                  obrigatorio={true}
                  nome={"ufEndereco"}
                  valor={this.state.ufEndereco}
                  textoVazio={"Selecione a UF"}
                  opcoes={this.props.listaUf}
                  nomeMembro={"DS_UF"}
                  valorMembro={"CD_UF"}
              />
              
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"Telefone Fixo"}
                  tipo={"text"}
                  contexto={this}
                  nome={"telefoneFixo"}
                  valor={this.state.telefoneFixo}
                  mascara={"(99)9999-9999"}
              />
              
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"Celular"}
                  tipo={"text"}
                  contexto={this}
                  nome={"telefoneCelular"}
                  valor={this.state.telefoneCelular}
                  obrigatorio
                  mascara={"(99)99999-9999"}
              />
            </Box>
        );
    }
}