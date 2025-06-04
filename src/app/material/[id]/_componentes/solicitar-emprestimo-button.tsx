import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { criarEmprestimo } from "@/http/emprestimos";
import { atualizarUsoMaterial } from "@/http/material";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SolicitarEmprestimoButtonProps {
    disponibilidade: boolean | undefined;
    materialId: number;
}

const SolicitarEmprestimoButton = ({ disponibilidade, materialId }: SolicitarEmprestimoButtonProps) => {
    const { mutate, isPending } = useMutation({
        mutationKey: ["criarEmprestimo", materialId],
        mutationFn: () => criarEmprestimo(materialId, mensagem),
        onSuccess: () => {
            toast.success("Empréstimo solicitado com sucesso!");
            atualizarUsoMaterial(materialId);
        },
        onError: (error) => {
            toast.error("Erro ao solicitar o empréstimo. " + error);
        },
    });

    const [solicitado, setSolicitado] = useState(false);
    const [clicado, setClicado] = useState(false);
    const [mensagem, setMensagem] = useState("");

    async function handleSolicitarEmprestimo() {
        if (!disponibilidade) {
            return;
        }

        mutate();
        setSolicitado(true);
    }

    return (
        <div>
            <Button disabled={!disponibilidade || solicitado} className="w-full" onClick={() => setClicado(true)}>
                {isPending ? (
                    <LoaderCircle className="animate-spin" />
                ) : (
                    <>
                        <CalendarIcon />
                        Solicitar empréstimo
                    </>
                )}
            </Button>

            <div className={`space-y-2 mt-4 ${!clicado ? "hidden" : ""}`}>
                <Label className="text-sm text-secondary-foreground mt-4 font-semibold">Observações (opcional)</Label>
                <Textarea
                    rows={3}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Para qual finalidade este empréstimo?"
                />
                <Button onClick={handleSolicitarEmprestimo}>Solicitar</Button>
            </div>
        </div>
    );
};

export default SolicitarEmprestimoButton;
