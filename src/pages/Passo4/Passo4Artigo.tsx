import React from "react";
import { Botao, Box } from "@intechprev/componentes-web";
import { History } from "history";

const artigo: any = {
  texto: "Artigo 6º - São Beneficiários as pessoas livremente designados pelo Participante ou Assistido inscrito no Plano de Benefícios, nos termos do Regulamento, para fins de recebimento de benefícios.",
  p1: "§1º O Participante deverá designar seus Beneficiários até o prazo de 90 (noventa) dias da sua inscrição, mediante o preenchimento de formulário próprio fornecido pela Entidade.",
  p2: "§2° No caso de haver designação de mais de um Beneficiário, o Participante ou o Assistido deverá informar, porescrito, o percentual do saldo da Conta de Benefícios que caberá a cada um deles no rateio.",
  p3: "§3° Não havendo indicação da proporcionalidade do rateio, este será feito em partes iguais aos Beneficiários designados.",
  p4: "§4º O Participante ou o Assistido poderá, a qualquer tempo, alterar a relação de Beneficiários e o percentual do saldo da Conta de Benefícios, mediante comunicação formal através formulário próprio."
};

interface Props{
    history?: History;
};

export class Passo4Artigo extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }
    
    renderArtigo(){
        const paragrafos: any = [];
        const keys: Array<string> = Object.keys(artigo);
        for(let i = 0; i < keys.length; i++){
            paragrafos.push(
                <p key={i}>
                    {artigo[keys[i]]}
                </p>
            );
        }
        return(
          <div>
            {paragrafos}
          </div>
        );
    }
    
    paginaDeInclusao = async () => {
        this.props.history.push("/passo5");
    }
    
    pularInclusao = async () => {
        this.props.history.push("/passo6");
    }
    
    voltar = async () => {
        this.props.history.push("/passo3");
    }
    
    render(){
        return(
            <Box titulo={"Agora precisamos conhecer seus beneficiários designados"} renderRow={false}>
                {this.renderArtigo()}
                <Botao onClick={this.paginaDeInclusao} titulo={"Incluir Beneficiário"} block/>
                <Botao onClick={this.pularInclusao} titulo={"Não tenho ou não quero informar agora"} block/>
                <Botao onClick={this.voltar} titulo={"Voltar"} icone={"fa-angle-double-left"} block/>
            </Box>
        );
    }
}