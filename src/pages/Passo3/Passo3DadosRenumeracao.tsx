import React from "react";
import { History } from "history";
import { Botao, Box, Col, Row, CampoEstatico, CampoTexto, Combo, Form, Alerta, TipoAlerta } from "@intechprev/componentes-web";
import { DMN_PERCENTUAL_PARCELA } from "./../../dominios/DMN_PERCENTUAL_PARCELA";

interface Props{
    history?: History;
    listaRegime: any;
    padraoRegime: any;
    
    toggleModal1: any;
    toggleModal2: any;
};

interface State{
    renumeracao: string;
    parcela1: string;
    parcela2: string;
    regime: string;
    acordo?: boolean;
}

export class Passo3DadosRenumeracao extends React.Component<Props, State>{
    
    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();

    constructor(props: Props){
        super(props);
        this.state = {
            renumeracao: "",
            parcela1: "3%",
            parcela2: "0",
            regime: "",
            acordo: false
        };
    };
    
    regimeInfo = 'Estou ciente que : "O prazo para a opção pelo regime de tributação regressivo será até o último dia útil do mês subsequente ao do ingresso no Plano de Benefícios. Caso o Participante não faça a opção pelo regime de tributação regressivo até o prazo estabelecido, será automaticamernte mantido no regime de tributação progressivo."';
    
    continuar = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validar();
        
        if(this.form.current.state.valido) {
            localStorage.setItem("dados_passo_3", JSON.stringify(this.state));
            this.props.history.push('/passo4');
        }
    }
    
    voltar = async () => {
        this.props.history.push("/passo2");
    }
    
    handleOnChange(e: any): void{
      //...?
      const value = parseFloat(e.target.value);
      console.log(e.target.value);
      console.log(typeof e.target.value);
        // this.setState({
          // parcela2: value
        // });
    }
    
    switchCheckboxValue(): void{
      this.setState({
        acordo: !this.state.acordo
      });
    }
    
    render(){
        return(
            <Box titulo={"Vamos definir sua contribuição:"} renderRow={false}>
              <Form ref={this.form}>
                <CampoTexto
                    tamanhoLabel={"lg-3"}
                    label={"Qual a sua renumeração mensal atual?"}
                    tipo={"number"}
                    contexto={this}
                    nome={"renumeracao"}
                    valor={this.state.renumeracao}
                    obrigatorio
                />
                
                <CampoEstatico
                    tamanhoTitulo={"lg-3"}
                    titulo={"Contribuição Normal de Participante (Parcela 1)"}
                    valor={this.state.parcela1}
                />
                
                <Combo
                    tamanhoLabel={"lg-3"}
                    label={"Contribuição Normal de Participante (Parcela 2)"}
                    contexto={this}
                    obrigatorio={true}
                    nome={"parcela2"}
                    valor={this.state.parcela2}
                    padrao={DMN_PERCENTUAL_PARCELA.default_value}
                    opcoes={DMN_PERCENTUAL_PARCELA.list}
                    nomeMembro={"name"}
                    valorMembro={"value"}
                    
                    grupo
                    iconeBotao={"fa-info-circle"}
                    
                    onBotaoClick={this.props.toggleModal1}
                    tituloBotao={"Saiba Mais"}
                    
                />
                
                <p>
                    Contribuição Normal de Patrocinador:<br />
                    Corresponderá a 100% da Contribuição Normal de Participante (Parcela 1 e 2)
                </p>
                
                <Combo
                    tamanhoLabel={"lg-3"}
                    label={"Escolha a opção de regime de tributação"}
                    contexto={this}
                    obrigatorio={true}
                    nome={"regime"}
                    valor={this.state.regime}
                    padrao={this.props.padraoRegime}
                    opcoes={this.props.listaRegime}
                    nomeMembro={"DS_OPCAO_TRIBUTACAO"}
                    valorMembro={"SQ_OPCAO_TRIBUTACAO"}
                    
                    grupo
                    iconeBotao={"fa-info-circle"}
                    
                    onBotaoClick={this.props.toggleModal2}
                    tituloBotao={"Saiba Mais"}
                    
                />
                
                <label className={"d-flex justify-content-center align-content-center"} htmlFor={"acordo"}>
                    
                    <input type={"checkbox"} id={"acordo"} name={"acordo"} checked={this.state.acordo} onChange={this.switchCheckboxValue.bind(this)}/>
                    
                    <p className={"mx-4 w-75"}>{this.regimeInfo}</p>
                </label>
                
                <Alerta ref={this.alert} tipo={TipoAlerta.danger} padraoFormulario/>
                
                <Botao onClick={this.continuar} titulo={"Continuar"} icone={"fa-angle-double-right"} iconeDireita block/>
                
                <Botao onClick={this.voltar} titulo={"Voltar"} icone={"fa-angle-double-left"} block/>
              </Form>
            </Box>
        );
    }
}