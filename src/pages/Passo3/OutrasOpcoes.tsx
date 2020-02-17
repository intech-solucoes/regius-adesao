import React from "react";
import { Box, Combo } from "@intechprev/componentes-web";

import { StatePasso2 } from "../Passo2";
import { StatePasso1 } from "../Passo1";
import { AdesaoEntidade, AdesaoPlanoEntidade } from "../../entidades";

interface Props {
    dadosPasso1: StatePasso1;
    dadosPasso2: StatePasso2;
}

export interface State {
    regimeImposto: string;
    politicamenteExposta: string;
    familiaPoliticamenteExposta: string;
    usperson: string;
}

const opcoesRegimeImposto = [
    {
        name: "Não opto pelo regime regressivo estabelecido na Lei 11.053/2004",
        value: "NAO"
    },
    {
        name: "Opto pelo regime regressivo estabelecido na Lei 11.053/2004",
        value: "SIM"
    }
];


const opcoesSimNao = [
    {
        name: "Não",
        value: "NAO"
    },
    {
        name: "Sim",
        value: "SIM"
    }
];

export class OutrasOpcoes extends React.Component<Props, State> {
    state: State = {
        regimeImposto: null,
        politicamenteExposta: "false",
        familiaPoliticamenteExposta: "false",
        usperson: "false",
    }
    
    preencherDados(adesao: AdesaoEntidade): AdesaoEntidade {
        adesao.IND_PPE = this.state.politicamenteExposta;
        adesao.IND_PPE_FAMILIAR = this.state.familiaPoliticamenteExposta;
        adesao.IND_FATCA = this.state.usperson;

        adesao.Plano = new AdesaoPlanoEntidade();
        adesao.Plano.COD_PLANO = this.props.dadosPasso2.cdPlano;
        adesao.Plano.DES_PLANO = this.props.dadosPasso2.nomePlano;
        adesao.Plano.IND_REGIME_TRIBUTACAO = this.state.regimeImposto === "SIM" ? "2" : "1";

        return adesao;
    }

    render() {
        return (
            <>
                <Box titulo={"Termo de Opção do Imposto de Renda"} renderRow={false}>
                    <p>
                        Opção, em caráter irretratável, pelo regime de tributação previsto na Lei nº 11.053, de 29 de dezembro de 2004 (TABELA REGRESSIVA).
                        Está disponível na internet, no endereço [www.regius.org.br], opção Plano {this.props.dadosPasso2.nomePlano} / Sobre o Plano, material explicativo com orientações sobre
                        as tabelas regressiva e progressiva do Imposto de Renda.
                    </p>

                    <Combo
                        tamanhoLabel={"5"}
                        contexto={this}
                        nome={"regimeImposto"}
                        valor={this.state.regimeImposto}
                        label={"Termo de Opção do Imposto de Renda"}
                        textoVazio={"Selecione uma opção..."}
                        opcoes={opcoesRegimeImposto}
                        nomeMembro={"name"}
                        valorMembro={"value"}
                        obrigatorio
                        labelOculta
                    />
                </Box>

                <Box titulo={"Exigência Instrução Normativa PREVIC Nº 18/2014"} renderRow={false}>
                    <p>
                        São consideradas pessoas politicamente expostas aquelas que detém mandatos eletivos,
                        ocupantes de cargos do Poder Executivo da União, Membros do Conselho Nacional de
                        Justiça/STF e dos Tribunais Superiores, dentre outros.
                    </p>

                    <p>
                        Você se considera enquadrado como PESSOA POLITICAMENTE EXPOSTA* (IN PREVIC 18/2014)?
                    </p>

                    <Combo
                        tamanhoLabel={"5"}
                        contexto={this}
                        nome={"politicamenteExposta"}
                        label={"PESSOA POLITICAMENTE EXPOSTA"}
                        valor={this.state.politicamenteExposta}
                        textoVazio={"Selecione uma opção..."}
                        opcoes={opcoesSimNao}
                        nomeMembro={"name"}
                        valorMembro={"value"}
                        obrigatorio
                        labelOculta
                    />

                    <p>
                        Possui familiares (pais, filhos, cônjuge, companheiro (a) ou enteado (a)) que possam estar enquadrados como PESSOA POLITICAMENTE EXPOSTA na mesma situação?
                    </p>

                    <Combo
                        tamanhoLabel={"5"}
                        contexto={this}
                        nome={"familiaPoliticamenteExposta"}
                        label={"Familiares Politicamente Expostos"}
                        valor={this.state.familiaPoliticamenteExposta}
                        textoVazio={"Selecione uma opção..."}
                        opcoes={opcoesSimNao}
                        nomeMembro={"name"}
                        valorMembro={"value"}
                        obrigatorio
                        labelOculta
                    />
                </Box>

                <Box titulo={"Instrução Normativa RFB Nº 1.571"} renderRow={false}>
                    <p>
                        O FATCA é uma lei que determina que as Instituições Financeiras Estrangeiras (FFIS) devem identificar em sua base de clientes as “US Persons”,
                        de forma a garantir o repasse de informações anuais de operações de contas mantidas
                        por cidadãos americanos para a receita federal dos Estados Unidos, nos termos do acordo para troca de informações, assinado pelo Brasil
                        com a receita federal americana.
                    </p>

                    <p>
                        Serão considerados US Persons os participantes que possuam pelo menos 1(uma) das seguintes características:<br />
                        01) Cidadania norte-americana, incluindo os detentores de dupla nacionalidade e passaporte norte-americano, ainda que residam fora dos dos Estados Unidos;<br />
                        02) Detentores de Green Card;<br />
                        03) Local de nascimento nos Estados Unidos; <br />
                        04) Residência permanente nos
                            Estados Unidos ou presença substancial (se ficou nos Estados Unidos pelo menos 31(trinta e um) dias no ano
                                    corrente e/ou 183 (cento e oitenta e três) dias nos últimos 3(três) anos;<br />
                        05) Outras características que possam ser indicadas na regulamentação a ser publicada pela RFB.
                    </p>

                    <p>
                        Você se considera, para os devidos fins de direito sob as penas da lei, como US PERSON?
                    </p>

                    <Combo
                        tamanhoLabel={"5"}
                        contexto={this}
                        nome={"usperson"}
                        label={"US PERSON"}
                        valor={this.state.usperson}
                        textoVazio={"Selecione uma opção..."}
                        opcoes={opcoesSimNao}
                        nomeMembro={"name"}
                        valorMembro={"value"}
                        obrigatorio
                        labelOculta
                    />
                </Box>
            </>
        );
    }
}