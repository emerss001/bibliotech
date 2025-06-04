"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    aprovarEmprestimo,
    EmprestimosPendenteResponse,
    entregarEmprestimo,
    rejeitarEmprestimo,
    renovarEmprestimo,
} from "@/http/admin";
import { CalendarIcon, UserIcon, MailIcon, AlertCircleIcon } from "lucide-react";
import Image from "next/image";
import AcoesEmprestimosPendentes from "./acoes-emprestimos-pendentes";
import AcoesEmprestimosEmAndamento from "./acoes-emprestimos-andamento";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface PedidoProps {
    render: "Pendentes" | "Andamento";
    pedido: EmprestimosPendenteResponse;
    refetchEmprestimos: () => void;
    refetchEmprestimosAndamento?: () => void;
}

const CardEmprestimo = ({ render, pedido, refetchEmprestimos, refetchEmprestimosAndamento }: PedidoProps) => {
    const { mutate: EmprestimoAprovar } = useMutation({
        mutationFn: aprovarEmprestimo,
    });
    const { mutate: EmprestimoRejeitar } = useMutation({
        mutationFn: rejeitarEmprestimo,
    });

    const { mutate: EmprestimoEntregar } = useMutation({
        mutationFn: entregarEmprestimo,
    });

    const { mutate: EmprestimoRenovar } = useMutation({
        mutationFn: renovarEmprestimo,
    });

    const handleEmprestimoPendentes = (id: number, acao: "aprovar" | "rejeitar", date?: Date, mensagem?: string) => {
        if (acao === "aprovar" && date) {
            EmprestimoAprovar(
                { id, date },
                {
                    onSuccess: () => {
                        toast.success("Empréstimo aprovado com sucesso!");
                        refetchEmprestimos();
                        if (refetchEmprestimosAndamento) {
                            refetchEmprestimosAndamento();
                        }
                    },
                    onError: (error) => {
                        toast.error(error.message);
                    },
                }
            );
        } else if (acao === "rejeitar") {
            EmprestimoRejeitar(
                { id, mensagem: mensagem ?? "" },
                {
                    onSuccess: () => {
                        toast.success("Empréstimo rejeitado com sucesso!");
                        refetchEmprestimos();
                        if (refetchEmprestimosAndamento) {
                            refetchEmprestimosAndamento();
                        }
                    },
                    onError: (error) => {
                        toast.error("Erro ao rejeitar o empréstimo. " + error.message);
                    },
                }
            );
        }
    };

    const handleEmprestimoEmAndamento = (id: number, acao: "entregar" | "renovar", date?: Date) => {
        if (acao === "renovar" && date) {
            EmprestimoRenovar(
                { id, date },
                {
                    onSuccess: () => {
                        toast.success("Empréstimo renovado com sucesso!");
                        refetchEmprestimos();
                    },
                    onError: (error) => {
                        toast.error("Erro ao renovar o empréstimo. " + error.message);
                    },
                }
            );
        } else if (acao === "entregar") {
            EmprestimoEntregar(id, {
                onSuccess: () => {
                    toast.success("Empréstimo entregue com sucesso!");
                    refetchEmprestimos();
                },
                onError: (error) => {
                    toast.error("Erro ao entregar o empréstimo. " + error.message);
                },
            });
        }
    };

    return (
        <Card key={pedido.id}>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Informações do Material */}
                    <div className="lg:col-span-2">
                        <div className="flex gap-4">
                            <div className="w-16 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                    src={pedido.capaUrl || "/capa-placeholder.png"}
                                    alt={`Capa de ${pedido.materialTitulo}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 space-y-3">
                                <h3 className="font-semibold text-title">{pedido.materialTitulo}</h3>
                                <Badge className="mr-2">{pedido.formato}</Badge>
                                <div className="flex items-center text-sm text-accent-foreground">
                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                    {render === "Pendentes" ? (
                                        <span>Solicitado em: {pedido.solicitado}</span>
                                    ) : (
                                        <span>Data de entrega: {pedido.solicitado}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informações do Usuário */}
                    <div>
                        <h4 className="font-medium text-title mb-2 flex items-center">
                            <UserIcon className="h-4 w-4 mr-2 text-accent-foreground" />
                            Solicitante
                        </h4>
                        <div className="space-y-1 text-sm text-accent-foreground">
                            <p className="font-medium">{pedido.solicitanteNome}</p>
                            <p className="flex items-center">
                                <MailIcon className="h-4 w-4 mr-1 text-primary" />
                                {pedido.solicitanteEmail}
                            </p>
                            <p className="flex items-center">
                                <AlertCircleIcon className="h-4 w-4 mr-1 text-primary" />
                                {pedido.solicitanteNecessidade}
                            </p>
                        </div>
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col gap-2">
                        <div className="mb-2">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Justificativa:</p>
                            <p className="text-xs text-primary bg-muted p-2 rounded">
                                {pedido.solicitanteJustificativa || "Nenhuma justificativa fornecida"}
                            </p>
                        </div>
                        {render === "Pendentes" ? (
                            <AcoesEmprestimosPendentes
                                handleEmprestimoPendentes={handleEmprestimoPendentes}
                                pedidoId={pedido.id}
                            />
                        ) : (
                            <AcoesEmprestimosEmAndamento
                                handleEmprestimoEmAndamento={handleEmprestimoEmAndamento}
                                pedidoId={pedido.id}
                            />
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardEmprestimo;
