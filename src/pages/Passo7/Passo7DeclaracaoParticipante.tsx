import React from "react";
import { CampoTexto } from "@intechprev/componentes-web";

export class Passo7DeclaracaoParticipante extends React.Component{
    declaracao = [
      "Estou ciente de que a opção pelo regime de tributação possui caráter irretratável e errovogável, não havendo possibilidade de alteração.",
      "Estou ciente que para o pagamente do benefício de Pensão por Morte serão observadas as regras previstas no Regulamento do Plano de Benefícios, quanto à definição de Beneficiários.",
      "Autorizo o Patrocinador a efetuar os descontos em folha de pagamento da Contribuição Normal e, quando for o caso, das outras contribuições ue me competem como Participante, no custeio do Plano de Benefícios.",
      "Para fins de direito, responsabilizo-me por todas as informapções declaradas, necessários à minha adessão como Participante do Plano de Benefícios, e compromento-me a informar, de imediato, sempre que ocorrerem alterações em meus dados cadastrais.",
      "Estou ciente de que deverei comunicar imediatamente à CuritibaPrev caso em algum momento venha a me tornar Pessoa Politicamente Exposta."
    ];
    
    mountClaim(){
        let claim = [];
        for(let c = 0; c < this.declaracao.length; c++){
            claim.push(
                <li key={c}>
                    {this.declaracao[c]}
                </li>
            );
        }
        return(
            <ol>
                {claim}
            </ol>
        );
    }
    
    render(){
        return(
            <p className={"mx-4 w-75"}>
                {this.mountClaim()}
            </p>
        );
    }
}