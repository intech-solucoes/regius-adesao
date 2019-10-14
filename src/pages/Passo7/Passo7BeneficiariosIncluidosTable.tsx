import React from "react";
import { Botao, Box } from "@intechprev/componentes-web";
import { Passo7BeneficiariosIncluidosHead } from "./../Passo5/Passo7BeneficiariosIncluidosHead";
import { Passo7BeneficiariosIncluidosBody } from "./Passo7BeneficiariosIncluidosBody";
import { Passo5NenhumBeneficiario } from "./../Passo5/Passo5NenhumBeneficiario";

interface Props{};

interface State{
    beneficiario_incluido: any;
    dominios: any;
};

export class Passo7BeneficiariosIncluidosTable extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            beneficiario_incluido: (JSON.parse(localStorage.getItem("beneficiarios")) || []),
            dominios: JSON.parse(localStorage.getItem("dominios"))
        };
    }
    
    switchToShowcase(dmn: any, target: any){
        for(let d = 0; d < dmn.length; d++){
            if(String(dmn[d].CD_GRAU_PARENTESCO) === String(target)){
                return dmn[d].DS_GRAU_PARENTESCO;
            }
        }
        return null;
    }
    
    renderBeneficiariosIncluidos(beneficiario: any){
        if(beneficiario.length > 0){
            const table_itens = [];
            for(let i = 0; i < beneficiario.length; i++){
                table_itens.push(
                    <Passo7BeneficiariosIncluidosBody
                        key={i}
                        nome={beneficiario[i].nome}
                        grau={this.switchToShowcase(this.state.dominios.listaGrauParentesco, beneficiario[i].grau)}
                        nascimento={beneficiario[i].nascimento}
                        percentual={beneficiario[i].percentual}
                    
                    />
                );
            }
            return(
                <table className={"table table-striped table-bordered table-hover table-responsive-md"}>
                    <caption>Beneficiários Incluídos</caption>
                    <Passo7BeneficiariosIncluidosHead/>
                    <tbody>
                        {table_itens}
                    </tbody>
                </table>
            );
        }
        else{
            return <Passo5NenhumBeneficiario/>;
        }
    }
    
    render(){
        return(
            <Box>
                {this.renderBeneficiariosIncluidos(this.state.beneficiario_incluido)}
            </Box>
        );
    };
}