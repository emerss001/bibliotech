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
import { CalendarIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

interface PedidoProps {
    handleEmprestimoEmAndamento: (id: number, acao: "entregar" | "renovar", date?: Date) => void;
    pedidoId: number;
}

const AcoesEmprestimosEmAndamento = ({ handleEmprestimoEmAndamento, pedidoId }: PedidoProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="flex gap-2">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Renovar
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Definada a nova data de devolução</AlertDialogTitle>
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
                                onClick={() => handleEmprestimoEmAndamento(pedidoId, "renovar", date!)}
                            >
                                Continuar
                            </AlertDialogAction>
                            <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <Button
                size="sm"
                variant="outline"
                className="flex-1 border-yellow-300 text-yellow-600 hover:bg-red-50"
                onClick={() => handleEmprestimoEmAndamento(pedidoId, "entregar")}
            >
                <CheckIcon className="h-4 w-4 mr-1" />
                Entregue
            </Button>
        </div>
    );
};

export default AcoesEmprestimosEmAndamento;
