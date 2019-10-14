export class Dominio {
    public value: string = "";
    public name: string = "";

    constructor(value: string, name: string){
        this.value = value;
        this.name = name;
    }

    public toString = () : string => this.value;
}