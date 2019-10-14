import React from "react";
import MasterPage from "../MasterPage";
import { History } from "history";
import { FormPasso6 } from "./FormPasso6";
import { SaibaMaisPessoaPoliticamenteExposta } from "./SaibaMaisPessoaPoliticamenteExposta";
import { SaibaMaisPessoaUSPerson } from "./SaibaMaisPessoaUSPerson";

interface Props{
    history?: History;
};

interface State{
    modal1_status: boolean;
    modal2_status: boolean;};

export default class Passo6Page extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            modal1_status: false,
            modal2_status: false,
        };
    }
    
    toggleModal1 = () => {
        this.setState({
            modal1_status: !this.state.modal1_status
        });
    }
    
    toggleModal2 = () => {
        this.setState({
            modal2_status: !this.state.modal2_status
        });
    }
    
    render(){
        return(
            <MasterPage {...this.props}>
                <FormPasso6
                    toggleModal1={this.toggleModal1}
                    toggleModal2={this.toggleModal2}
                    {...this.props}
                />
                
                <div className={"flexed-column"}>
                    <SaibaMaisPessoaPoliticamenteExposta
                    modal_status={this.state.modal1_status}
                    toggleModal={this.toggleModal1}
                />
                    <SaibaMaisPessoaUSPerson
                    modal_status={this.state.modal2_status}
                    toggleModal={this.toggleModal2}
                />
                </div>
            </MasterPage>
        );
    }
}
