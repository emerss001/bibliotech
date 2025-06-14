"use client";

import TitlePagina from "@/components/title-pagina";
import MetricasAlunos from "./_components/metricas-alunos";
import { listraAlunos } from "@/http/admin";
import { Card, CardContent } from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import TabelaAlunos from "./_components/tabela-alunos";
import { useAdmin } from "@/util/UseAdmin";
import { toast } from "sonner";

const AdminAlunosPage = () => {
    const { isAuthorized } = useAdmin("Bibliotecario");

    const { data: alunos, refetch } = useQuery({
        queryKey: ["alunos-admin"],
        queryFn: listraAlunos,
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("todos");

    const filteredAlunos = alunos?.filter((aluno) => {
        const matchesSearch =
            aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            aluno.matricula.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterStatus === "todos" ||
            (filterStatus === "ativos" && aluno.suspenso === false) ||
            (filterStatus === "suspenso" && aluno.suspenso === true);

        return matchesSearch && matchesFilter;
    });

    if (isAuthorized === null) {
        return null;
    }

    if (!isAuthorized) {
        toast.error("Acesso negado. Você não tem permissão para acessar esta página.");
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <TitlePagina title="Gerenciar Alunos" description="Visualize e gerencie todos os alunos do sistema" />

            <MetricasAlunos />

            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-auto">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por título, autor ou descrição..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-[400px] pl-8 border-primary focus-visible:ring-primary"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={filterStatus === "todos" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus("todos")}
                                className={
                                    filterStatus === "todos"
                                        ? "bg-primary hover:bg-muted-foreground text-white"
                                        : "text-primary"
                                }
                            >
                                Todos
                            </Button>
                            <Button
                                variant={filterStatus === "ativos" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus("ativos")}
                                className={
                                    filterStatus === "ativos"
                                        ? "hover:bg-green-700"
                                        : "border-green-300 text-green-700 hover:bg-green-50"
                                }
                            >
                                Ativos
                            </Button>
                            <Button
                                variant={filterStatus === "suspenso" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus("suspenso")}
                                className={
                                    filterStatus === "suspenso"
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "border-red-300 text-red-700 hover:bg-red-50"
                                }
                            >
                                Suspensos
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <TabelaAlunos alunos={filteredAlunos} refetch={refetch} />
        </div>
    );
};

export default AdminAlunosPage;
