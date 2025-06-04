import axios from "axios";
import urlBase from "./url-base";

interface AvaliacaoResponse {
    id: number;
    aluno: string;
    nota: number;
    avaliacao: string;
    data: string;
}

interface CriarAvaliacaoData {
    materialId: number;
    nota: number;
    avaliacao: string;
}

export const getAvaliacoes = async (idMaterial: number): Promise<AvaliacaoResponse[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const response = await axios.get(`${urlBase}/protegida/avaliacoes/${idMaterial}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar detalhes do material.");
    }
};

export const criarAvaliacao = async (data: CriarAvaliacaoData): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const response = await axios.post(`${urlBase}/protegida/avaliacoes`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao criar avaliação.");
    }
};
