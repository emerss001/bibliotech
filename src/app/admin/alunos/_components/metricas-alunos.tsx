"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricasAlunos } from "@/http/admin";
import { useQuery } from "@tanstack/react-query";
import { UserCheckIcon, UsersIcon, UserXIcon } from "lucide-react";

const MetricasAlunos = () => {
    const { data: metricas } = useQuery({
        queryKey: ["metricas-alunos"],
        queryFn: metricasAlunos,
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Total de Usuários</CardTitle>
                    <UsersIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <h1 className="text-2xl font-bold text-title">
                        {metricas?.totalAlunos ? metricas.totalAlunos : 0}
                    </h1>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Usuários Ativos</CardTitle>
                    <UserCheckIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <h1 className="text-2xl font-bold text-primary">{metricas?.ativos ? metricas.ativos : 0}</h1>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Usuários Suspensos</CardTitle>
                    <UserXIcon className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                    <h1 className="text-2xl font-bold text-red-600">{metricas?.suspensos ? metricas.suspensos : 0}</h1>
                </CardContent>
            </Card>
        </div>
    );
};

export default MetricasAlunos;
