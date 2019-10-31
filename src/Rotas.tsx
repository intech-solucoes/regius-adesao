import React from "react";
import { RouteProps } from "react-router-dom";
import { Rota } from "@intechprev/componentes-web";
import { Passo1, Token, Passo2, Passo3, Passo4 } from "./pages";

const rotas: Array<Rota> = [
    {
        id: "passo1",
        titulo: "Passo 1",
        caminho: "/",
        componente: (routeProps: RouteProps) => <Passo1 {...routeProps} />,
        mostrarMenu: true,
        caminhoExato: true
    },
    {
        id: "token",
        titulo: "Token",
        caminho: "/token",
        componente: (routeProps: RouteProps) => <Token {...routeProps} />,
        mostrarMenu: true,
        caminhoExato: true
    },
    {
        id: "passo2",
        titulo: "Passo 2",
        caminho: "/passo2",
        componente: (routeProps: RouteProps) => <Passo2 {...routeProps} />,
        mostrarMenu: true,
        caminhoExato: true
    },
    {
        id: "passo3",
        titulo: "Passo 3",
        caminho: "/passo3",
        componente: (routeProps: RouteProps) => <Passo3 {...routeProps} />,
        mostrarMenu: true,
        caminhoExato: true
    },
    {
        id: "passo4",
        titulo: "Passo 4",
        caminho: "/passo4",
        componente: (routeProps: RouteProps) => <Passo4 {...routeProps} />,
        mostrarMenu: true,
        caminhoExato: true
    }
];

export default rotas;

export class router{
    static skipTo(pageNumber: number){
        window.location.href = `#${rotas[pageNumber].caminho}`;
    }
}