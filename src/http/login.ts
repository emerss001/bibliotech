import urlBase from "./url-base";

interface loginData {
    vinculo: "ALUNO" | "PROFESSOR" | "BIBLIOTECARIO";
    identificador: string;
    senha: string;
}

interface loginResponse {
    token: string | null;
    error: string | null;
}

export default async function login(data: loginData): Promise<loginResponse> {
    try {
        const response = await fetch(`${urlBase}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                token: null,
                error: result?.error || "Erro ao fazer login.",
            };
        }

        return {
            token: result.token || null,
            error: null,
        };
    } catch (error) {
        return {
            token: null,
            error: error instanceof Error ? error.message : "Erro inesperado ao fazer login.",
        };
    }
}
