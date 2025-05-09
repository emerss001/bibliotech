import urlBase from "./url-base";

export interface MaterialResponse {
    id: number;
    formato: string;
    area: string;
    titulo: string;
    cadastrado_por: string;
    descricao: string;
    tipo: "Digital" | "Físico";
    nivel: "Básico" | "Intermediário" | "Avançado";
}

export interface FiltroProps {
    tipo?: string[];
    nivel?: string[];
    formato?: number[];
    area?: number[];
}

function buildQueryParams(filtro: FiltroProps, limiteInferior: number, limiteSuperior: number): string {
    const params = new URLSearchParams();

    // Filtros múltiplos: adiciona cada valor com o mesmo nome
    filtro.tipo?.forEach((t) => params.append("tipo", t));
    filtro.nivel?.forEach((n) => params.append("nivel", n));
    filtro.formato?.forEach((f) => params.append("formato", f.toString()));
    filtro.area?.forEach((a) => params.append("area", a.toString()));

    // Paginação
    params.append("limiteInferior", limiteInferior.toString());
    params.append("limiteSuperior", limiteSuperior.toString());

    return params.toString();
}

export default async function getMateriais(filtro: FiltroProps, limiteInferior: number): Promise<MaterialResponse[]> {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    const queryParams = buildQueryParams(filtro, limiteInferior, limiteInferior + 10);

    try {
        const response = await fetch(`${urlBase}/protegida/materials?${queryParams}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error("Erro ao buscar materiais.");
        }

        return result;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar materiais.");
    }
}
