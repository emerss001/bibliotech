import urlBase from "./url-base";

export interface FiltroResponse {
    id: number;
    nome: string;
}

const materialFormatos = async (): Promise<FiltroResponse[]> => {
    try {
        const response = await fetch(`${urlBase}/catalogo/formatos-materiais`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error("Erro ao buscar filtro de formato de materiais.");
        }

        return result;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar filtro.");
    }
};

const materialAreasConhecimentos = async (): Promise<FiltroResponse[]> => {
    try {
        const response = await fetch(`${urlBase}/catalogo/areas-conhecimento`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error("Erro ao buscar filtro de áreas de conhecimentos.");
        }

        return result;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar filtro.");
    }
};

export default async function getFiltros(): Promise<{
    formato: FiltroResponse[];
    areaConhecimento: FiltroResponse[];
}> {
    try {
        const [formatos, areasConhecimentos] = await Promise.all([materialFormatos(), materialAreasConhecimentos()]);

        return {
            formato: formatos,
            areaConhecimento: areasConhecimentos,
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro inesperado ao buscar filtros.");
    }
}
