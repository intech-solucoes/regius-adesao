import React from "react";

interface Props{};

interface State{};

export class Passo5NenhumBeneficiario extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {};
    }
    
    render(){
        return(
            <table className={"table table-striped table-bordered table-hover"}>
                <thead>
                    <tr>
                        <th>Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td scope="row">Nenhum beneficiário incluído</td>
                      </tr>
                </tbody>
            </table>
        );
    }
}

// <div className={"flexed-table"}>
                // <div className={"top-row"}>
                    // <span className="flexed-table-item">Nome</span>
                // </div>
                // <div className={"bottom-row"}>
                    // <span className="flexed-table-item">Nenhum beneficiário incluído</span>
                // </div>
            // </div>