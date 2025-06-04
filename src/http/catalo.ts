import axios from "axios";
import urlBase from "./url-base";

export interface FiltroResponse {
    id: number;
    nome: string;
}

export const getNecessidades = async (): Promise<FiltroResponse[]> => {
    try {
        const response = await axios.get(`${urlBase}/catalogo/necessidades`, {});
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar necessidades.");
    }
};

const buscarFormatosMateriais = async (): Promise<FiltroResponse[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    try {
        const response = await axios.get(`${urlBase}/catalogo/formatos-materiais`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar formatos de materiais.");
    }
};

const buscarAreasConhecimento = async (): Promise<FiltroResponse[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    try {
        const response = await axios.get(`${urlBase}/catalogo/areas-conhecimento`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar áreas de conhecimento.");
    }
};

export default async function getFiltros(): Promise<{
    formato: FiltroResponse[];
    areaConhecimento: FiltroResponse[];
}> {
    try {
        const [formatos, areasConhecimentos] = await Promise.all([
            buscarFormatosMateriais(),
            buscarAreasConhecimento(),
        ]);

        return {
            formato: formatos,
            areaConhecimento: areasConhecimentos,
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar filtros.");
    }
}
