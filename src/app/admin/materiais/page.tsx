"use client";

import TitlePagina from "@/components/title-pagina";
import MetricasMateriais from "./_components/metricas";
import { Card, CardContent } from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listarMateriais } from "@/http/admin";
import TabelaMateriais from "./_components/tabela-materiais";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/util/UseAdmin";
import { toast } from "sonner";

const AdminMateriaisPage = () => {
    const { isAuthorized } = useAdmin("Bibliotecario");

    const { data: materiais, refetch } = useQuery({
        queryKey: ["materiais-admin"],
        queryFn: listarMateriais,
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("todos");

    const filteredMateriais = materiais?.filter((material) => {
        const matchesSearch =
            material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.autor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterStatus === "todos" ||
            (filterStatus === "listados" && material.listado) ||
            (filterStatus === "ocultos" && !material.listado);

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
            <TitlePagina title="Gerenciar Materiais" description="Visualize e gerencie todos os materiais do acervo" />

            <MetricasMateriais />

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
                                variant={filterStatus === "listados" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus("listados")}
                                className={
                                    filterStatus === "listados"
                                        ? "hover:bg-green-700"
                                        : "border-green-300 text-green-700 hover:bg-green-50"
                                }
                            >
                                Listados
                            </Button>
                            <Button
                                variant={filterStatus === "ocultos" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus("ocultos")}
                                className={
                                    filterStatus === "ocultos"
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "border-red-300 text-red-700 hover:bg-red-50"
                                }
                            >
                                Ocultos
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <TabelaMateriais materiais={filteredMateriais} refetch={refetch} />
        </div>
    );
};

export default AdminMateriaisPage;
