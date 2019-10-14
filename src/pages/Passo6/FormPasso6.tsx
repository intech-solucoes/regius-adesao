import React from "react";
import { History } from "history";
import { Botao, Box, Combo, Form, Alerta, TipoAlerta } from "@intechprev/componentes-web";
import { DMN_SIM_NAO } from "./../../dominios/DMN_SIM_NAO";

interface Props{
    history?: History;
    toggleModal1: any;
    toggleModal2: any;
};

interface State{
    exposto: string;
    expostoFamiliar: string;
    usperson: string;
};

export class FormPasso6 extends React.Component<Props, State>{

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();
    
    constructor(props: Props){
        super(props);
        this.state = {
            exposto: "",
            expostoFamiliar: "",
            usperson: ""
        };
    }
    
    continuar = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validarAlt();
        
        if(this.form.current.state.valido) {
            localStorage.setItem("dados_passo_6", JSON.stringify(this.state));
            this.props.history.push('/passo7');
        }
    }
    
    render(){
        return(
            <Box titulo={"Pessoa Politicamente Exposta (IN SNPC 18/2014)"} renderRow={false}>
                <Form ref={this.form}>

                    <Combo
                        tamanhoLabel={"5"}
                        label={"Considera-se enquandrado como PESSOA POLITICAMENTE EXPOSTA* (IN SNPC 18/2014)?"}
                        contexto={this}
                        obrigatorio={true}
                        nome={"exposto"}
                        valor={this.state.exposto}
                        textoVazio={"Escolha uma opção"}
                        opcoes={DMN_SIM_NAO.list_reversed}
                        nomeMembro={"name"}
                        valorMembro={"value"}
                        
                        grupo
                        iconeBotao={"fa-info-circle"}
                        
                        onBotaoClick={this.props.toggleModal1}
                        tituloBotao={"Saiba Mais"}
                        
                    />
                  
                    <Combo tamanhoLabel={"5"} label={"Há familiares (pais, filhos, cônjuge, companheiro(a) ou enteado(a) que possam estar enquadrados como PESSOA POLITICAMENTE EXPOSTA na mesma situação?"} contexto={this} obrigatorio={true}
                        nome={"expostoFamiliar"} valor={this.state.expostoFamiliar} textoVazio={"Escolha uma opção"}
                        opcoes={DMN_SIM_NAO.list_reversed} nomeMembro={"name"} valorMembro={"value"}
                    />

                    <Combo
                        tamanhoLabel={"5"}
                        label={"Considera-se, para os devidos fins de direito sob as penas da lei, como US PERSON?"}
                        contexto={this}
                        obrigatorio={true}
                        nome={"usperson"}
                        valor={this.state.usperson}
                        textoVazio={"Escolha uma opção"}
                        opcoes={DMN_SIM_NAO.list_reversed}
                        nomeMembro={"name"}
                        valorMembro={"value"}
                        
                        grupo
                        iconeBotao={"fa-info-circle"}
                        
                        onBotaoClick={this.props.toggleModal2}
                        tituloBotao={"Saiba Mais"}
                        
                    />
                
                    <Alerta ref={this.alert} tipo={TipoAlerta.danger} padraoFormulario />
                
                    <Botao onClick={this.continuar} titulo={"Continuar"} icone={"fa-angle-double-right"} iconeDireita block/>
                </Form>
            </Box>
        );
    }
}