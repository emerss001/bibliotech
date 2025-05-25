/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import urlBase from "./url-base";

interface EmprestimoResponse {
    id: number;
}

export async function criarEmprestimo(id: number): Promise<EmprestimoResponse> {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const response = await axios.post(
            `${urlBase}/protegida/emprestimos/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status !== 201) {
            throw new Error("Erro ao criar empréstimo.");
        }
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error("Erro ao criar empréstimo: " + (error?.message ?? "Erro inesperado."));
    }
}
