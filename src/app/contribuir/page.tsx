"use client";

import TitlePagina from "@/components/title-pagina";
import MaterialForm from "./_components/material-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ContribuirPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <TitlePagina
                        title="Contribuir com o Acervo"
                        description="Adicione um novo material acessível ao acervo do BiblioTech"
                    />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-title">Cadastro de Material</CardTitle>
                        <CardDescription>
                            Preencha os dados do material acessível que deseja adicionar ao acervo
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <MaterialForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ContribuirPage;
