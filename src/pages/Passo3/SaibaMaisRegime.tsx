import React from "react";
import { Modal } from "@intechprev/componentes-web";

interface Props{
    modal_status: boolean
    toggleModal: any;
}

interface State{}

export class SaibaMaisRegime extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {}
    }
    
    renderRowsRegressivo(
      amountOfRows: number,
      basePercent: number,
      percentSkip: number,
      baseYear: number,
      yearSkip: number){
        const rows = [];
        for(let i = 0; i < amountOfRows; i++){
            let year = "";
            if(i === 0){
                year = `até ${baseYear + yearSkip} anos`;
            }
            else if(i === (amountOfRows - 1)){
                year = `mais de x anos`;
            }
            else{
                year = `de ${baseYear + (yearSkip * i)} a ${baseYear + (yearSkip * (i + 1))} anos`;
            }
            const percent = `${basePercent - (percentSkip * i)}%`;
            rows.push(
                <div key={i} className={"bottom-row"}>
                    <span className="flexed-table-item">{year}</span>
                    <span className="flexed-table-item">{percent}</span>
                </div>
            );
        }
        return rows;
    }
    
    renderRowsProgressivo(basePercent: number, amountOfRows: number){
      const rows = [];
      for(let i = 0; i < amountOfRows; i++){
          const percent = `${basePercent + (basePercent * i)}%`;
          rows.push(
              <div key={i} className={"bottom-row"}>
                  <span className="flexed-table-item">{percent}</span>
              </div>
          );
      }
      /* WTF??? */
      rows.push(
          <div key={amountOfRows} className={"bottom-row"}>
              <span className="flexed-table-item">{"27.5%"}</span>
          </div>
      );
      return rows;
    }
    
    renderBody(){
        return(
            <div>
                <h4>Regime de Tributação Regressivo</h4>
                <p>A legislação brasileira faculta aos participantes que ingressam em planos estruturados na modalidade de contribuição definida ou contribuição variável, a opção por regime de tributapção no qual os valores pagos a título de benefícios ou restages sujeitam-se à incidência de imposto de renda na fonte às seguintes aliguotas:</p>
                
                <div className={"flexed-table"}>
                    <div className={"top-row"}>
                        <span className="flexed-table-item">Prazo de Acomulação</span>
                        <span className="flexed-table-item">Aliquota de IR (Regime REGRESSIVO)</span>
                    </div>
                    {this.renderRowsRegressivo(6, 35, 5, 0, 2)}
                </div>
                
                <h4>Regime de Tributação Progressivo</h4>
                <p>O regime de tributação habitual, que incide sobre os salários, é conhecido como regime PROGRESSIVO, pois as aliquotas de incidência aumentam à medida que os valores recebidos são maiores. Dependendo da base de cálculo, as aliquotas incidentes no regime PROGRESSIVO podem ser:</p>
                
                <div className={"flexed-table"}>
                    <div className={"top-row"}>
                        <span className="flexed-table-item">Aliquota de IR (Regime PROGRESSIVO)</span> 
                    </div>
                    {this.renderRowsProgressivo(7.5, 3)}
                </div>
                
            </div>
        );
    }
    
    render(){
        return(
            <div className={"m-3"}>
                <Modal
                    status={this.props.modal_status}
                    onClick={this.props.toggleModal}
                    titulo={"Regime de Tributação"}
                    conteudo={this.renderBody()}
                />
            </div>
        );
    };
}