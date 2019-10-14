import React from "react";
import { Box, CampoEstatico, CampoTexto, Combo } from "@intechprev/componentes-web";

interface Props{
    patrocinadora: string;
    matricula: string;
    listaPatrocinadora: any;
    listaCargo: any;
    switchToShowcase: any;
};

interface State{
    patrocinadora: string;
    matricula: string;
    admissao: string;
    cargo: string;
};

export class Passo2DadosFuncionais extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        // console.log(this.props);
        this.state = {
            patrocinadora: this.props.patrocinadora,
            matricula: this.props.matricula,
            admissao: "",
            cargo: ""
        };
    }
    
    render(){
        return(
            <Box titulo={"Dados Funcionais"} renderRow={false}>
                <CampoEstatico
                    tamanhoTitulo={"lg-3"}
                    titulo={"Patrocinador"}
                    valor={this.props.switchToShowcase(this.props.listaPatrocinadora, this.state.patrocinadora, "CD_PESSOA_PATR", "NO_PESSOA")}
                    obrigatorio
                />
                
                <CampoEstatico
                    tamanhoTitulo={"lg-3"}
                    titulo={"Matrícula Funcional"}
                    valor={this.state.matricula}
                    obrigatorio
                />
                
                <CampoTexto
                    tamanhoLabel={"lg-3"}
                    label={"Data de Admissão"}
                    tipo={"date"}
                    contexto={this}
                    nome={"admissao"}
                    valor={this.state.admissao}
                    obrigatorio
                />
                
                <Combo tamanhoLabel={"lg-3"} label={"Cargo"} contexto={this} obrigatorio={false}
                    nome={"cargo"} valor={this.state.cargo} padrao={this.state.cargo}
                    opcoes={this.props.listaCargo} nomeMembro={"name"} valorMembro={"value"}
                />
            </Box>
        );
    };
}