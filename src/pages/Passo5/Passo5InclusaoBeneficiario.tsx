import React from "react";
import axios from "axios";
import { Alerta, Botao, Box, CampoTexto, Combo, Form, TipoAlerta } from "@intechprev/componentes-web";

interface Props{
    grau: string;
    nome: string;
    nascimento: string;
    sexo: string;
    cpf: string;
    percentual: string;
    index: number;
    listaGrauParentesco: any;
    listaSexo: any;
    padraoGrau: string;
    padraoSexo: string;
};

interface State{
    grau: string;
    nome: string;
    nascimento: string;
    sexo: string;
    cpf: string;
    percentual: string;
    index: number;
};

export class Passo5InclusaoBeneficiario extends React.Component<Props, State>{

    private alert = React.createRef<Alerta>();
    private form = React.createRef<Form>();
    
    constructor(props: Props){
        super(props);
        this.state = {
            grau: (this.props.grau || ""),
            nome: (this.props.nome || ""),
            nascimento: (this.props.nascimento || ""),
            sexo: (this.props.sexo || ""),
            cpf: (this.props.cpf || ""),
            percentual: (this.props.percentual || ""),
            index: this.props.index
        }
    }
    
    incluirBeneficiario = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validarAlt();
        await this.validarCpf();
        
        let currentPercent = parseInt(this.state.percentual.slice(0, -1), 10);

        // Pega lista de beneficiarios já inclusos
        const beneficiarios = JSON.parse(localStorage.getItem("beneficiarios")) || [];
        // Se for uma ação de alteração o this.state.index tem valor
        const indexExists = Number.isInteger(this.state.index);
        const index = (indexExists) ? this.state.index : beneficiarios.length;
        
        for(let p = 0; p < beneficiarios.length; p++){
            // Ignora o percentual que foi alterado
            if(p !== index){
                currentPercent = currentPercent + parseInt(beneficiarios[p].percentual.slice(0, -1), 10);
            }
        }
        if(currentPercent > 100){
            await this.alert.current.adicionarErro("A soma dos percetuais não pode ser maior que 100%");
            this.form.current.setState({ valido: false });
        }
      
        if(this.form.current.state.valido){
            //beneficiarios.push(this.state);
            beneficiarios.splice(index, 1, this.state)
            
            localStorage.setItem("beneficiarios", JSON.stringify(beneficiarios));
            window.location.reload(true);
        }
    }
    
    validarCpf = async () => {
        try {
            await axios.get(`http://10.10.170.11/CuritibaPrevAPI/api/adesao/ValidarCPF/${this.state.cpf}`);
        } catch(err) {
            if(err.response)
                await this.alert.current.adicionarErro(err.response.data);
            else
                await this.alert.current.adicionarErro(err);

            this.form.current.setState({ valido: false });
        }
    }
    
    render(){
      // console.log(this.state);
        return(
            <Box titulo={"Inclusão de Beneficiário"} renderRow={false}>
                <Form ref={this.form}> 
                    <Combo
                        tamanhoLabel={"lg-3"}
                        label={"Grau de Parentesco"}
                        contexto={this}
                        obrigatorio={true}
                        nome={"grau"}
                        valor={this.state.grau}
                        padrao={this.props.padraoGrau}
                        opcoes={this.props.listaGrauParentesco}
                        nomeMembro={"DS_GRAU_PARENTESCO"}
                        valorMembro={"CD_GRAU_PARENTESCO"}
                    />
                
                    <CampoTexto
                        tamanhoLabel={"lg-3"}
                        label={"Nome do Dependente"}
                        tipo={"text"}
                        contexto={this}
                        nome={"nome"}
                        valor={this.state.nome}
                        obrigatorio
                    />
                
                    <CampoTexto
                        tamanhoLabel={"lg-3"}
                        label={"Data de Nascimento"}
                        tipo={"date"}
                        contexto={this}
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
                        padrao={this.props.padraoSexo}
                        opcoes={this.props.listaSexo}
                        nomeMembro={"DS_SEXO"}
                        valorMembro={"IR_SEXO"}
                    />
                
                    <CampoTexto
                        tamanhoLabel={"lg-3"}
                        label={"CPF"}
                        tipo={"text"}
                        contexto={this}
                        nome={"cpf"}
                        mascara={"999.999.999-99"}
                        valor={this.state.cpf}
                        obrigatorio
                    />
                
                    <CampoTexto
                        tamanhoLabel={"lg-3"}
                        label={"Percentual de Rateio"}
                        tipo={"text"}
                        contexto={this}
                        nome={"percentual"}
                        mascara={"99%"}
                        valor={this.state.percentual}
                        obrigatorio
                    />
                  
                    <Alerta ref={this.alert} tipo={TipoAlerta.danger} padraoFormulario />
                  
                    <Botao onClick={this.incluirBeneficiario} titulo={"Confirmar"} block/>
                </Form>
            </Box>
        );
    }
}