import axios from "axios";
import urlBase from "./url-base";

interface loginData {
    vinculo: "ALUNO" | "PROFESSOR" | "BIBLIOTECARIO";
    identificador: string;
    senha: string;
}

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

export const login = async (data: loginData): Promise<{ token: string }> => {
    try {
        const response = await axios.post(`${urlBase}/login`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error("Erro ao fazer login. " + error.response.data.error);
            }
        }
        throw new Error("Erro inesperado ao fazer login.");
    }
};

export const cadastro = async (data: cadastroData) => {
    console.log(data);
    try {
        const response = await axios.post(`${urlBase}/cadastro`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error("Erro ao fazer login. " + error.response.data.error);
            }
        }
    }
};
