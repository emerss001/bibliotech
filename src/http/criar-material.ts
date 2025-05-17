import urlBase from "./url-base";
import axios from "axios";

interface CriarMaterialData {
    titulo: string;
    autor: string;
    formato: string;
    area: string;
    nivel: string;
    descricao: string;
    arquivo: File; // O arquivo deve ser do tipo File
}

export default async function criarMaterial(
    data: CriarMaterialData,
    onProgress?: (percent: number) => void
): Promise<void> {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

    try {
        const formData = new FormData();
        formData.append("titulo", data.titulo);
        formData.append("autor", data.autor);
        formData.append("formato", data.formato.toString());
        formData.append("area", data.area.toString());
        formData.append("nivel", data.nivel);
        formData.append("descricao", data.descricao);
        formData.append("arquivo", data.arquivo);

        await axios.post(`${urlBase}/protegida/materials/material-digital`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // axios cuida disso automaticamente, mas pode deixar
            },
            onUploadProgress: (event) => {
                if (event.total && onProgress) {
                    const percent = Math.round((event.loaded * 100) / event.total);
                    onProgress(percent);
                }
            },
        });
    } catch (error: any) {
        console.error(error);
        throw new Error("Erro ao criar material: " + (error?.message ?? "Erro inesperado."));
    }
}
