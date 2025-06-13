"use client";

import TitlePagina from "@/components/title-pagina";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmprestimoCards from "./_components/emprestimos-cards";
import { useQuery } from "@tanstack/react-query";
import { listarEmprestimosAluno } from "@/http/emprestimos";
import { useAuth } from "@/components/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

const EmprestimoPage = () => {
    const { data, refetch } = useQuery({
        queryKey: ["emprestimos-aluno"],
        queryFn: listarEmprestimosAluno,
    });

    const { isAuthenticated, logout, authChecked } = useAuth();

    useEffect(() => {
        if (authChecked && !isAuthenticated) {
            toast.error("Sessão expirada. Faça login novamente.", { duration: 3000 });
            logout();
        }
    }, [authChecked, isAuthenticated, logout]);

    return (
        <div className="container mx-auto px-4 py-8">
            <TitlePagina title="Empréstimos" description="Gerencie os empréstimos de materiais" />

            <Tabs defaultValue="solicitados" className="w-full">
                <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                    <TabsTrigger
                        value="solicitados"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Solicitados
                    </TabsTrigger>
                    <TabsTrigger
                        value="aprovados"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Aprovados
                    </TabsTrigger>
                    <TabsTrigger
                        value="historico"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Histórico
                    </TabsTrigger>
                </TabsList>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Empréstimos solicitados */}
                    {data?.map(
                        (material) =>
                            material.status === "PENDENTE" && (
                                <EmprestimoCards
                                    key={material.id}
                                    value="solicitados"
                                    material={material}
                                    refetch={refetch}
                                />
                            )
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Empréstimos aprovados */}
                    {data?.map(
                        (material) =>
                            material.status === "APROVADO" && (
                                <EmprestimoCards key={material.id} value="aprovados" material={material} />
                            )
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Empréstimos aprovados */}
                    {data?.map(
                        (material) =>
                            material.status !== "APROVADO" &&
                            material.status !== "PENDENTE" && (
                                <EmprestimoCards key={material.id} value="historico" material={material} />
                            )
                    )}
                </div>
            </Tabs>
        </div>
    );
};

export default EmprestimoPage;
