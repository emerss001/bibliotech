import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricasResponse } from "@/http/admin";
import { BookOpenIcon, Clock, UsersIcon } from "lucide-react";
import Link from "next/link";

interface CardProps {
    metricas: MetricasResponse | undefined;
    emprestimosPendentes: number | undefined;
    cadastrosPendentes: number | undefined;
}

const CardsEstatisticas = ({ metricas, emprestimosPendentes, cadastrosPendentes }: CardProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Empréstimos Pendentes</CardTitle>
                    <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <h1 className="text-2xl font-bold text-title">{emprestimosPendentes}</h1>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Cadastros Pendentes</CardTitle>
                    <UsersIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <h1 className="text-2xl font-bold text-title">{cadastrosPendentes}</h1>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Materiais ativos</CardTitle>
                    <BookOpenIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="flex justify-between">
                    <h1 className="text-2xl font-bold text-title">{metricas?.materiais}</h1>
                    <Link href="/admin/materiais">
                        <Button variant="outline">Ver detalhes</Button>
                    </Link>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Usuários</CardTitle>
                    <UsersIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="flex justify-between">
                    <h1 className="text-2xl font-bold text-title">{metricas?.usuarios}</h1>
                    <Link href="/admin/alunos">
                        <Button variant="outline">Ver detalhes</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default CardsEstatisticas;
