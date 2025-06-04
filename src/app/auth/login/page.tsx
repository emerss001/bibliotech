"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import LoginForm from "../_components/login-form";

const Login = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center overflow-x-hidden overflow-y-auto">
            <div className="flex flex-col justify-center items-center">
                <BookOpen size={48} className="text-primary mb-4" />
                <h2 className="text-2xl font-semibold text-secondary-foreground mb-2">BiblioTech Acessível</h2>
                <p className="text-base text-primary">Sistema de Biblioteca de Materiais Didáticos Acessíveis</p>
            </div>

            <Card className="pace-y-1 mt-7 mb-7 w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-secondary-foreground">Acesso ao sistema</CardTitle>
                    <CardDescription>Entre com suas credenciais</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <LoginForm />
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-center text-xs text-primary">
                        Primeiro acesso?{" "}
                        <Link
                            href="/auth/cadastro"
                            className="text-xs text-secondary-foreground hover:text-secondary-foreground hover:underline"
                        >
                            Faça seu cadastro
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
