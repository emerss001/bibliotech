/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import urlBase from "./url-base";

interface AlunoEsmprestimoResponse {
    id: number;
    material: {
        id: number;
        titulo: string;
        autor: string;
        formato: {
            name: string;
        };
    };
    dataCriacao: string;
    dataAprovacao?: string;
    dataDevolucaoPrevista?: string;
    dataDevolucaoReal?: string;
    rejicaoMotivo: string;
    status: "PENDENTE" | "APROVADO" | "REPROVADO" | "DEVOLVIDO" | "REJEITADO";
    capa: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const criarEmprestimo = async (id: number, mensagem: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const response = await axios.post(`${urlBase}/protegida/emprestimos/${id}`, mensagem ? { mensagem } : {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }
};

export const listarEmprestimosAluno = async (): Promise<AlunoEsmprestimoResponse[]> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.get(`${urlBase}/protegida/emprestimos/aluno`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const deletarEmprestimo = async (id: number): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    try {
        await axios.delete(`${urlBase}/protegida/emprestimos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.error || "Erro ao deletar o empréstimo.");
            }
        }
        throw new Error("Erro ao deletar o empréstimo.");
    }
};

export type { AlunoEsmprestimoResponse };
