import React from "react";
import axios from "axios";
import MasterPage from "../MasterPage";
import { Botao, Box } from "@intechprev/componentes-web";
/* Import page components */
import { Passo7DadosFuncionais } from "./Passo7DadosFuncionais";
import { Passo7DadosCadastrais } from "./Passo7DadosCadastrais";
import { Passo7Endereco } from "./Passo7Endereco";
import { Passo7DadosBancarios } from "./Passo7DadosBancarios";
import { Passo7BeneficiariosIncluidosTable } from "./Passo7BeneficiariosIncluidosTable";
import { Passo7DefinicaoRenumeracao } from "./Passo7DefinicaoRenumeracao";
import { Passo7PoliticamenteExposta } from "./Passo7PoliticamenteExposta";
import { Passo7DeclaracaoParticipante } from "./Passo7DeclaracaoParticipante";
/* Import domains */
import { DMN_SIM_NAO } from "./../../dominios/DMN_SIM_NAO";
import { DMN_PERCENTUAL_PARCELA } from "./../../dominios/DMN_PERCENTUAL_PARCELA";

//=> find out how to use default values
//=> review add and edit beneficiarios

/*
cargos texto? -> fake boss gonna argue about that
nome do conjure? -> new law, but not sure how to do it yet
declaracao do participante? -> not yet, as it doesnt make perfect sense

-> wtf to do about default values on page 1?
-> muitas alteracoes nos dados de renumeracao

-> transpor o projeto para o curitibaprev-adesao
-> usar table
-> mudar as labels
-> tentar limpar o extra.scs

CD_BANCO
CD_ESTADO_CIVIL
CD_GRAU_PARENTESCO
CD_NACIONALIDADE
CD_PESSOA_PATR
SQ_OPCAO_TRIBUTACAO
IR_SEXO
CD_UF

*/

interface Props{};

interface State{
    dominios: any;
    dados: any;
    acordo: boolean;
};

export default class Passo7 extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            dominios: JSON.parse(localStorage.getItem("dominios")),
            dados: {
                passo_1: JSON.parse(localStorage.getItem("dados_passo_1")),
                passo_2: JSON.parse(localStorage.getItem("dados_passo_2")),
                passo_3: JSON.parse(localStorage.getItem("dados_passo_3")),
                passo_6: JSON.parse(localStorage.getItem("dados_passo_6"))
            },
            acordo: false
        };
    }
    
    switchToShowcase(dmn: any, target: any, valueAlias="value", nameAlias="name"){
      // console.log(nameAlias);
      // console.log(dmn);
        for(let d = 0; d < dmn.length; d++){
          // console.log(String(dmn[d][valueAlias]) === String(target));
          
            if(String(dmn[d][valueAlias]) === String(target)){
                // console.log(typeof dmn[d][nameAlias]);
                return dmn[d][nameAlias];
            }
        }
        return "";
    }
    
    switchCheckboxValue(){
      this.setState({
        acordo: !this.state.acordo
      });
    }
    
    finish(){
        if(this.state.acordo){
            alert("woohoo!\nNow wait for the api.");
        }
        else{
            alert("Manifeste ciência!");
        }
    }
    
    render(){
        return(
            <MasterPage {...this.props}>
              <Box titulo={"Resumo das Informações"} renderRow={false}>
                <Passo7DadosFuncionais
                    patrocinadora={this.state.dados.passo_1.patrocinadora}
                    matricula={this.state.dados.passo_1.matricula}
                    admissao={this.state.dados.passo_2.admissao}
                    listaPatrocinadora={this.state.dominios.listaPatrocinadora}
                    switchToShowcase={this.switchToShowcase}
                />
                  
                <Passo7DadosCadastrais
                    nome={this.state.dados.passo_1.nome}
                    email={this.state.dados.passo_2.email}
                    nascimento={this.state.dados.passo_2.nascimento}
                    sexo={this.state.dados.passo_2.sexo}
                    cpf={this.state.dados.passo_1.cpf}
                    rg={this.state.dados.passo_2.rg}
                    orgao={this.state.dados.passo_2.orgao}
                    emissao={this.state.dados.passo_2.emissao}
                    estadoCivil={this.state.dados.passo_2.estadoCivil}
                    mae={this.state.dados.passo_2.mae}
                    pai={this.state.dados.passo_2.pai}
                    listaSexo={this.state.dominios.listaSexo}
                    listaEstadoCivil={this.state.dominios.listaEstadoCivil}
                    switchToShowcase={this.switchToShowcase}
                />
                
                
                <Passo7Endereco
                    cep={this.state.dados.passo_2.cep}
                    logradouro={this.state.dados.passo_2.logradouro}
                    numero={this.state.dados.passo_2.numero}
                    complemento={this.state.dados.passo_2.complemento}
                    bairro={this.state.dados.passo_2.bairro}
                    cidade={this.state.dados.passo_2.cidade}
                    ufEndereco={this.state.dados.passo_2.ufEndereco}
                    telefoneFixo={this.state.dados.passo_2.telefoneFixo}
                    telefoneCelular={this.state.dados.passo_2.telefoneCelular}
                    listaUf={this.state.dominios.listaUf}
                    switchToShowcase={this.switchToShowcase}
                />
                
                <Passo7DadosBancarios
                    banco={this.state.dados.passo_2.banco}
                    agencia={this.state.dados.passo_2.agencia}
                    conta={this.state.dados.passo_2.conta}
                    listaBanco={this.state.dominios.listaBanco}
                    switchToShowcase={this.switchToShowcase}
                />
                
                <Passo7DefinicaoRenumeracao
                    parcela1={this.state.dados.passo_3.parcela1}
                    parcela2={this.switchToShowcase(DMN_PERCENTUAL_PARCELA.list, this.state.dados.passo_3.parcela2)}
                    regime={this.switchToShowcase(this.state.dominios.listaRegime, this.state.dados.passo_3.regime, "SQ_OPCAO_TRIBUTACAO", "DS_OPCAO_TRIBUTACAO")}
                />
                
                <Passo7BeneficiariosIncluidosTable/>
                
                <Passo7PoliticamenteExposta
                    exposto={this.switchToShowcase(DMN_SIM_NAO.list, this.state.dados.passo_6.exposto)}
                    expostoFamiliar={this.switchToShowcase(DMN_SIM_NAO.list, this.state.dados.passo_6.expostoFamiliar)}
                    usperson={this.switchToShowcase(DMN_SIM_NAO.list, this.state.dados.passo_6.usperson)}
                />
                
                <Box titulo={"Declaração Participante"}>
                <label className={"d-flex justify-content-center align-content-center"} htmlFor={"acordo"}>
                  
                    <input type={"checkbox"}  id={"acordo"} name={"acordo"} checked={this.state.acordo} onChange={this.switchCheckboxValue.bind(this)}/>

                    <Passo7DeclaracaoParticipante/>
                </label>
                </Box>
                
                <Botao onClick={this.finish.bind(this)} titulo={"Confirmar proposta de adessão"} block/>
              </Box>
            </MasterPage>
        );
    };
}