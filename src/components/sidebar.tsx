"use client";

import { BookOpen, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { useAuth } from "./AuthContext";

const Sidebar = () => {
    const { userEmail, isAuthenticated, authChecked } = useAuth();

    return (
        <header className="flex justify-between mb-3 absolute top-0 z-50 w-full border-b backdrop-blur px-9 py-4">
            <Link href="/" className="flex items-center gap-2">
                <BookOpen size={24} className="text-primary" />
                <p className="text-xl font-bold">BiblioTech UNIF</p>
            </Link>

            {/* Menu visível apenas em telas maiores (sm+) */}
            <div className="hidden sm:flex items-center gap-4">
                <Button variant="ghost">Acervo</Button>
                <Button variant="ghost">Contribuir</Button>
                <Button variant="ghost">Empréstimos</Button>
                {authChecked && isAuthenticated && userEmail && (
                    <Avatar>
                        <AvatarFallback>{userEmail.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                )}
            </div>

            <Sheet>
                <SheetTrigger className="sm:hidden">
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent className="bg-white">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                        <SheetDescription className="flex flex-col gap-2">
                            <Button variant="ghost">Minha conta</Button>
                            <Button variant="ghost">Acervo</Button>
                            <Button variant="ghost">Contribuir</Button>
                            <Button variant="ghost">Empréstimos</Button>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </header>
    );
};

export default Sidebar;
