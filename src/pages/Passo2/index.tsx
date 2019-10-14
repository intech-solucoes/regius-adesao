import React from "react";
import axios from "axios";
import moment from "moment";
import MasterPage from "../MasterPage";
import { History } from "history";
import { Alerta, Botao, Col, Form, Row, TipoAlerta } from "@intechprev/componentes-web"
import { Passo2Intro } from "./Passo2Intro";
import { Passo2DadosFuncionais } from "./Passo2DadosFuncionais";
import { Passo2DadosCadastrais } from "./Passo2DadosCadastrais";
import { Passo2Endereco } from "./Passo2Endereco";
import { Passo2DadosBancarios } from "./Passo2DadosBancarios";

interface Props{
    history?: History;
};

interface State{
    dominios: any;
    dados_passo_1: any;
};

export default class Passo2 extends React.Component<Props, State>{

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();
    
    constructor(props: Props){
        super(props);
        this.state = {
            dominios: JSON.parse(localStorage.getItem("dominios")),
            dados_passo_1: JSON.parse(localStorage.getItem("dados_passo_1"))
        };
        // this.setState(this.state);
    }
    
    continuar = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validarAlt();
        
        const wholeData: any = document.querySelectorAll('input, select');
        let values: any = {};
        
        for(let i = 0; i < wholeData.length; i++){
            values[wholeData[i].name] = wholeData[i].value;
        }
        
        await this.validarEmail(values.email);
        await this.validarData(values.admissao, values.nascimento);
        
        if(this.form.current.state.valido){
            localStorage.setItem("dados_passo_2", JSON.stringify(values));
            this.props.history.push('/passo3');
        }
    }
    
    validarEmail = async (email) => {
      //10.10.170.11
        try{
            await axios.get(`http://10.10.170.11/CuritibaPrevAPI/api/adesao/ValidarEmail/${email}`);
        } catch(err){
          console.log(err.response);
            if(err.response)
                await this.alert.current.adicionarErro(err.response.data || "Email Inválido.");
            else
                await this.alert.current.adicionarErro(err);

            this.form.current.setState({ valido: false });
        }
    }
    
    validarData = async (admissao="01-01-1900", nascimento="01-01-1900") => {
        try{
            await axios.get(`http://10.10.170.11/CuritibaPrevAPI/api/adesao/ValidarDataAdmissao/${admissao}/${nascimento}`);
        } catch(err){
            if(err.response)
                await this.alert.current.adicionarErro(err.response.data || "Data de Admissão e Data de Nascimento são  obrigatórios.");
            else
                await this.alert.current.adicionarErro(err);

            this.form.current.setState({ valido: false });
        }
    }
    
    voltar = async () => {
        this.props.history.push("/");
    }
    
    /* This is used to display the 'name' property of the
       domains instead of the 'value', which usually is
       meaningless to the end user.
    */
    switchToShowcase(dmn: any, target: any, valueAlias="value", nameAlias="name"){
      // console.log(dmn);
      // console.log(target);
        for(let d = 0; d < dmn.length; d++){
            if(String(dmn[d][valueAlias]) === String(target)){
                return dmn[d][nameAlias];
            }
        }
        return "";
    }
    
    render(){
        return(
            <MasterPage {...this.props}>
               <Form ref={this.form}>
                  <Passo2Intro
                    nome={this.state.dados_passo_1.nome}
                  />
                  
                  <Passo2DadosFuncionais
                    patrocinadora={this.state.dados_passo_1.patrocinadora}
                    matricula={this.state.dados_passo_1.matricula}
                    listaPatrocinadora={this.state.dominios.listaPatrocinadora}
                    listaCargo={this.state.dominios.listaCargo}
                    switchToShowcase={this.switchToShowcase}
                  />
                  
                  <Passo2DadosCadastrais
                    listaNacionalidade={this.state.dominios.listaNacionalidade}
                    listaSexo={this.state.dominios.listaSexo}
                    listaUf={this.state.dominios.listaUf}
                    listaEstadoCivil={this.state.dominios.listaEstadoCivil}
                    nome={this.state.dados_passo_1.nome}
                    cpf={this.state.dados_passo_1.cpf}
                    
                    padraoNacionalidade={this.state.dominios.listaNacionalidade[0]["CD_NACIONALIDADE"]}
                    
                  />
                  
                  <Passo2Endereco
                    listaUf={this.state.dominios.listaUf}
                  />
                  
                  <Passo2DadosBancarios
                    listaBanco={this.state.dominios.listaBanco}
                  />
                  
                  <Alerta ref={this.alert} tipo={TipoAlerta.danger} padraoFormulario />
                  
                  <Botao onClick={this.continuar} titulo={"Continuar"} icone={"fa-angle-double-right"} iconeDireita block submit/>
                  
                  <Botao onClick={this.voltar} titulo={"Voltar"} icone={"fa-angle-double-left"} block/>
               </Form>
            </MasterPage>
        );
    }
}