import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import criarAvaliacao from "@/http/criar-avaliacao";
import getAvaliacoes, { AvaliacaoResponse } from "@/http/get-avaliacoes";
import { MaterialDetailsResponse } from "@/http/get-material-details";
import { CalendarIcon, CheckIcon, DownloadIcon, FileTextIcon, Star, StarIcon, UserIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MaterialDetalhesProps {
    material: MaterialDetailsResponse;
}

const MaterialDetalhes = ({ material }: MaterialDetalhesProps) => {
    const [rating, setRating] = useState(0);
    const [avaliacoes, setAvaliacoes] = useState<AvaliacaoResponse[]>([]);
    const [comentario, setComentario] = useState("");

    const handleRating = (value: number) => {
        setRating(value);
    };

    const handleAvaliar = async (materialId: number) => {
        const data = {
            materialId: materialId,
            nota: rating,
            avaliacao: comentario,
        };

        try {
            await criarAvaliacao(data);
            setRating(0);
            setComentario("");
        } catch (error) {
            console.error("Erro ao enviar avaliação:", error);
        } finally {
            getAvalaliacoes(materialId);
        }
    };

    const getAvalaliacoes = async (idMaterial: number) => {
        const result = await getAvaliacoes(idMaterial);
        setAvaliacoes(result);
    };

    return (
        <div className="container py-8">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Coluna da Esquerda - Imagem */}
                    <div className="p-6 border-r border-border flex flex-col space-y-4">
                        <div className="flex ite justify-between">
                            <Badge>{material.formato}</Badge>
                            <Badge variant="outline">{material.tipo}</Badge>
                        </div>

                        <div className="relative aspect-[3/4] w-full mb-4 rounded-md overflow-hidden shadow-sm">
                            <Image alt="Capa do material" src="/capa-placeholder.png" fill className="object-cover" />
                        </div>

                        <h1 className="text-center font-bold text-lg text-title">Avaliação</h1>
                        <div className="flex items-center justify-center mt-2 mb-4">
                            <div className="flex items-center mr-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        className={`h-5 w-5 ${
                                            star <= Math.floor(material.nota) ? "text-star fill-star" : "text-gray-400"
                                        }`}
                                    />
                                ))}
                            </div>

                            <p className="ftext-lg font-bold text-secondary-foreground">
                                {new Intl.NumberFormat("en-US", {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                }).format(material.nota)}
                            </p>
                            <span className="text-sm text-primary ml-1">({material.quantidadeAvaliacoes})</span>
                        </div>
                        <Button className="w-full mt-6">
                            {material.tipo === "Digital" ? (
                                <>
                                    <DownloadIcon />
                                    Fazer download
                                </>
                            ) : (
                                <>
                                    <CalendarIcon />
                                    Solicitar empréstimo
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Coluna Central - Informações e Descrição */}
                    <div className="lg:col-span-2 p-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-title mb-4 leading-tight">
                            {material.titulo}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-rootbackground p-4 rounded-lg">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <UserIcon size={16} className="text-primary" />
                                    <p className="text-secondary-foreground text-sm">Autor: {material.autor}</p>
                                </div>
                                {material.tipo === "Fisico" && (
                                    <div className="flex items-center gap-2">
                                        {material.disponibilidade ? (
                                            <>
                                                <CheckIcon size={16} className="text-primary" />
                                                <p className="text-secondary-foreground text-sm">Disponível: Sim</p>
                                            </>
                                        ) : (
                                            <>
                                                <XIcon size={16} className="text-primary" />
                                                <p className="text-secondary-foreground text-sm">Disponível: Não</p>
                                            </>
                                        )}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <FileTextIcon size={16} className="text-primary" />
                                    <p className="text-secondary-foreground text-sm">
                                        Adicionado em: {material.dataCadastro}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Tabs defaultValue="descricao" className="mt-6 w-full">
                            <TabsList className="grid grid-cols-2 w-full mb-6">
                                <TabsTrigger
                                    value="descricao"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                                >
                                    Descrição
                                </TabsTrigger>
                                <TabsTrigger
                                    onClick={() => getAvalaliacoes(material.id)}
                                    value="avaliacoes"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                                >
                                    Avaliações
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="descricao" className="space-y-4">
                                <div className="bg-white rounded-lg border border-primary p-5">
                                    <h2 className="text-xl font-semibold text-title mb-3 flex items-center">
                                        <FileTextIcon className="h-5 w-5 mr-2 text-primary" />
                                        Sobre este material
                                    </h2>
                                    <p className="text-secondary-foreground leading-relaxed">{material.descricao}</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="avaliacoes">
                                <div className="space-y-4">
                                    {avaliacoes.map((avaliacao) => (
                                        <div
                                            className="p-4 bg-white rounded-lg border border-primary"
                                            key={avaliacao.id}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-medium text-title flex items-center">
                                                        <UserIcon className="h-4 w-4 mr-2 text-primary" />
                                                        {avaliacao.aluno}
                                                    </h4>
                                                    <div className="flex items-center mt-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                className={`h-4 w-4 ${
                                                                    star <= Math.floor(avaliacao.nota)
                                                                        ? "text-yellow-500 fill-yellow-500"
                                                                        : "text-gray-300"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-primary bg-muted px-2 py-1 rounded">
                                                    {new Intl.DateTimeFormat("pt-BR", {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                    }).format(new Date(avaliacao.data))}
                                                </span>
                                            </div>
                                            <p className="text-sm text-secondary-foreground mt-3">
                                                {avaliacao.avaliacao}
                                            </p>
                                        </div>
                                    ))}

                                    <Button className="flex justify-center">Ver Todas as Avaliações</Button>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Avaliar material */}
                        <div className="mt-8 bg-rootbackground rounded-lg border border-primary p-5">
                            <h2 className="text-lg font-semibold text-title mb-3 flex items-center">
                                <Star className="h-5 w-5 mr-2 text-primary" />
                                Avalie este material
                            </h2>
                            <div className="flex items-center mb-4">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        onClick={() => handleRating(value)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`h-6 w-6 ${
                                                value <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                            } transition-colors duration-200 hover:text-yellow-400`}
                                        />
                                    </button>
                                ))}
                            </div>
                            <Textarea
                                className="mb-4 border-primary focus-visible:ring-faculdade-500"
                                placeholder="Compartilhe sua experiência com este material..."
                                rows={3}
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                            />
                            <Button
                                className="w-full"
                                disabled={rating === 0}
                                onClick={() => handleAvaliar(material.id)}
                            >
                                Enviar Avaliação
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialDetalhes;
