"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";

interface PedidoProps {
    handleEmprestimoPendentes: (id: number, acao: "aprovar" | "rejeitar", date?: Date, mensagem?: string) => void;
    pedidoId: number;
}

const AcoesEmprestimosPendentes = ({ handleEmprestimoPendentes, pedidoId }: PedidoProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [mensagem, setMensagem] = useState<string>("");

    return (
        <div className="flex gap-2">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Aprovar
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Definada a data de devolução</AlertDialogTitle>
                        <AlertDialogDescription>
                            Com base no material e as necessidades do aluno, defina a data de devolução.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                        <div className="flex gap-4">
                            <AlertDialogAction
                                disabled={!date}
                                className="w-full"
                                onClick={() => handleEmprestimoPendentes(pedidoId, "aprovar", date!)}
                            >
                                Continuar
                            </AlertDialogAction>
                            <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex-1 border-red-300 text-red-600 hover:bg-red-50">
                        <XCircleIcon className="h-4 w-4 mr-1" />
                        Rejeitar
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Definada o motivo da rejeição</AlertDialogTitle>
                        <AlertDialogDescription>
                            Descreva para o usuário o motivo da rejeição do pedido de empréstimo deste material.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Textarea
                        placeholder="Digite o motivo da rejeição..."
                        maxLength={255}
                        className="border focus:border-ring"
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                    />

                    <div className="flex gap-4">
                        <AlertDialogAction
                            disabled={!mensagem || mensagem.length < 5}
                            className="w-full"
                            onClick={() => handleEmprestimoPendentes(pedidoId, "rejeitar", undefined, mensagem)}
                        >
                            Continuar
                        </AlertDialogAction>
                        <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AcoesEmprestimosPendentes;
