import React from "react";
import { Box, CampoTexto, CampoEstatico } from "@intechprev/componentes-web";

interface Props{
    patrocinadora: string;
    matricula: string;
    admissao: string;
    listaPatrocinadora: any;
    switchToShowcase: any;
};

interface State{
    patrocinadora: string;
    matricula: string;
    admissao: string;
};

export class Passo7DadosFuncionais extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            patrocinadora: this.props.patrocinadora,
            matricula: this.props.matricula,
            admissao: this.props.admissao
        };
    }
    
    render(){
        return(
            <Box titulo={"Dados Funcionais"}>
                <CampoEstatico
                  tamanhoTitulo={"lg-3"}
                  titulo={"Empresa Patrocinadora"}
                  valor={this.props.switchToShowcase(this.props.listaPatrocinadora, this.state.patrocinadora, "CD_PESSOA_PATR", "NO_PESSOA")}
                />
                
                <CampoEstatico
                  tamanhoTitulo={"lg-3"}
                  titulo={"Matrícula Funcional"}
                  valor={this.props.matricula}
                />
                
                <CampoEstatico
                  tamanhoTitulo={"lg-3"}
                  titulo={"Data de Admissão"}
                  valor={this.props.admissao}
                />
            </Box>
        );
    };
}