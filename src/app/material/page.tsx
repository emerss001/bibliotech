"use client";

import TitlePagina from "@/components/title-pagina";
import Filtros from "./_componentes/filtro";
import { useEffect, useState } from "react";
import getFiltros, { FiltroResponse } from "@/http/get-filtros";
import MaterialCard from "./_componentes/material-card";
import getMateriais, { FiltroProps, MaterialResponse } from "@/http/get-materiais";
import { useAuth } from "@/components/AuthContext";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontalIcon } from "lucide-react";

const MaterialPage = () => {
    const { isAuthenticated, logout, authChecked } = useAuth();
    const [materiais, setMateriais] = useState<MaterialResponse[]>([]);
    const [formato, setFormato] = useState<FiltroResponse[]>([]);
    const [areaConhecimento, setAreaConhecimento] = useState<FiltroResponse[]>([]);
    console.log(isAuthenticated);

    useEffect(() => {
        if (authChecked && !isAuthenticated) {
            toast.error("Sessão expirada. Faça login novamente.", { duration: 3000 });
            logout();
        }
    }, [authChecked, isAuthenticated, logout]);

    const getMateriaisFiltrados = async (filtros: FiltroProps) => {
        try {
            const materiaisFiltrados = await getMateriais(filtros, 0);
            setMateriais(materiaisFiltrados);
        } catch (error) {
            console.error("Erro ao buscar materiais filtrados:", error);
        }
    };

    useEffect(() => {
        const fetchFiltros = async () => {
            try {
                const { formato, areaConhecimento } = await getFiltros();
                setFormato(formato);
                setAreaConhecimento(areaConhecimento);
            } catch (error) {
                console.error("Erro ao buscar filtros:", error);
            }
        };

        Promise.all([fetchFiltros(), getMateriaisFiltrados({} as FiltroProps)]);
    }, []);

    return (
        <div className="px-9 mt-8">
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
                                        formato={formato}
                                        areaConhecimento={areaConhecimento}
                                    />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="hidden duplo-card:flex">
                    <Filtros
                        getMateriaisFiltrados={getMateriaisFiltrados}
                        formato={formato}
                        areaConhecimento={areaConhecimento}
                    />
                </div>
                <div className="flex gap-4 w-full flex-wrap full-duplo-card:justify-center">
                    {materiais.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MaterialPage;
