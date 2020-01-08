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
            <div className={"tab-page"}>
                <div className={"tab-top mb-4"}>
                    <div className={"flex-wrap"}>
                        <img src={this.props.logo} alt="logo" className={"logo"}
                            style={{
                                left: 20,
                                top: 10,
                                width: 100,
                            }}
                        />

                        <h2 className={"text-left p-4 text-center"}>Adesão On-Line</h2>
                    </div>
                </div>

                {this.props.mostrarAbas &&
                    <ul className={"nav nav-tabs"}>
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

                <div className={"p-4"} style={{ marginTop: 40 }}>
                    <div className={"tab-content" + (this.props.mostrarAbas ? " no-border-top" : "")}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}