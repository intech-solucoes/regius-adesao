import React from "react";
import { Box, Botao, Tabela, ColunaTabela } from "@intechprev/componentes-web";

import { StatePasso2 } from "../Passo2";
import { StatePasso1 } from "../Passo1";
import { AdesaoDocumentoEntidade } from "../../entidades";
import { AdesaoService } from "../../services";
import { DocumentosModalUpload } from "./DocumentosModalUpload";

interface Props {
    dadosPasso1: StatePasso1;
    dadosPasso2: StatePasso2;
}

export interface State {
    modalVisivel: boolean;
    listaArquivos: Array<AdesaoDocumentoEntidade>;
}

export class Documentos extends React.Component<Props, State> {
    state: State = {
        modalVisivel: false,
        listaArquivos: []
    }

    preencherDados(): Array<AdesaoDocumentoEntidade> {
        return this.state.listaArquivos;
    }

    toggleModal = () => {
        this.setState({
            modalVisivel: !this.state.modalVisivel
        });
    }

    salvarArquivo = async(documento: AdesaoDocumentoEntidade) => {
        await this.setState({
            listaArquivos: [...this.state.listaArquivos, documento]
        })
        
        this.toggleModal();
    }

    excluirArquivo = async (arquivo) => {
        await AdesaoService.ExcluirArquivo(arquivo.OID_ADESAO_DOCUMENTO);

        var lista = this.state.listaArquivos;
        lista = lista.filter(arq => arq !== arquivo);

        this.setState({
            listaArquivos: lista
        });
    }

    render() {
        return (
            <Box titulo={"Documentos"} renderRow={false}>
                <p>
                    Envie aqui um documento oficial com foto! Verifique se a imagem não está fora de foco, distorcida, entre outros detalhes como textos, fotos, etc.
                </p>

                <Botao titulo={"Incluir Arquivo"}
                    className={"mb-4"}
                    icone={"fa-plus"}
                    onClick={this.toggleModal}
                />

                <DocumentosModalUpload
                    parent={this}
                    modalVisivel={this.state.modalVisivel}
                    toggleModal={this.toggleModal}
                />

                <Tabela titulo={"Arquivos Inseridos"} dados={this.state.listaArquivos} paginacaoHabilitada={false} edicaoHabilitada={false}
                    exclusaoHabilitada
                    onExcluir={this.excluirArquivo}
                >
                    <ColunaTabela titulo={"Nome"} propriedadeValor={"TXT_TITULO"} />
                </Tabela>
            </Box>
        );
    }
}