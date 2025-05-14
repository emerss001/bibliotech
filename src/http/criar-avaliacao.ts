import urlBase from "./url-base";

interface CriarAvaliacaoData {
    materialId: number;
    nota: number;
    avaliacao: string;
}

export default async function criarAvaliacao(data: CriarAvaliacaoData): Promise<void> {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const response = await fetch(`${urlBase}/protegida/avaliacoes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Erro ao criar avaliação.");
        }

        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao criar avaliação.");
    }
}
