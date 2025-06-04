"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricasMateriais } from "@/http/admin";
import { useQuery } from "@tanstack/react-query";
import { BookOpenIcon, CalendarIcon, DownloadIcon, StarIcon } from "lucide-react";

const MetricasMateriais = () => {
    const { data: metricas } = useQuery({
        queryKey: ["metricasMateriais"],
        queryFn: metricasMateriais,
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Total de Materiais</CardTitle>
                    <BookOpenIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <h1 className="text-2xl font-bold text-title">{metricas?.totalMateriais}</h1>
                    <p className="text-xs text-primary mt-1">
                        {metricas?.fisicos} físicos · {metricas?.digitais} digitais
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Disponibilidade</CardTitle>
                    <CalendarIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <h1 className="text-2xl font-bold text-title">{metricas?.disponibilidade}</h1>
                    <p className="text-xs text-primary mt-1">{metricas?.indisponibilidade} indisponíveis</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Downloads</CardTitle>
                    <DownloadIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <h1 className="text-2xl font-bold text-title">{metricas?.downloadsTotal}</h1>
                    <p className="text-xs text-primary mt-1">{metricas?.emprestimosTotal} empréstimos físicos</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Avaliação Média</CardTitle>
                    <StarIcon className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <h1 className="text-2xl font-bold text-title">
                        {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                        }).format(metricas?.mediaAvaliacao || 0)}
                    </h1>
                    <p className="text-xs text-primary mt-1">{metricas?.totalAvaliacoes} avaliações</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default MetricasMateriais;
