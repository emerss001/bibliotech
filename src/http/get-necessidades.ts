import urlBase from "./url-base";

export interface NecessidadeResponse {
    id: string;
    nome: string;
}

export default async function getNecessidades(): Promise<NecessidadeResponse[]> {
    try {
        const response = await fetch(`${urlBase}/catalogo/necessidades`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error("Erro ao buscar necessidades.");
        }

        return result;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar necessidades.");
    }
}
