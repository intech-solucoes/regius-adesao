import React from "react";
import { History } from 'history';
import { TabPage } from "./TabPage";

import Rotas from "../Rotas";

interface Props {
    history?: History;
}

interface State {
    
}

export default class MasterPage extends React.Component<Props, State> {
    render() {
        return (
            <TabPage 
                logo={"images/logo.png"}
                rotas={Rotas} 
                history={this.props.history} 
                mostrarAbas={false}
                {...this.props}>
                    
            </TabPage>
        );
    }
}