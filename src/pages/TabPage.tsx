import React, { ReactNode } from "react";
import { History } from 'history';
import { Link } from "react-router-dom";

import { Row, Col, Rota } from "@intechprev/componentes-web";

interface Props {
    logo: string;
    rotas: Array<Rota>;
    history?: History;
    mostrarAbas?: boolean;
}

interface State {

}

export class TabPage extends React.Component<Props, State> {

    render() {
        var abaAtiva = "";
        var rota = this.props.history.location.pathname;

        for (var i = 0; i < this.props.rotas.length; i++) {
            if (rota === this.props.rotas[i].caminho || rota === this.props.rotas[i].caminhoLink || rota.includes(this.props.rotas[i].caminhoLink)) {
                abaAtiva = this.props.rotas[i].id;
            }
        }

        return (
            <div className={"p-5"}>
                <Row className={"mb-5"}>
                    <Col className={"d-flex flex-wrap"}>
                        <img src={this.props.logo} alt="logo" />
                    
                        <h1 className={"text-left mt-4 custom-font"}>Adesão On-Line</h1>
                    </Col>
                </Row>
                
                {this.props.mostrarAbas &&
                    <ul className={"nav nav-tabs"}>
                        <div className={"active-bar"}
                            style={{
                                display: "block", 
                                visibility: "visible",
                                width: "128px;"}}>
                        </div>
                        {
                            this.props.rotas.map((rota, index) => {
                                var ativa = abaAtiva === rota.id ? " active" : "";

                                if (rota.mostrarMenu) {
                                    return (
                                        <li className={"nav-item"} key={index}>
                                            <Link className={"nav-link" + ativa} to={rota.caminho}>
                                                {rota.titulo}
                                            </Link>
                                        </li>
                                    );
                                }
                                else return "";
                            })
                        }
                    </ul>
                }

                <div className={"tab-content" + (this.props.mostrarAbas ? " no-border-top" : "")}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}