import React from "react";
import { Box, Row, Col, Combo, CampoEstatico } from "@intechprev/componentes-web";

import { StatePasso1 } from "../Passo1";
import { StatePasso2 } from "../Passo2";
import { AdesaoEntidade, LimiteContribuicaoEntidade, AdesaoContribEntidade } from "../../entidades";
import { AdesaoService } from "../../services";

interface Props {
    dadosPasso1: StatePasso1;
    dadosPasso2: StatePasso2;
}

export interface State {
    termoAceito: boolean;
    percentual: string;
    percentualPatrocinadora: string;
    limitePercentualPatrocinadora: LimiteContribuicaoEntidade;
    listaPercentuais: Array<number>;
}

export class TermoAdesao extends React.Component<Props, State> {
    state: State = {
        termoAceito: false,
        percentual: "",
        percentualPatrocinadora: "",
        limitePercentualPatrocinadora: new LimiteContribuicaoEntidade(),
        listaPercentuais: []
    }

    componentDidMount = async () => {
        var limitePercentualPatrocinadora = await AdesaoService.BuscarLimitePatrocinadora(this.props.dadosPasso2.cdPlano);
        var listaPercentuais = await AdesaoService.BuscarPercentuais(this.props.dadosPasso2.cdPlano);

        await this.setState({
            limitePercentualPatrocinadora,
            percentualPatrocinadora: limitePercentualPatrocinadora.VAL_PERC_MINIMO_PATROC + "%",
            listaPercentuais
        });
    }

    preencherDados(): AdesaoContribEntidade {
        var contrib = new AdesaoContribEntidade();

        contrib.COD_CONTRIBUICAO = "01";
        contrib.DES_CONTRIBUICAO = "CONTRIBUIÇÃO PARTICIPANTE";
        contrib.VAL_CONTRIBUICAO = parseInt(this.state.percentual);
        contrib.IND_VALOR_PERC = "PER";

        return contrib;
    }

    alterarPercentualPatrocinadora = async () => {
        var percentualPatrocinadora = parseInt(this.state.percentual);

        if (percentualPatrocinadora > this.state.limitePercentualPatrocinadora.VAL_PERC_MAXIMO_PATROC)
            percentualPatrocinadora = this.state.limitePercentualPatrocinadora.VAL_PERC_MAXIMO_PATROC;

        await this.setState({
            percentualPatrocinadora: percentualPatrocinadora + "%"
        });
    }

    render() {
        return (
            <Box titulo={"Termo de Adesão"} renderRow={false}>
                <Row>
                    <Col tamanho={"1"} className={"text-right"}>
                        <input type={"checkbox"} checked={this.state.termoAceito} onChange={() => this.setState({ termoAceito: !this.state.termoAceito })} />
                    </Col>
                    <Col>
                        <p>
                            Afirmo o meu interesse em participar do Plano de Benefícios CV-03, administrado pela REGIUS,
                            e formar uma Reserva de Poupança Individual. Assim sendo, autorizo a referida Patrocinadora,
                            uma vez que o presente pedido for aprovado, a descontar em folha de pagamento ou a debitar
                            em minha conta corrente as contribuições e demais despesas inerentes
                            ao Plano de Benefícios {this.props.dadosPasso2.nomePlano}. Para tanto estabeleço o percentual da
                            contribuição pessoal escolhido abaixo.
                        </p>
                    </Col>
                </Row>

                <Combo
                    tamanhoLabel={"lg-3"}
                    label={"Percentual de Contribuição Pessoal"}
                    textoVazio={"Selecione o percentual..."}
                    contexto={this}
                    nome={"percentual"}
                    valor={this.state.percentual}
                    opcoes={this.state.listaPercentuais}
                    onChange={this.alterarPercentualPatrocinadora}
                    nomeMembro={"Key"}
                    valorMembro={"Value"}
                    obrigatorio
                />

                <CampoEstatico
                    tamanhoTitulo={"lg-3"}
                    titulo={`Percentual da Patrocinadora (Limitado a ${this.state.limitePercentualPatrocinadora.VAL_PERC_MAXIMO_PATROC}%)`}
                    valor={this.state.percentualPatrocinadora}
                />

            </Box>
        )
    }
}