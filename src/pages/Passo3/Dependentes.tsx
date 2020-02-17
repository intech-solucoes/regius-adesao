import React from "react";
import moment from "moment";
import { Box, Botao, Tabela, ColunaTabela } from "@intechprev/componentes-web";

import { StatePasso2 } from "../Passo2";
import { StatePasso1 } from "../Passo1";
import { DependentesModalIncluir, StateDependente } from "./DependentesModalIncluir";
import { AdesaoDependenteEntidade } from "../../entidades";
import { buscarTitulo } from "../../functions/buscarTitulo";

interface Props {
    dadosPasso1: StatePasso1;
    dadosPasso2: StatePasso2;
    listaSexo: Array<any>;
}

export interface State {
    modalVisivel: any;
    listaDependentes: Array<any>;
}

export class Dependentes extends React.Component<Props, State> {
    state: State = {
        modalVisivel: false,
        listaDependentes: []
    }

    preencherDados(): Array<AdesaoDependenteEntidade> {
        var dependentes = new Array<AdesaoDependenteEntidade>();

        this.state.listaDependentes.forEach((dep: StateDependente) => {
            var dependente = new AdesaoDependenteEntidade();

            dependente.COD_CPF = dep.cpf;
            dependente.NOM_DEPENDENTE = dep.nome;
            dependente.COD_GRAU_PARENTESCO = dep.grauParentesco;
            dependente.COD_PERC_RATEIO = parseInt(dep.percentual);
            dependente.COD_SEXO = dep.sexo;
            dependente.DES_GRAU_PARENTESCO = buscarTitulo(dep.listaGrauParentesco, "DS_GRAU_PARENTESCO", "CD_GRAU_PARENTESCO", dep.grauParentesco);
            dependente.DES_SEXO = buscarTitulo(this.props.listaSexo, "Value", "Key", dep.sexo);
            dependente.DTA_NASCIMENTO = moment(dep.dataNascimento, "DD/MM/YYYY").toDate();
            dependente.IND_PENSAO = "SIM";

            dependentes.push(dependente);
        });

        return dependentes;
    }

    adicionarDependente = async (dependente: any) => {
        var cpfsExistentes = this.state.listaDependentes.filter(x => x.cpf === dependente.cpf);

        if (cpfsExistentes.length > 0) {
            alert("Já existe um dependente com esse CPF incluído.");
        }
        else {
            var lista = this.state.listaDependentes;
            lista.push(dependente);

            this.setState({
                listaDependentes: lista,
                modalVisivel: false
            });
        }
    }

    toggleModal = () => {
        this.setState({
            modalVisivel: !this.state.modalVisivel
        });
    }

    excluirDependente = (dependente: any) => {
        var lista = this.state.listaDependentes;
        lista = lista.filter(dep => dep !== dependente);

        this.setState({
            listaDependentes: lista
        });
    }

    render() {
        return (
            <Box titulo={"Dependentes/Beneficiários"} renderRow={false}>

                <DependentesModalIncluir
                    parent={this}
                    modalVisivel={this.state.modalVisivel}
                    toggleModal={this.toggleModal}
                    listaSexo={this.props.listaSexo}
                />
                
                <Botao titulo={"Incluir Dependente"} className={"mb-4"} icone={"fa-plus"} onClick={this.toggleModal} />

                <Tabela titulo={"Dependentes inseridos"}
                    dados={this.state.listaDependentes}
                    paginacaoHabilitada={false}
                    edicaoHabilitada={false}
                    exclusaoHabilitada
                    onExcluir={this.excluirDependente}
                >
                    <ColunaTabela titulo={"Nome"} propriedadeValor={"nome"} />
                    <ColunaTabela titulo={"CPF"} propriedadeValor={"cpf"} />

                    {this.props.dadosPasso2.cdPlano !== "0003" &&
                        <ColunaTabela titulo={"Percentual Pecúlio"} propriedadeValor={"percentual"} sufixo={"%"} />
                    }
                </Tabela>

            </Box>
        );
    }
}