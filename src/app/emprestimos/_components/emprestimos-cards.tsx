"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { criarAvaliacao } from "@/http/avaliacao";
import { AlunoEsmprestimoResponse, deletarEmprestimo } from "@/http/emprestimos";
import { useMutation } from "@tanstack/react-query";
import {
    AlertCircle,
    BookCheckIcon,
    BookOpen,
    BookOpenIcon,
    CalendarIcon,
    CheckCircleIcon,
    Clock,
    LoaderCircleIcon,
    Star,
    XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { parse } from "date-fns";

interface EmprestimoCardsProps {
    value: "solicitados" | "aprovados" | "historico";
    material: AlunoEsmprestimoResponse;
    refetch?: () => void;
}

const EmprestimoCards = ({ value, material, refetch }: EmprestimoCardsProps) => {
    const [rating, setRating] = useState(0);
    const [comentario, setComentario] = useState("");
    const [avaliar, setAvaliar] = useState(false);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (avaliacao: { materialId: number; nota: number; avaliacao: string }) => {
            const response = await criarAvaliacao(avaliacao);
            return response;
        },
    });

    const { mutate: cancelar, isPending: cancelarPedding } = useMutation({
        mutationFn: deletarEmprestimo,
        onSuccess: () => {
            toast.success("Empréstimo cancelado com sucesso!");
            if (refetch) {
                refetch();
            }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast.error("Erro ao cancelar empréstimo: " + error.message);
        },
    });

    const handleRating = (value: number) => {
        setRating(value);
    };

    async function handleAvaliar(id: number) {
        const avaliacao = {
            materialId: id,
            nota: rating,
            avaliacao: comentario,
        };

        try {
            await mutateAsync(avaliacao);
            toast.success("Avaliação enviada com sucesso!");
        } catch (err) {
            toast.error("Erro ao enviar avaliação: " + err);
        } finally {
            setRating(0);
            setComentario("");
            setAvaliar(false);
        }
    }

    return (
        <TabsContent value={value} className="mt-6">
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <Badge className="mb-2">{material.material.formato.name}</Badge>
                        <Badge variant="secondary">
                            {material.status === "PENDENTE" && "Solicitado"}
                            {material.status === "APROVADO" && "Em andamento"}
                            {material.status === "DEVOLVIDO" && "Devolvido"}
                            {material.status === "REJEITADO" && "Rejeitado"}
                        </Badge>
                    </div>
                    <CardTitle className="text-xl text-title">{material.material.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-8 mb-4">
                        <div className="w-1/4 relative">
                            <Image
                                src={material.capa || "/capa-placeholder.png"}
                                alt="Capa do material"
                                className="rounded-md object-cover"
                                fill
                            />
                        </div>
                        <div className="w-3/4 space-y-2">
                            {material.status !== "REJEITADO" && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <BookOpen className="h-4 w-4 mr-2 text-faculdade-500" />
                                    <span>{material.material.autor}</span>
                                </div>
                            )}
                            {material.status === "PENDENTE" && (
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-2 text-faculdade-500" />
                                        <span>Solicitado em: {material.dataCriacao}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                                        <span className="text-yellow-600 font-medium">Aguardando aprovação</span>
                                    </div>
                                </div>
                            )}
                            {material.status === "APROVADO" && (
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-2 text-faculdade-500" />
                                        <span>Aprovado em: {material.dataAprovacao}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-2 text-faculdade-500" />
                                        <span>Devolução até: {material.dataDevolucaoPrevista}</span>
                                    </div>
                                    {material?.dataDevolucaoPrevista &&
                                        (() => {
                                            const dataPrevista = parse(
                                                material.dataDevolucaoPrevista,
                                                "dd/MM/yyyy",
                                                new Date()
                                            ).getTime();
                                            const agora = Date.now();
                                            const diferenca = dataPrevista - agora;

                                            if (diferenca < 0) {
                                                return (
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                                                        <span className="text-red-600 font-medium">Atrasado</span>
                                                    </div>
                                                );
                                            } else if (diferenca < 3 * 24 * 60 * 60 * 1000) {
                                                return (
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                                                        <span className="text-yellow-600 font-medium">
                                                            Vencimento próximo
                                                        </span>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                                                        <span className="text-green-600 font-medium">
                                                            Dentro do prazo
                                                        </span>
                                                    </div>
                                                );
                                            }
                                        })()}
                                </div>
                            )}
                            {material.status === "DEVOLVIDO" && (
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-2 text-faculdade-500" />
                                        <span>Aprovado em: {material.dataAprovacao}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-2 text-faculdade-500" />
                                        <span>Devolvido em: {material.dataDevolucaoReal}</span>
                                    </div>
                                </div>
                            )}

                            {material.status === "REJEITADO" && (
                                <>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                                            <span className="text-red-600 font-medium">Solicitação rejeitada</span>
                                        </div>
                                        <div className="flex text-sm text-muted-foreground">
                                            <CalendarIcon className="h-4 w-4 mr-2" />
                                            <span className="font-medium">
                                                Motivo da rejeição:{" "}
                                                {material.rejicaoMotivo || "Nenhuma mensagem fornecida pelo avaliador."}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {material.status === "DEVOLVIDO" && (
                        <>
                            <div className="mt-4">
                                <Button
                                    variant="outline"
                                    className="w-full text-primary"
                                    onClick={() => setAvaliar((prev) => !prev)}
                                >
                                    <BookCheckIcon className="h-4 w-4 text-primary" />
                                    Avaliar
                                </Button>
                            </div>

                            <div className={`mt-4 transition-all duration-500 ease-in-out ${avaliar ? "" : "hidden"}`}>
                                <p className="text-sm font-medium text-faculdade-800 mb-2">Avalie este material:</p>
                                <div className="flex items-center mb-2">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleRating(value)}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-6 w-6 ${
                                                    value <= rating
                                                        ? "text-yellow-500 fill-yellow-500"
                                                        : "text-gray-300"
                                                } transition-colors duration-200 hover:text-yellow-400`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <Textarea
                                    className="mb-4 border-primary focus-visible:ring-faculdade-500"
                                    placeholder="Compartilhe sua experiência com este material..."
                                    rows={3}
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                />
                                <Button
                                    className="w-full"
                                    disabled={rating === 0 || isPending}
                                    onClick={() => handleAvaliar(material.material.id)}
                                >
                                    {isPending ? <LoaderCircleIcon className="animate-spin" /> : "Avaliar"}
                                </Button>
                            </div>
                        </>
                    )}

                    {material.status === "PENDENTE" && (
                        <div className="mt-4">
                            <Button
                                variant="outline"
                                className="w-full text-primary"
                                onClick={() => cancelar(material.id)}
                                disabled={cancelarPedding}
                            >
                                <XIcon className="h-4 w-4 text-primary" />
                                Cancelar
                            </Button>
                        </div>
                    )}

                    {material.status === "REJEITADO" && (
                        <div className="mt-4">
                            <Link href={`/material/${material.material.id}`}>
                                <Button variant="outline" className="w-full text-primary">
                                    <BookOpenIcon className="h-4 w-4 text-primary" />
                                    Ir para o material
                                </Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default EmprestimoCards;
