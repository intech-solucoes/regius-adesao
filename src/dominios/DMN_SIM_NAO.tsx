import { Dominio } from "./Dominio";

export class DMN_SIM_NAO{
    static SIM = new Dominio("S", "SIM");
    static NAO = new Dominio("N", "NÃO");

    static list: Array<Dominio> = [
        DMN_SIM_NAO.SIM,
        DMN_SIM_NAO.NAO
    ];
    
    static list_reversed: Array<Dominio> = [
        DMN_SIM_NAO.NAO,
        DMN_SIM_NAO.SIM
    ];
    
    static default_value: string = DMN_SIM_NAO.NAO.value;
}