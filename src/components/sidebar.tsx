"use client";

import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
interface DecodedToken {
    sub: string;
}

const Sidebar = () => {
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const decoded = jwtDecode<DecodedToken>(storedToken);
                setUserEmail(decoded.sub);
            } catch (error) {
                console.error("Erro ao decodificar token:", error);
                setUserEmail(null);
            }
        }
    }, []);

    return (
        <header className="flex justify-between mb-3 sticky top-0 z-50 w-full border-b backdrop-blur px-12 py-4">
            <Link href="/" className="flex items-center gap-2">
                <BookOpen size={24} className="text-primary" />
                <p className="text-xl font-bold">BiblioTech UNIF</p>
            </Link>
            <div>
                <Button variant="ghost">Acervo</Button>
                <Button variant="ghost">Contribuir</Button>
                <Button variant="ghost">Empréstimos</Button>
            </div>
            {userEmail ? (
                <div>
                    <Avatar>
                        <AvatarFallback>{userEmail.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
            ) : null}
        </header>
    );
};

export default Sidebar;
