import React from "react";
import { Box, CampoTexto, Combo } from "@intechprev/componentes-web";

interface Props{
    listaBanco: any;
};

interface State{
    banco: string;
    agencia: string;
    agenciaDv: string;
    conta: string;
    contaDv: string;
}

export class Passo2DadosBancarios extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            banco: "",
            agencia: "",
            agenciaDv: "",
            conta: "",
            contaDv: ""
        };
    };
    
    render(){
        return(
          <Box titulo={"Dados Bancários"} renderRow={false}>
              <Combo
                  tamanhoLabel={"lg-3"}
                  label={"Banco"}
                  contexto={this}
                  obrigatorio={false}
                  nome={"banco"}
                  valor={this.state.banco}
                  textoVazio={"Selecione um Banco"}
                  opcoes={this.props.listaBanco}
                  nomeMembro={"NO_BANCO"}
                  valorMembro={"CD_BANCO"}
              />
             
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"Agência"}
                  tipo={"text"}
                  contexto={this}
                  nome={"agencia"}
                  valor={this.state.agencia}
              />
            
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"DV Agência"}
                  tipo={"text"}
                  contexto={this}
                  nome={"agenciaDv"}
                  valor={this.state.agenciaDv}
              />
            
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"Nº da Conta"}
                  tipo={"text"}
                  contexto={this}
                  nome={"conta"}
                  valor={this.state.conta}
              />
              
              <CampoTexto
                  tamanhoLabel={"lg-3"}
                  label={"DV Conta"}
                  tipo={"text"}
                  contexto={this}
                  nome={"contaDv"}
                  valor={this.state.contaDv}
              />
          </Box>
        )
    };
}