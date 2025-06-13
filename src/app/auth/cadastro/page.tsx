"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import CadastroForm from "../_components/cadastro-form";

const Cadastro = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center overflow-x-hidden overflow-y-auto">
            <div className="flex flex-col justify-center items-center">
                <BookOpen size={48} className="text-primary mb-4" />
                <h2 className="text-2xl font-semibold text-secondary-foreground mb-2">Acervo Inclusivo</h2>
                <p className="text-base text-primary">Sistema de Biblioteca de Materiais Didáticos Acessíveis</p>
            </div>

            <Card className="space-y-1 mt-7 mb-7 w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-secondary-foreground">Acesso ao sistema</CardTitle>
                    <CardDescription>Solicite seu cadastro no Sistema de Biblioteca Acessível</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <CadastroForm />
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-center text-xs text-primary">
                        Já tem uma conta?{" "}
                        <Link
                            href="/auth/login"
                            className="text-xs text-secondary-foreground hover:text-secondary-foreground hover:underline"
                        >
                            Faça seu acesso
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Cadastro;
