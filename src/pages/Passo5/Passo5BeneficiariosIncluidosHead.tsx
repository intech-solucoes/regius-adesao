import React from "react";
import { Botao } from "@intechprev/componentes-web";

export class Passo5BeneficiariosIncluidosHead extends React.Component{
    render(){
        return(
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Grau Parentesco</th>
                    <th>Nascimento</th>
                    <th>Percentual</th>
                    <th>Ações</th>
                </tr>
            </thead>
        );
    };
}