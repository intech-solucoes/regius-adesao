import React from "react";
import axios from "axios";
import { Box, CampoTexto, Combo } from "@intechprev/componentes-web";

import { StatePasso1 } from "../Passo1";
import { StatePasso2 } from "../Passo2";
import { AdesaoEntidade, UFEntidade } from "../../entidades";
import { buscarTitulo } from "../../functions/buscarTitulo";

interface Props {
    dadosPasso1: StatePasso1;
    dadosPasso2: StatePasso2;

    listaUF: Array<UFEntidade>;
}

export interface State {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    ufEndereco: string;
    telefoneFixo: string;
    telefoneCelular: string;
}

export class Endereco extends React.Component<Props, State> {
    state: State = {
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        ufEndereco: "",
        telefoneFixo: "",
        telefoneCelular: "",
    };

    preencherDados(adesao: AdesaoEntidade): AdesaoEntidade {
        adesao.COD_CEP = this.state.cep;
        adesao.DES_END_LOGRADOURO = this.state.logradouro;
        adesao.DES_END_NUMERO = this.state.numero;
        adesao.DES_END_CIDADE = this.state.cidade;
        adesao.DES_END_COMPLEMENTO = this.state.complemento;
        adesao.DES_END_BAIRRO = this.state.bairro;
        adesao.COD_END_UF = this.state.ufEndereco;
        adesao.DES_END_UF = buscarTitulo(
            this.props.listaUF,
            "DS_UNID_FED",
            "CD_UNID_FED",
            this.state.ufEndereco
        );
        adesao.COD_TELEFONE_FIXO = this.state.telefoneFixo;
        adesao.COD_TELEFONE_CELULAR = this.state.telefoneCelular;

        return adesao;
    }

    loadAddress = async () => {
        try {
            const tempCEP = this.state.cep.replace("-", "");
            if (tempCEP.length !== 8) return null;

            var { data: address } = await axios.get(
                `https://viacep.com.br/ws/${tempCEP}/json/`
            );
            await this.setState({
                bairro: address.bairro,
                complemento: address.complemento,
                cidade: address.localidade,
                logradouro: address.logradouro,
                ufEndereco: address.uf,
            });
        } catch (err) {
            await alert("Ocorreu um erro ao buscar o CEP.");
        }
    };

    render() {
        return (
            <Box titulo={"Endereço"} renderRow={false}>
                <CampoTexto
                    tamanhoTitulo={"lg-3"}
                    titulo={"CEP"}
                    tipo={"text"}
                    mascara={"99999-999"}
                    contexto={this}
                    nome={"cep"}
                    valor={this.state.cep}
                    obrigatorio
                    grupo
                    onBotaoClick={this.loadAddress}
                    tituloBotao={"Buscar Endereço"}
                    iconeBotao={"fa-map-marker-alt"}
                    iconeBotaoDireita
                />

                <CampoTexto
                    tamanhoTitulo={"lg-3"}
                    titulo={"Logradouro"}
                    tipo={"text"}
                    contexto={this}
                    nome={"logradouro"}
                    valor={this.state.logradouro}
                    max={100}
                    obrigatorio
                />

                <CampoTexto
                    tamanhoTitulo={"lg-3"}
                    titulo={"Número"}
                    tipo={"text"}
                    contexto={this}
                    nome={"numero"}
                    valor={this.state.numero}
                    max={50}
                    obrigatorio
                />

                <CampoTexto
                    tamanhoTitulo={"lg-3"}
                    titulo={"Complemento"}
                    tipo={"text"}
                    contexto={this}
                    nome={"complemento"}
                    valor={this.state.complemento}
                    max={100}
                />

                <CampoTexto
                    tamanhoTitulo={"lg-3"}
                    titulo={"Bairro"}
                    tipo={"text"}
                    contexto={this}
                    nome={"bairro"}
                    valor={this.state.bairro}
                    max={100}
                    obrigatorio
                />

                <CampoTexto
                    tamanhoTitulo={"lg-3"}
                    titulo={"Cidade"}
                    tipo={"text"}
                    contexto={this}
                    nome={"cidade"}
                    valor={this.state.cidade}
                    max={100}
                    obrigatorio
                />

                <Combo
                    tamanhoLabel={"lg-3"}
                    label={"UF"}
                    contexto={this}
                    obrigatorio={true}
                    nome={"ufEndereco"}
                    valor={this.state.ufEndereco}
                    textoVazio={"Selecione a UF"}
                    opcoes={this.props.listaUF}
                    nomeMembro={"DS_UNID_FED"}
                    valorMembro={"CD_UNID_FED"}
                />

                <CampoTexto
                    tamanhoTitulo={"lg-3"}
                    titulo={"Telefone Fixo"}
                    tipo={"text"}
                    contexto={this}
                    nome={"telefoneFixo"}
                    valor={this.state.telefoneFixo}
                    mascara={"(99)9999-9999"}
                />

                <CampoTexto
                    tamanhoTitulo={"lg-3"}
                    titulo={"Celular"}
                    tipo={"text"}
                    contexto={this}
                    nome={"telefoneCelular"}
                    valor={this.state.telefoneCelular}
                    obrigatorio
                    mascara={"(99)99999-9999"}
                />
            </Box>
        );
    }
}
