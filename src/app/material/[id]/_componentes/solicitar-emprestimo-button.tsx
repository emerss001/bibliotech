import { Button } from "@/components/ui/button";
import { criarEmprestimo } from "@/http/criar-emprestimo";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SolicitarEmprestimoButtonProps {
    disponibilidade: boolean | undefined;
    materialId: number;
    token: string;
}

const SolicitarEmprestimoButton = ({ disponibilidade, materialId, token }: SolicitarEmprestimoButtonProps) => {
    const [solicitado, setSolicitado] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSolicitarEmprestimo() {
        setLoading(true);
        if (!disponibilidade) {
            return;
        }
        if (!token) {
            alert("Você precisa estar logado para solicitar um empréstimo.");
            return;
        }

        try {
            const confirmacao = await criarEmprestimo(materialId);
            if (confirmacao) {
                setSolicitado(true);
                toast.success("Empréstimo solicitado com sucesso!");
            } else {
                alert("Erro ao solicitar o empréstimo. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro ao solicitar o empréstimo:", error);
            toast.error("Erro ao solicitar o empréstimo. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button onClick={handleSolicitarEmprestimo} disabled={!disponibilidade || solicitado} className="w-full">
            {loading ? (
                <LoaderCircle className="animate-spin" />
            ) : (
                <>
                    <CalendarIcon />
                    Solicitar empréstimo
                </>
            )}
        </Button>
    );
};

export default SolicitarEmprestimoButton;
