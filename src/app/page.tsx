"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenIcon, FileTextIcon, HeadphonesIcon, VideoIcon } from "lucide-react";

export default function Home() {
    return (
        <div>
            <section className="bg-muted-foreground text-white">
                <div className="flex py-16 w-full justify-center md:py-24">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">BiblioTech</h1>
                        <p className="text-xl max-w-[700px] text-border">
                            Sistema de biblioteca de materiais didáticos acessíveis
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" className="bg-white text-primary">
                                <Link href="/material">Explorar Acervo</Link>
                            </Button>
                            <Button asChild size="lg" className="bg-white text-primary">
                                <Link href="/auth/login">Acessar Sistema</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 text-muted-foreground">
                <div className="">
                    <div className="flex px-9 flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-title">
                                Sobre o BiblioTech Acessível
                            </h2>
                            <p className="mb-6">
                                O BiblioTech Acessível é um sistema desenvolvido para facilitar o acesso a materiais
                                didáticos adaptados para pessoas com diferentes necessidades.
                            </p>
                            <p className="mb-6">
                                Nossa plataforma reúne diversos tipos de materiais acessíveis, como audiolivros, textos
                                adaptados, vídeos com tradução em Libras e materiais em Braille, contribuindo para uma
                                educação mais inclusiva e equitativa.
                            </p>
                            <p className="mb-6">
                                Professores, bibliotecários e profissionais da educação podem colaborar adicionando
                                novos materiais, enquanto estudantes podem acessar, emprestar e avaliar os recursos
                                disponíveis.
                            </p>
                            <Button asChild variant="outline" className="">
                                <Link href="/sobre">Saiba Mais</Link>
                            </Button>
                        </div>
                        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
                            <div className="aspect-video relative rounded-md overflow-hidden">
                                <Image
                                    src="/image 1.png"
                                    alt="Estudantes utilizando materiais acessíveis"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-sm text-center mt-2">Acesso a materiais adaptados para todos</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 px-9">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-title">Acervo Acessível</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="transition-colors">
                        <CardHeader className="pb-2">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                                <BookOpenIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <CardTitle className="text-title">Materiais em Braille</CardTitle>
                            <CardDescription>Livros e apostilas em formato braille</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-accent-foreground">
                                Acesse nossa coleção de materiais impressos em braille para diversas disciplinas e áreas
                                do conhecimento.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href="/material">
                                    <p className="text-write">Ver materiais</p>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="transition-colors">
                        <CardHeader className="pb-2">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                                <HeadphonesIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <CardTitle className="text-title">Audiolivros</CardTitle>
                            <CardDescription>Conteúdos em formato de áudio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-accent-foreground">
                                Livros, artigos e materiais didáticos, disponíveis para download ou streaming.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href="/material">
                                    <p className="text-write">Ver materiais</p>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="transition-colors">
                        <CardHeader className="pb-2">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                                <VideoIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <CardTitle className="text-title">Vídeos em Libras</CardTitle>
                            <CardDescription>Conteúdos com tradução em Libras</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-accent-foreground">
                                Videoaulas, palestras e materiais didáticos com tradução em Língua Brasileira de Sinais.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href="/material">
                                    <p className="text-write">Ver materiais</p>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="transition-colors">
                        <CardHeader className="pb-2">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                                <FileTextIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <CardTitle className="text-title">Textos Adaptados</CardTitle>
                            <CardDescription>Materiais com leitura facilitada</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-accent-foreground">
                                Textos acadêmicos adaptados com linguagem simplificada, fonte ampliada e alto contraste.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href="/material">
                                    <p className="text-write">Ver materiais</p>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            <section className="py-12 px-9">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-title">Como Funciona</h2>
                    <p className="text-muted-foreground mb-8">
                        O BiblioTech Acessível foi desenvolvido para facilitar o acesso a materiais didáticos adaptados:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-write p-6 rounded-lg border">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                                <span className="font-bold">1</span>
                            </div>
                            <h3 className="font-medium text-secondary-foreground mb-2">Acesso</h3>
                            <p className="text-sm text-accent-foreground">
                                Faça login com suas credenciais para acessar o sistema
                            </p>
                        </div>

                        <div className="bg-write p-6 rounded-lg border">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                                <span className="font-bold">2</span>
                            </div>
                            <h3 className="font-medium text-secondary-foreground mb-2">Busca</h3>
                            <p className="text-sm text-accent-foreground">
                                Encontre materiais por tipo, assunto ou área de conhecimento
                            </p>
                        </div>

                        <div className="bg-write p-6 rounded-lg border">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                                <span className="font-bold">3</span>
                            </div>
                            <h3 className="font-medium text-secondary-foreground mb-2">Utilização</h3>
                            <p className="text-sm text-accent-foreground">
                                Baixe, empreste ou acesse online os materiais disponíveis
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 px-9">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-title">Nosso time de desenvolvedores</h2>
                    <p className="text-muted-foreground mb-8">
                        Conheça a equipe responsável pelo desenvolvimento e manutenção do BiblioTech Acessível
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* desenvolvedor 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-muted-foreground shadow-lg">
                                <Image
                                    src="/devs/emerson.png"
                                    alt="Desenvolvedor Emerson Neves"
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-faculdade-900 mb-1">Emerson Neves</h3>
                        </div>

                        {/* desenvolvedor 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-muted-foreground shadow-lg">
                                <Image
                                    src="/devs/denilson.png"
                                    alt="Desenvolvedor Emerson Neves"
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-faculdade-900 mb-1">Denilson Lima</h3>
                        </div>

                        {/* desenvolvedor 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-muted-foreground shadow-lg">
                                <Image
                                    src="/devs/emerson.png"
                                    alt="Desenvolvedor Emerson Neves"
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-faculdade-900 mb-1">Luís Felipe Teles</h3>
                        </div>

                        {/* desenvolvedor 4 */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-muted-foreground shadow-lg">
                                <Image
                                    src="/devs/emerson.png"
                                    alt="Desenvolvedor Emerson Neves"
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-faculdade-900 mb-1">Andé de Souza</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
