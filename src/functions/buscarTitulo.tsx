/* 
    Função utilizada para buscar a descrição de um item dentro de uma array. Bastante utilizado
    nos esquemas de COD/DES, onde a função irá retornar o DES baseado na chave utilizada (COD).
    Parâmetros:
        - lista: array com os objetos a serem varridos.
        - colunaTitulo: nome da propriedade em que irá ser extraído a descrição.
        - colunaValor: nome da propriedade chave.
        - valor: chave selecionada.
*/
export const buscarTitulo = (lista: Array<any>, colunaTitulo: string, colunaValor: string, valor: any) =>
    lista.filter(x => x[colunaValor] === valor)[0][colunaTitulo];