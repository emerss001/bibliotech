"use client";

import { decodedToken } from "@/lib/token";

export const getVinculo = (): { vinculo: "Aluno" | "Professor" | "Bibliotecario" | null } => {
    const token = decodedToken();
    const vinculo = token?.tipo;

    if (vinculo === "Aluno" || vinculo === "Professor" || vinculo === "Bibliotecario") {
        return { vinculo };
    } else {
        return { vinculo: null };
    }
};
