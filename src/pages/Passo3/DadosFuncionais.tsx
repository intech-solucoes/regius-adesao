import React from "react";
import { Box, CampoEstatico, CampoTexto } from "@intechprev/componentes-web";
import moment from "moment";

import { StatePasso1 } from "../Passo1";
import { StatePasso2 } from "../Passo2";
import { AdesaoEntidade } from "../../entidades";
import { Passo3 } from "..";

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

        var patrocinadora = this.props.dadosPasso1.empresas.filter((a) => a.CD_EMPRESA == this.props.dadosPasso1.patrocinadora)[0];

        var admissao = "";
        if(this.props.dadosPasso1.funcionario.DT_ADMISSAO)
            admissao = moment(this.props.dadosPasso1.funcionario.DT_ADMISSAO, "DD/MM/YYYY").format("DD/MM/YYYY");

        this.state = {
            patrocinadora: patrocinadora.NOME_ENTID,
            matricula: this.props.dadosPasso1.matricula,
            admissao,
            email: this.props.dadosPasso1.email,
            exigeJoia: false
        }
    }

    componentDidMount = async() => {
        await this.compararDatas();
    }

    preencherDados(adesao: AdesaoEntidade): AdesaoEntidade {
        adesao.DTA_ADMISSAO = moment(this.state.admissao, "DD/MM/YYYY").toDate();

        return adesao;
    }

    compararDatas = async() => {
        var admissao = moment(this.state.admissao, "DD/MM/YYYY");
        var diferenca = moment().diff(admissao, 'days');
        
        await this.props.parent.setState({
            exigeJoia: diferenca >= 30 && this.props.dadosPasso2.cdPlano === "0003"
        });
    }

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
                    tamanhoLabel={"lg-3"}
                    label={"Data de Admissão"}
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