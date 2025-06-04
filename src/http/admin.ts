import axios from "axios";
import urlBase from "./url-base";

interface EmprestimosPendenteResponse {
    id: number;
    materialTitulo: string;
    formato: string;
    solicitado: string;
    solicitanteNome: string;
    solicitanteEmail: string;
    solicitanteNecessidade: string;
    solicitanteJustificativa: string;
    capaUrl: string;
}

interface MetricasResponse {
    materiais: number;
    usuarios: number;
}

interface CadastrosPendentesResponse {
    id: number;
    nome: string;
    email: string;
    vinculo: string;
    necessidade: string;
    identificador: string;
    solicitado: string;
}

interface MateriaisResponse {
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
    nota: number;
    adicionado: string;
    quantidadeAvaliacoes: number;
    uso: number;
    listado: boolean;
    capa: string | null;
}

interface MetricasMateriaisResponse {
    totalMateriais: number;
    fisicos: number;
    digitais: number;
    disponibilidade: number;
    indisponibilidade: number;
    downloadsTotal: number;
    emprestimosTotal: number;
    mediaAvaliacao: number;
    totalAvaliacoes: number;
}

interface MetricasAlunoResponse {
    totalAlunos: number;
    ativos: number;
    suspensos: number;
}

interface AlunosResponse {
    id: number;
    nome: string;
    email: string;
    matricula: string;
    necessidade: string;
    suspenso: boolean;
    emprestimosTotatis: number;
    emprestimosFinalizados: number;
}

export const listarMetricas = async (): Promise<MetricasResponse> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.get(`${urlBase}/admin/metricas`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const listarEmprestimosPendentes = async (): Promise<EmprestimosPendenteResponse[]> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.get(`${urlBase}/admin/emprestimos-pendentes`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const aprovarEmprestimo = async ({ id, date }: { id: number; date: Date }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const response = await axios.patch(
            `${urlBase}/protegida/emprestimos/aprovar/${id}`,
            { dataDevolucao: date },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(
                    "Erro ao aprovar o empréstimo. " + error.response.data.error || "Erro ao aprovar o empréstimo."
                );
            }
        }
    }
};

export const rejeitarEmprestimo = async ({ id, mensagem }: { id: number; mensagem: string }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.patch(
        `${urlBase}/protegida/emprestimos/rejeitar/${id}`,
        { mensagemRejeicao: mensagem },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const listarCadastrosPendentes = async (): Promise<CadastrosPendentesResponse[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.get(`${urlBase}/admin/cadastros-pendentes`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const aprovarCadastro = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.patch(
        `${urlBase}/admin/aprovar-cadastro/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const rejeitarCadastro = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.delete(`${urlBase}/admin/rejeitar-cadastro/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// materiais
export const metricasMateriais = async (): Promise<MetricasMateriaisResponse> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.get(`${urlBase}/admin/metricas-materiais`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const listarMateriais = async (): Promise<MateriaisResponse[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.get(`${urlBase}/admin/buscar-materiais`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const excluirMaterial = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.delete(`${urlBase}/admin/excluir-material/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const listarMaterial = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.patch(
        `${urlBase}/admin/listar-material/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const ocultarMaterial = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.patch(
        `${urlBase}/admin/ocultar-material/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

// usuarios
export const metricasAlunos = async (): Promise<MetricasAlunoResponse> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.get(`${urlBase}/admin/metricas-alunos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const listraAlunos = async (): Promise<AlunosResponse[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.get(`${urlBase}/admin/buscar-alunos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const suspenderAluno = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.patch(
        `${urlBase}/admin/suspender-aluno/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const ativarAluno = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.patch(
        `${urlBase}/admin/ativar-aluno/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const emprestimosEmAndamento = async (): Promise<EmprestimosPendenteResponse[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.get(`${urlBase}/admin/emprestimos-andamento`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const entregarEmprestimo = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.patch(
        `${urlBase}/admin/emprestimos/devolver/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const renovarEmprestimo = async ({ id, date }: { id: number; date: Date }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.patch(
        `${urlBase}/admin/emprestimos/renovar/${id}`,
        { dataDevolucao: date },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export type {
    EmprestimosPendenteResponse,
    MetricasResponse,
    CadastrosPendentesResponse,
    MetricasMateriaisResponse,
    MateriaisResponse,
    AlunosResponse,
};
