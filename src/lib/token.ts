"use client";

import { jwtDecode } from "jwt-decode";

interface DecodedTokenResponse {
    sub: string;
    exp: number;
    tipo: "Aluno" | "Professor" | "Bibliotecario";
}

export function decodedToken(): DecodedTokenResponse | null {
    // Verifica se estamos no lado do cliente
    if (typeof window === "undefined") {
        return null;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode<DecodedTokenResponse>(token);
        return decoded;
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
    }
}
