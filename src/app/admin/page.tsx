"use client";

import TitlePagina from "@/components/title-pagina";
import CardsEstatisticas from "./_components/card-estatisticas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    aprovarCadastro,
    emprestimosEmAndamento,
    listarCadastrosPendentes,
    listarEmprestimosPendentes,
    listarMetricas,
    rejeitarCadastro,
} from "@/http/admin";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import CardEmprestimo from "./_components/card-emprestimo";
import CardCadastros from "./_components/card-cadastros";
import { useAdmin } from "@/util/UseAdmin";
import { toast } from "sonner";

const AdminPage = () => {
    const { isAuthorized } = useAdmin("Bibliotecario");

    const { data: metricas } = useQuery({
        queryKey: ["métricas"],
        queryFn: listarMetricas,
    });

    const { data: emprestimosPendentes, refetch: refetchEmprestimos } = useQuery({
        queryKey: ["emprestimos-aluno"],
        queryFn: listarEmprestimosPendentes,
    });

    const { data: emprestimosAndamento, refetch: refetchEmprestimosAndamento } = useQuery({
        queryKey: ["emprestimos-aluno-andamento"],
        queryFn: emprestimosEmAndamento,
    });

    const { data: cadastrosPendentes, refetch: refetchCadastros } = useQuery({
        queryKey: ["cadastros-pendentes"],
        queryFn: listarCadastrosPendentes,
    });

    const { mutate: cadastroAprovar } = useMutation({
        mutationFn: aprovarCadastro,
    });
    const { mutate: cadastroRejeitar } = useMutation({
        mutationFn: rejeitarCadastro,
    });

    // State for search inputs
    const [searchEmprestimos, setSearchEmprestimos] = useState("");
    const [searchCadastros, setSearchCadastros] = useState("");

    const filteredEmprestimosAndamento = emprestimosAndamento?.filter(
        (pedido) =>
            pedido.solicitanteNome.toLowerCase().includes(searchEmprestimos.toLowerCase()) ||
            pedido.materialTitulo.toLowerCase().includes(searchEmprestimos.toLowerCase())
    );

    const filteredEmprestimos = emprestimosPendentes?.filter(
        (pedido) =>
            pedido.solicitanteNome.toLowerCase().includes(searchEmprestimos.toLowerCase()) ||
            pedido.materialTitulo.toLowerCase().includes(searchEmprestimos.toLowerCase())
    );

    const filteredCadastros = cadastrosPendentes?.filter(
        (pedido) =>
            pedido.nome.toLowerCase().includes(searchCadastros.toLowerCase()) ||
            pedido.email.toLowerCase().includes(searchCadastros.toLowerCase())
    );

    const handleCadastro = (id: number, acao: "aprovar" | "rejeitar") => {
        if (acao === "aprovar") {
            cadastroAprovar(id, {
                onSuccess: () => {
                    toast.success("Cadastro aprovado com sucesso!");
                    refetchCadastros();
                },
                onError: (error) => {
                    toast.error("Erro ao aprovar o cadastro. " + error.message);
                },
            });
        } else {
            cadastroRejeitar(id, {
                onSuccess: () => {
                    toast.success("Cadastro rejeitado com sucesso!");
                    refetchCadastros();
                },
                onError: (error) => {
                    toast.error("Erro ao rejeitar o cadastro. " + error.message);
                },
            });
        }
    };

    if (isAuthorized === null) {
        return null;
    }

    if (!isAuthorized) {
        toast.error("Acesso negado. Você não tem permissão para acessar esta página.");
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <TitlePagina
                title="Painel Administrativo"
                description="Gerencie pedidos de empréstimo e solicitações de cadastro dos usuários"
            />

            <CardsEstatisticas
                metricas={metricas}
                emprestimosPendentes={emprestimosPendentes?.length}
                cadastrosPendentes={cadastrosPendentes?.length}
            />

            <Tabs defaultValue="emprestimos" className="space-y-6">
                <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger
                        value="emprestimos"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Pedidos de Empréstimo
                    </TabsTrigger>
                    <TabsTrigger
                        value="cadastros"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Solicitações de Cadastro
                    </TabsTrigger>
                    <TabsTrigger
                        value="andamento"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Empréstimos em andamento
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="emprestimos" className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-auto">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por usuário ou material..."
                                value={searchEmprestimos}
                                onChange={(e) => setSearchEmprestimos(e.target.value)}
                                className="w-full md:w-[300px] pl-8"
                            />
                        </div>
                        <Badge variant="outline">{emprestimosPendentes?.length} pedidos pendentes</Badge>
                    </div>

                    <div className="space-y-4">
                        {filteredEmprestimos?.map((pedido) => (
                            <CardEmprestimo
                                pedido={pedido}
                                key={pedido.id}
                                render="Pendentes"
                                refetchEmprestimos={refetchEmprestimos}
                                refetchEmprestimosAndamento={refetchEmprestimosAndamento}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="cadastros" className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-auto">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por usuário ou material..."
                                value={searchCadastros}
                                onChange={(e) => setSearchCadastros(e.target.value)}
                                className="w-full md:w-[300px] pl-8"
                            />
                        </div>
                        <Badge variant="outline">{cadastrosPendentes?.length} solicitações pendentes</Badge>
                    </div>

                    <div className="space-y-4">
                        {filteredCadastros?.map((pedido) => (
                            <CardCadastros pedido={pedido} key={pedido.id} handleCadastro={handleCadastro} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="andamento" className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-auto">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por usuário ou material..."
                                value={searchEmprestimos}
                                onChange={(e) => setSearchEmprestimos(e.target.value)}
                                className="w-full md:w-[300px] pl-8"
                            />
                        </div>
                        <Badge variant="outline">{emprestimosAndamento?.length} pedidos pendentes</Badge>
                    </div>

                    <div className="space-y-4">
                        {filteredEmprestimosAndamento?.map((pedido) => (
                            <CardEmprestimo
                                pedido={pedido}
                                key={pedido.id}
                                refetchEmprestimos={refetchEmprestimosAndamento}
                                render="Andamento"
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminPage;
