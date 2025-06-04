"use client";

import { BookOpen, LogOutIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import { getVinculo } from "@/util/getVinculo";

const Sidebar = () => {
    const { userEmail, isAuthenticated, authChecked, logout } = useAuth();
    const { vinculo } = getVinculo();

    return (
        <header className="flex justify-between top-0 w-full border-b backdrop-blur px-9 py-4">
            <Link href="/" className="flex items-center gap-2">
                <BookOpen size={24} className="text-primary" />
                <p className="text-xl font-bold">BiblioTech UNIF</p>
            </Link>

            {vinculo === "Aluno" && (
                <>
                    <div className="hidden sm:flex items-center gap-4">
                        <Link href="/material">
                            <Button variant="ghost">Acervo</Button>
                        </Link>
                        <Link href="/emprestimos">
                            <Button variant="ghost">Empréstimos</Button>
                        </Link>
                        {authChecked && isAuthenticated && userEmail && (
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarFallback>{userEmail.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <Button variant="ghost" onClick={() => logout()} className="flex items-center gap-1">
                                    <LogOutIcon size={12} />
                                    <p>sair</p>
                                </Button>
                            </div>
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
                </>
            )}

            {vinculo === "Professor" && (
                <>
                    <div className="hidden sm:flex items-center gap-4">
                        <Link href="/material">
                            <Button variant="ghost">Acervo</Button>
                        </Link>
                        <Link href="/contribuir">
                            <Button variant="ghost">Contribuir</Button>
                        </Link>
                        {authChecked && isAuthenticated && userEmail && (
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarFallback>{userEmail.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <Button variant="ghost" onClick={() => logout()} className="flex items-center gap-1">
                                    <LogOutIcon size={12} />
                                    <p>sair</p>
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {vinculo === "Bibliotecario" && (
                <>
                    <div className="hidden sm:flex items-center gap-4">
                        <Link href="/material">
                            <Button variant="ghost">Acervo</Button>
                        </Link>
                        <Link href="/contribuir">
                            <Button variant="ghost">Contribuir</Button>
                        </Link>
                        <Link href="/admin">
                            <Button variant="ghost">Painél administrativo</Button>
                        </Link>
                        {authChecked && isAuthenticated && userEmail && (
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarFallback>{userEmail.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <Button variant="ghost" onClick={() => logout()} className="flex items-center gap-1">
                                    <LogOutIcon size={12} />
                                    <p>sair</p>
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </header>
    );
};

export default Sidebar;
