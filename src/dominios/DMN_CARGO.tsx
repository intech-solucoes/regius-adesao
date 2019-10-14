import { Dominio } from "./Dominio";

export class DMN_CARGO{
    static DESENVOLVEDOR = new Dominio("0", "DESENVOLVEDOR");
    static RH = new Dominio("1", "RH");
    static QUALIDADE = new Dominio("2", "QUALIDADE");
    static GED = new Dominio("3", "GED");

    static list: Array<Dominio> = [
        DMN_CARGO.DESENVOLVEDOR,
        DMN_CARGO.RH,
        DMN_CARGO.QUALIDADE,
        DMN_CARGO.GED
    ];
    
    static default_value: string = DMN_CARGO.DESENVOLVEDOR.value;
}