import React from "react";
import MasterPage from "../MasterPage";
import { History } from "history";
import { Passo4Artigo } from "./Passo4Artigo";

interface Props{
    history?: History;
};

interface State{};

export default class Passo4 extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {};
    }
    
    render(){
        return(
            <MasterPage {...this.props}>
                <Passo4Artigo {...this.props}/>
            </MasterPage>
        )
    };
}