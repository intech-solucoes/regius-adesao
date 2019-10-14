import React from "react";
import { Box, CampoEstatico } from "@intechprev/componentes-web";

interface Props{
    parcela1: string;
    parcela2: string;
    regime: string;
};

interface State{
    parcela1: string;
    parcela2: string;
    regime: string;
};

export class Passo7DefinicaoRenumeracao extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            parcela1: this.props.parcela1,
            parcela2: this.props.parcela2,
            regime: this.props.regime
        };
    };
    
    render(){
        return(
            <Box titulo={"Definição da Contribuição"}>
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Valor percentual da parcela 1"} valor={this.state.parcela1}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Valor percentual da parcela 2"} valor={this.state.parcela2}/>
                
                <CampoEstatico tamanhoTitulo={"lg-3"} titulo={"Opção do regime de tributação"} valor={this.state.regime}/>
            </Box>
        );
    }
}