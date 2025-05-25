import axios from "axios";
import urlBase from "./url-base";

// interface ErroResponse {
//     status: number;
//     error: string;
// }

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
    mensagem: string;
    status: "PENDENTE" | "APROVADO" | "REPROVADO" | "DEVOLVIDO" | "REJEITADO";
}

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

export type { AlunoEsmprestimoResponse };
