import React from "react";
import { Box, CampoEstatico, CampoTexto } from "@intechprev/componentes-web";
import moment from "moment";

import { StatePasso1 } from "../Passo1";
import { StatePasso2 } from "../Passo2";
import { AdesaoEntidade } from "../../entidades";
import { Passo3 } from "..";
import { AdesaoService } from "../../services";

interface Props {
    dadosPasso1: StatePasso1;
    dadosPasso2: StatePasso2;
    parent: Passo3;
}

export interface State {
    patrocinadora: string;
    matricula: string;
    admissao: string;
    email: string;

    exigeJoia: boolean;
}

export class DadosFuncionais extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        var admissao = "";
        if (this.props.dadosPasso1.funcionario.DT_ADMISSAO)
            admissao = moment(
                this.props.dadosPasso1.funcionario.DT_ADMISSAO,
                "DD/MM/YYYY"
            ).format("DD/MM/YYYY");

        this.state = {
            patrocinadora: "",
            matricula: this.props.dadosPasso1.funcionario.NUM_MATRICULA,
            admissao,
            email: this.props.dadosPasso1.email,
            exigeJoia: false,
        };
    }

    componentDidMount = async () => {
        var empresas = await AdesaoService.BuscarEmpresas();
        var patrocinadora = empresas.filter(
            (a) => a.CD_EMPRESA == this.props.dadosPasso1.funcionario.CD_EMPRESA
        )[0];

        await this.setState({
            patrocinadora: patrocinadora.NOME_ENTID,
        });
        await this.compararDatas();
    };

    preencherDados(adesao: AdesaoEntidade): AdesaoEntidade {
        adesao.DTA_ADMISSAO = moment(
            this.state.admissao,
            "DD/MM/YYYY"
        ).toDate();
        adesao.DES_EMPRESA = this.state.patrocinadora;

        return adesao;
    }

    compararDatas = async () => {
        var admissao = moment(this.state.admissao, "DD/MM/YYYY");
        var diferenca = moment().diff(admissao, "days");

        await this.props.parent.setState({
            exigeJoia:
                diferenca >= 30 && this.props.dadosPasso2.cdPlano === "0003",
        });
    };

    render() {
        return (
            <Box titulo={"Dados Funcionais"} renderRow={false}>
                <CampoEstatico
                    tamanhoTitulo={"lg-3"}
                    titulo={"Patrocinador"}
                    valor={this.state.patrocinadora}
                />

                <CampoEstatico
                    tamanhoTitulo={"lg-3"}
                    titulo={"Matrícula Funcional"}
                    valor={this.state.matricula}
                />

                <CampoTexto
                    contexto={this}
                    tamanhoTitulo={"lg-3"}
                    titulo={"Data de Admissão"}
                    mascara={"99/99/9999"}
                    nome={"admissao"}
                    valor={this.state.admissao}
                    onBlur={this.compararDatas}
                    obrigatorio
                />

                <CampoEstatico
                    tamanhoTitulo={"lg-3"}
                    titulo={"E-mail"}
                    valor={this.props.dadosPasso1.email}
                />
            </Box>
        );
    }
}
