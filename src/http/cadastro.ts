import urlBase from "./url-base";

interface cadastroData {
    nome: string;
    email: string;
    vinculo: "ALUNO" | "PROFESSOR" | "BIBLIOTECARIO";
    senha: string;
    senhaConfirmacao: string;
    declaracao: boolean;
    matricula?: string | undefined;
    siap?: string | undefined;
    idNecessidade?: string | undefined;
}

interface cadastroResponse {
    mensagem: string | null;
    error: string | null;
}

export default async function cadastro(data: cadastroData): Promise<cadastroResponse> {
    try {
        const response = await fetch(`${urlBase}/cadastro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                mensagem: null,
                error: result?.error || "Erro ao fazer cadastro.",
            };
        }

        return {
            mensagem: result.mensagem || null,
            error: null,
        };
    } catch (error) {
        return {
            mensagem: null,
            error: error instanceof Error ? error.message : "Erro inesperado ao realizar o cadastro.",
        };
    }
}
