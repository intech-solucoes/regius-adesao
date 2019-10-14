import { Dominio } from "./Dominio";

export class DMN_PERCENTUAL_PARCELA{
    static a = new Dominio("0", "3.75%");
    static b = new Dominio("1", "4.00%");
    static c = new Dominio("2", "4.25%");
    static d = new Dominio("3", "4.50%");
    static e = new Dominio("4", "4.75%");
    static f = new Dominio("5", "5.00%");
    static g = new Dominio("6", "5.25%");
    static h = new Dominio("7", "5.50%");
    static i = new Dominio("8", "5.75%");
    static j = new Dominio("9", "6.00%");
    static k = new Dominio("10", "6.25%");
    static l = new Dominio("11", "6.50%");
    static m = new Dominio("12", "6.75%");
    static n = new Dominio("13", "7.00%");
    static o = new Dominio("14", "7.25%");
    static p = new Dominio("15", "7.50%");

    static list: Array<Dominio> = [
        DMN_PERCENTUAL_PARCELA.a,
        DMN_PERCENTUAL_PARCELA.b,
        DMN_PERCENTUAL_PARCELA.c,
        DMN_PERCENTUAL_PARCELA.d,
        DMN_PERCENTUAL_PARCELA.e,
        DMN_PERCENTUAL_PARCELA.f,
        DMN_PERCENTUAL_PARCELA.g,
        DMN_PERCENTUAL_PARCELA.h,
        DMN_PERCENTUAL_PARCELA.i,
        DMN_PERCENTUAL_PARCELA.j,
        DMN_PERCENTUAL_PARCELA.k,
        DMN_PERCENTUAL_PARCELA.l,
        DMN_PERCENTUAL_PARCELA.m,
        DMN_PERCENTUAL_PARCELA.n,
        DMN_PERCENTUAL_PARCELA.o,
        DMN_PERCENTUAL_PARCELA.p
    ];
    
    /*
    for(let p = 0; p < 16; p++){
      list[p] = new Dominio(p, `${(3.75 + 0.25 * p)}%`);
    }
    */
    
    static default_value: string = DMN_PERCENTUAL_PARCELA.a.value;
}