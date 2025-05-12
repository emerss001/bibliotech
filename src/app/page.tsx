"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        window.location.href = "/";
    };
    return (
        <div className="">
            {token ? (
                <div>
                    <p>Você está autenticado</p>
                    <div>
                        <Button onClick={() => handleLogout()}>Sair</Button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Você não está logado</p>
                    <Button onClick={() => router.push("/auth/login")}>Fazer login</Button>
                </div>
            )}
        </div>
    );
}
