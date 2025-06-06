"use client";

import { useParams } from "next/navigation";
import MaterialDetalhes from "./_componentes/material-detalhes";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMaterialDetails } from "@/http/material";

const MaterialDetailsPage = () => {
    const { id } = useParams();
    const { data: material, isLoading } = useQuery({
        queryKey: ["materialDetails", id],
        queryFn: () => getMaterialDetails(Number(id)),
    });

    const { isAuthenticated, logout, authChecked } = useAuth();

    useEffect(() => {
        if (authChecked && !isAuthenticated) {
            toast.error("Sessão expirada. Faça login novamente.", { duration: 3000 });
            logout();
        }
    }, [authChecked, isAuthenticated, logout]);

    if (isLoading && !material) {
        return (
            <div className="flex flex-col items-center justify-center flex-1 min-h-full py-12">
                <h1 className="font-semibold text-4xl text-secondary-foreground mb-6">Carregando...</h1>
            </div>
        );
    }

    if (!material) {
        return (
            <div className="flex flex-col items-center justify-center flex-1 min-h-full py-12">
                <h1 className="font-semibold text-4xl text-secondary-foreground mb-6">Não Encontrado</h1>
                <p className="text-secondary-foreground mb-2">
                    Este material infelizmente não foi encontrado em nosso sistema
                </p>
                <p className="text-sm">Que tal voltar ao acervo e dar mais uma olhada?</p>
                <Link href="/material">
                    <Button className="mt-4">
                        <ArrowLeft size={16} className="mr-2" />
                        Voltar ao acervo
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="px-9">
            <div className="">{material && <MaterialDetalhes material={material} />}</div>
        </div>
    );
};

export default MaterialDetailsPage;
