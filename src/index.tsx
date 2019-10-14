import React from "react";
import ReactDOM from "react-dom";

import Rotas from "./Rotas";
import { Roteador } from "@intechprev/componentes-web";

ReactDOM.render(
    <Roteador rotas={Rotas} />, document.getElementById('root'));