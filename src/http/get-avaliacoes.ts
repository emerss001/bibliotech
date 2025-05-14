import urlBase from "./url-base";

export interface AvaliacaoResponse {
    id: number;
    aluno: string;
    nota: number;
    avaliacao: string;
    data: string;
}

export default async function getAvaliacoes(idMaterial: number): Promise<AvaliacaoResponse[]> {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const response = await fetch(`${urlBase}/protegida/avaliacoes/${idMaterial}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error("Erro ao buscar avaliações.");
        }

        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar avaliações.");
    }
}
