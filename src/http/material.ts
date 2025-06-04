/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import urlBase from "./url-base";

interface MaterialResponse {
    id: number;
    formato: string;
    area: string;
    titulo: string;
    cadastrado_por: string;
    descricao: string;
    tipo: "Digital" | "Físico";
    nivel: "Básico" | "Intermediário" | "Avançado";
    capa: string;
}

interface MaterialDetailsResponse {
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
    adicionado: string;
    capa: string;
}

export interface FiltroProps {
    tipo?: string[];
    nivel?: string[];
    formato?: number[];
    area?: number[];
}

interface CriarMaterialData {
    titulo: string;
    autor: string;
    formato: string;
    area: string;
    nivel: string;
    descricao: string;
    capa?: File | null; // A capa deve ser do tipo File
    arquivo?: File; // O arquivo deve ser do tipo File
    quantidade?: number; // Para materiais físicos
}

type CriarMaterialDigitalArgs = {
    data: CriarMaterialData;
    onProgress?: (percent: number) => void;
};

function buildQueryParams(filtro: FiltroProps): string {
    const params = new URLSearchParams();

    // Filtros múltiplos: adiciona cada valor com o mesmo nome
    filtro.tipo?.forEach((t) => params.append("tipo", t));
    filtro.nivel?.forEach((n) => params.append("nivel", n));
    filtro.formato?.forEach((f) => params.append("formato", f.toString()));
    filtro.area?.forEach((a) => params.append("area", a.toString()));

    return params.toString();
}

export const getMateriais = async (filtro: FiltroProps): Promise<MaterialResponse[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    const queryParams = buildQueryParams(filtro);

    try {
        const response = await axios.get(`${urlBase}/protegida/materials?${queryParams}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar materiais.");
    }
};

export const atualizarUsoMaterial = async (id: number): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        await axios.patch(`${urlBase}/materials/atualizar-uso/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao atualizar uso do material.");
    }
};

export const getMaterialDetails = async (id: number): Promise<MaterialDetailsResponse> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const response = await axios.get(`${urlBase}/protegida/materials/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar detalhes do material.");
    }
};

export const criarMaterialDigital = async ({ data, onProgress }: CriarMaterialDigitalArgs): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const formData = new FormData();
        formData.append("titulo", data.titulo);
        formData.append("autor", data.autor);
        formData.append("formato", data.formato);
        formData.append("area", data.area);
        formData.append("nivel", data.nivel);
        formData.append("descricao", data.descricao);
        if (data.arquivo) {
            formData.append("arquivo", data.arquivo);
        }
        if (data.capa) {
            formData.append("capa", data.capa);
        }

        console.log(data);
        const response = await axios.post(`${urlBase}/protegida/materials/material-digital`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
                if (event.total && onProgress) {
                    const percent = Math.round((event.loaded * 100) / event.total);
                    onProgress(percent);
                }
            },
        });

        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error("Erro ao criar material: " + (error?.message ?? "Erro inesperado."));
    }
};

export const criarMaterialFisico = async (data: CriarMaterialData): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const formData = new FormData();
        formData.append("titulo", data.titulo);
        formData.append("autor", data.autor);
        formData.append("formato", data.formato);
        formData.append("area", data.area);
        formData.append("nivel", data.nivel);
        formData.append("descricao", data.descricao);
        if (data.quantidade !== undefined) {
            formData.append("quantidade", data.quantidade.toString());
        }
        if (data.capa) {
            formData.append("capa", data.capa);
        }

        await axios.post(`${urlBase}/protegida/materials/material-fisico`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error: any) {
        console.error(error);
        throw new Error("Erro ao criar material físico: " + (error?.message ?? "Erro inesperado."));
    }
};

export type { MaterialDetailsResponse, MaterialResponse };
