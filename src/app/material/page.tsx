"use client";

import TitlePagina from "@/components/title-pagina";
import Filtros from "./_componentes/filtro";
import { useEffect, useState } from "react";
import MaterialCard from "./_componentes/material-card";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontalIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import getFiltros from "@/http/catalo";
import { FiltroProps, getMateriais } from "@/http/material";
import { useAuth } from "@/components/AuthContext";

const MaterialPage = () => {
    const [filtros, setFiltros] = useState<FiltroProps>({} as FiltroProps);

    const { data: filtrosData } = useQuery({
        queryKey: ["filtros"],
        queryFn: getFiltros,
    });
    const {
        data: materiais,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["materiais", filtros],
        queryFn: () => getMateriais(filtros),
        enabled: true,
    });

    const getMateriaisFiltrados = async (filtros: FiltroProps) => {
        setFiltros(filtros);
        try {
            await refetch();
        } catch (error) {
            console.error("Erro ao buscar materiais filtrados:", error);
            toast.error("Falha ao buscar materiais filtrados");
        }
    };

    const { isAuthenticated, logout, authChecked } = useAuth();

    useEffect(() => {
        if (authChecked && !isAuthenticated) {
            toast.error("Sessão expirada. Faça login novamente.", { duration: 3000 });
            logout();
        }
    }, [authChecked, isAuthenticated, logout]);

    return (
        <div className="px-9 mt-8 mb-8">
            <TitlePagina
                title="Acervo Digital Acessível"
                description="Materiais didáticos adaptados para diferentes necessidades"
            />

            <div className="space-y-2 w-full duplo-card:flex duplo-card:gap-4">
                <div className="duplo-card:hidden flex full-duplo-card:justify-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full full-duplo-card:max-w-[650px]">
                                <SlidersHorizontalIcon />
                                <p>Filtrar</p>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="bg-white">
                            <SheetHeader>
                                <SheetTitle asChild></SheetTitle>
                                <SheetDescription className="flex mt-3 items-center justify-center">
                                    <Filtros
                                        getMateriaisFiltrados={getMateriaisFiltrados}
                                        formato={filtrosData?.formato || []}
                                        areaConhecimento={filtrosData?.areaConhecimento || []}
                                    />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="hidden duplo-card:flex">
                    <Filtros
                        getMateriaisFiltrados={getMateriaisFiltrados}
                        formato={filtrosData?.formato || []}
                        areaConhecimento={filtrosData?.areaConhecimento || []}
                    />
                </div>
                <div className="flex gap-4 w-full flex-wrap full-duplo-card:items-center full-duplo-card:justify-center">
                    {isLoading ? (
                        <p>Carregando</p>
                    ) : (
                        materiais?.map((material) => <MaterialCard key={material.id} material={material} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default MaterialPage;
