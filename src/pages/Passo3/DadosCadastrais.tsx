import React from "react";
import moment from "moment";
import { Box, CampoEstatico, Combo, CampoTexto } from "@intechprev/componentes-web";

import { AdesaoService } from "../../services";
import { NacionalidadeEntidade, UFEntidade, EstadoCivilEntidade, AdesaoEntidade } from "../../entidades";

import { StatePasso1 } from "../Passo1";
import { StatePasso2 } from "../Passo2";
import { buscarTitulo } from "../../functions/buscarTitulo";

interface Props {
    dadosPasso1: StatePasso1;
    dadosPasso2: StatePasso2;
    listaSexo: Array<any>;
    listaUF: Array<UFEntidade>;
}

export interface State {
    listaNacionalidade: Array<NacionalidadeEntidade>;
    listaEstadoCivil: Array<EstadoCivilEntidade>;

    nome: string;
    cpf: string;
    nascimento: string;
    sexo: string;
    nacionalidade: string;
    naturalidade: string;
    uf: string;
    rg: string;
    orgao: string;
    emissao: string;
    estadoCivil: string;
    mae: string;
    pai: string;
}

export class DadosCadastrais extends React.Component<Props, State> {
    state: State = {
        listaNacionalidade: [],
        listaEstadoCivil: [],

        nome: "Fulano",
        nascimento: "",
        sexo: "",
        cpf: "000.000.000-00",
        nacionalidade: "",
        naturalidade: "",
        uf: "",
        rg: "",
        orgao: "",
        emissao: "",
        estadoCivil: "",
        mae: "",
        pai: "",
    }

    componentDidMount = async () => {
        var listaNacionalidade = await AdesaoService.BuscarListaNacionalidade();
        var listaEstadoCivil = await AdesaoService.BuscarListaEstadoCivil();

        await this.setState({
            listaNacionalidade,
            listaEstadoCivil
        });
    }

    preencherDados(adesao: AdesaoEntidade): AdesaoEntidade {
        adesao.COD_SEXO = this.state.sexo;
        adesao.DES_SEXO = buscarTitulo(this.props.listaSexo, "Value", "Key", this.state.sexo);
        adesao.COD_NACIONALIDADE = this.state.nacionalidade;
        adesao.DES_NACIONALIDADE = buscarTitulo(this.state.listaNacionalidade, "DS_NACIONALIDADE", "CD_NACIONALIDADE", this.state.nacionalidade);
        adesao.COD_NATURALIDADE = this.state.naturalidade;
        adesao.DES_NATURALIDADE = this.state.naturalidade;
        adesao.COD_UF_NATURALIDADE = this.state.uf;
        adesao.DES_UF_NATURALIDADE = buscarTitulo(this.props.listaUF, "DS_UNID_FED", "CD_UNID_FED", this.state.uf);
        adesao.COD_RG = this.state.rg;
        adesao.DES_ORGAO_EXPEDIDOR = this.state.orgao;
        adesao.DTA_EXPEDICAO_RG = moment(this.state.emissao, "DD/MM/YYYY").toDate();
        adesao.COD_ESTADO_CIVIL = this.state.estadoCivil;
        adesao.DES_ESTADO_CIVIL = buscarTitulo(this.state.listaEstadoCivil, "DS_ESTADO_CIVIL", "CD_ESTADO_CIVIL", this.state.estadoCivil);
        adesao.NOM_MAE = this.state.mae;
        adesao.NOM_PAI = this.state.pai;

        return adesao;
    }

    render() {
        if (this.state.listaEstadoCivil.length > 0) {
            return (
                <Box titulo={"Dados Cadastrais"} renderRow={false}>
                    <CampoEstatico
                        tamanhoTitulo={"lg-3"}
                        titulo={"Nome"}
                        valor={this.props.dadosPasso1.nome}
                        obrigatorio
                    />

                    <CampoEstatico
                        tamanhoTitulo={"lg-3"}
                        titulo={"CPF"}
                        valor={this.props.dadosPasso1.cpf}
                    />

                    <CampoEstatico
                        tamanhoTitulo={"lg-3"}
                        titulo={"Data de Nascimento"}
                        valor={this.props.dadosPasso1.dataNascimento} />

                    <Combo
                        tamanhoLabel={"lg-3"}
                        label={"Sexo"}
                        contexto={this}
                        obrigatorio={true}
                        nome={"sexo"}
                        valor={this.state.sexo}
                        textoVazio={"Selecione o Sexo"}
                        opcoes={this.props.listaSexo}
                        nomeMembro={"Value"}
                        valorMembro={"Key"}
                    />

                    <Combo
                        tamanhoLabel={"lg-3"}
                        label={"Nacionalidade"}
                        contexto={this}
                        obrigatorio={true}
                        nome={"nacionalidade"}
                        valor={this.state.nacionalidade}
                        padrao={this.state.listaNacionalidade[0].CD_NACIONALIDADE}
                        opcoes={this.state.listaNacionalidade}
                        nomeMembro={"DS_NACIONALIDADE"}
                        valorMembro={"CD_NACIONALIDADE"}
                    />

                    <CampoTexto
                        tamanhoLabel={"lg-3"}
                        label={"Local de Nascimento"}
                        tipo={"text"}
                        contexto={this}
                        nome={"naturalidade"}
                        valor={this.state.naturalidade}
                        obrigatorio
                    />

                    <Combo
                        tamanhoLabel={"lg-3"}
                        label={"UF de Nascimento"}
                        contexto={this}
                        obrigatorio={true}
                        nome={"uf"}
                        valor={this.state.uf}
                        textoVazio={"Selecione a UF"}
                        opcoes={this.props.listaUF}
                        nomeMembro={"DS_UNID_FED"}
                        valorMembro={"CD_UNID_FED"}
                    />

                    <CampoTexto
                        tamanhoLabel={"lg-3"}
                        label={"RG"}
                        tipo={"number"}
                        contexto={this}
                        nome={"rg"}
                        valor={this.state.rg}
                    />

                    <CampoTexto
                        tamanhoLabel={"lg-3"}
                        label={"Orgão Expedidor"}
                        tipo={"text"}
                        contexto={this}
                        nome={"orgao"}
                        valor={this.state.orgao}
                    />

                    <CampoTexto
                        tamanhoLabel={"lg-3"}
                        label={"Data de Expedição"}
                        mascara={"99/99/9999"}
                        contexto={this}
                        nome={"emissao"}
                        valor={this.state.emissao}
                    />

                    <Combo
                        tamanhoLabel={"lg-3"}
                        label={"Estado Civil"}
                        contexto={this}
                        obrigatorio={true}
                        nome={"estadoCivil"}
                        valor={this.state.estadoCivil}
                        textoVazio={"Selecione o Estado Civil"}
                        opcoes={this.state.listaEstadoCivil}
                        nomeMembro={"DS_ESTADO_CIVIL"}
                        valorMembro={"CD_ESTADO_CIVIL"}
                    />

                    <CampoTexto
                        tamanhoLabel={"lg-3"}
                        label={"Nome da Mãe"}
                        tipo={"text"}
                        contexto={this}
                        nome={"mae"}
                        valor={this.state.mae}
                        obrigatorio
                    />

                    <CampoTexto
                        tamanhoLabel={"lg-3"}
                        label={"Nome do Pai"}
                        tipo={"text"}
                        contexto={this}
                        nome={"pai"}
                        valor={this.state.pai}
                    />
                </Box>
            );
        }

        return null;
    }
}