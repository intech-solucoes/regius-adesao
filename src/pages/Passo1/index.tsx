import React from "react";
import axios from "axios";
import MasterPage from "../MasterPage";
import { History } from "history";
import { Passo1IdentificacaoPessoal } from "./Passo1IdentificacaoPessoal";

interface Props {
    history?: History;
};

interface State {
    // dominios: any;
    listaBanco: any;
    listaCargo: any;
    listaEstadoCivil: any;
    listaGrauParentesco: any;
    listaNacionalidade: any;
    listaPatrocinadora: any;
    listaRegime: any;
    listaSexo: any;
    listaUF: any;
}

export default class Passo1 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            // dominios: JSON.parse(localStorage.getItem("dominios")) || [],
            listaBanco: [],
            listaCargo: [],
            listaEstadoCivil: [],
            listaGrauParentesco: [],
            listaNacionalidade: [],
            listaPatrocinadora: [],
            listaRegime: [],
            listaSexo: [],
            listaUF: []
        };
    }

    rotas = {
        listaBanco: "http://10.10.170.11/CuritibaPrevAPI/api/adesao/BuscarListaBanco",
        listaCargo: "http://10.10.170.11/CuritibaPrevAPI/api/adesao/BuscarListaCargo",
        listaEstadoCivil: "http://10.10.170.11/CuritibaPrevAPI/api/adesao/BuscarListaEstadoCivil",
        listaGrauParentesco: "http://10.10.170.11/CuritibaPrevAPI/api/adesao/BuscarListaGrauParentesco",
        listaNacionalidade: "http://10.10.170.11/CuritibaPrevAPI/api/adesao/BuscarListaNacionalidade",
        listaPatrocinadora: "http://10.10.170.11/CuritibaPrevAPI/api/adesao/BuscarListaPatrocinadora",
        listaRegime: "http://10.10.170.11/CuritibaPrevAPI/api/adesao/BuscarListaOpcaoTributacao",
        listaSexo: "http://10.10.170.11/CuritibaPrevAPI/api/adesao/BuscarListaSexo",
        listaUf: "http://10.10.170.11/CuritibaPrevAPI/api/adesao/BuscarListaUF"
    }

    stateNames = Object.keys(this.rotas);

    /* THIS ONE IS HARDCODED */
    // defaultValues = {
    // patrocinadora: "1"
    // };

    componentDidMount() {
        axios.all([
            axios.get(this.rotas.listaBanco),
            axios.get(this.rotas.listaCargo),
            axios.get(this.rotas.listaEstadoCivil),
            axios.get(this.rotas.listaGrauParentesco),
            axios.get(this.rotas.listaNacionalidade),
            axios.get(this.rotas.listaPatrocinadora),
            axios.get(this.rotas.listaRegime),
            axios.get(this.rotas.listaSexo),
            axios.get(this.rotas.listaUf)
        ])
        .then(axios.spread((...args) => {
            let tempState: any = {};
            for (let i = 0; i < args.length; i++) {
                tempState[this.stateNames[i]] = args[i].data;
            }
            localStorage.setItem("dominios", JSON.stringify(tempState));
            this.setState(tempState);
        }));
    }

    render() {
        return (
            <MasterPage {...this.props}>
                <Passo1IdentificacaoPessoal
                    listaPatrocinadora={(this.state.listaPatrocinadora)}
                    {...this.props}
                />
            </MasterPage>
        );
    }
}