import urlBase from "./url-base";

export interface MaterialDetailsResponse {
    disponibilidade?: boolean;
    url?: string;
    id: number;
    tipo: "Fisico" | "Digital";
    autor: string;
    titulo: string;
    formato: {
        name: string;
    };
    area: {
        name: string;
    };
    nivel: "Básico" | "Intermediário" | "Avançado";
    nota: number;
    quantidadeAvaliacoes: number;
    descricao: string;
    cadastradoPor: {
        nome: string;
    };
}

export default async function getMaterialDetails(id: number): Promise<MaterialDetailsResponse> {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const response = await fetch(`${urlBase}/protegida/materials/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error("Erro ao buscar detalhes do material.");
        }

        return result;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar detalhes do material.");
    }
}
