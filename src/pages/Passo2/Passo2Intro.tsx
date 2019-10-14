import React from "react";
import { Box } from "@intechprev/componentes-web";

interface Props{
    nome: string;
};

interface State{
    nome: string;
}
export class Passo2Intro extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            nome: this.props.nome
        };
    };
    
    render(){
        return(
            <Box renderRow={false}>
                <p className="h3">
                  Ótimo, <span id={"nomeApi"}>{this.state.nome}</span>!
                </p>
                <p className="h3">
                  Agora precisamos completar os seus dados cadasrais.
                </p>
                <p><small>
                  <span className={"important"}>*</span> - campos obrigatórios!
                </small></p>
            </Box>
        );
    }
}