import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { excluirMaterial, listarMaterial, MateriaisResponse, ocultarMaterial } from "@/http/admin";
import { useMutation } from "@tanstack/react-query";
import {
    BookOpenIcon,
    CalendarIcon,
    CircleCheckBigIcon,
    CircleSlash2Icon,
    DownloadIcon,
    EditIcon,
    EyeIcon,
    MoreHorizontalIcon,
    StarIcon,
    Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface TabelaMateriaisProps {
    materiais: MateriaisResponse[] | undefined;
    refetch: () => void;
}

const TabelaMateriais = ({ materiais, refetch }: TabelaMateriaisProps) => {
    const router = useRouter();
    const { mutate: excluir } = useMutation({
        mutationKey: ["excluir-material"],
        mutationFn: excluirMaterial,
        onSuccess: () => {
            toast.success("Material excluído com sucesso!");
            refetch();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast.error(`Erro ao excluir material: ${error.response?.data?.message || error.message}`);
        },
    });
    const { mutate: ocultar } = useMutation({
        mutationKey: ["ocultar-material"],
        mutationFn: ocultarMaterial,
        onSuccess: () => {
            toast.success("Material atualizado com sucesso!");
            refetch();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast.error(`Erro ao atualizar material: ${error.response?.data?.message || error.message}`);
        },
    });
    const { mutate: listar } = useMutation({
        mutationKey: ["listar-material"],
        mutationFn: listarMaterial,
        onSuccess: () => {
            toast.success("Material atualizado com sucesso!");
            refetch();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast.error(`Erro ao atualizar material: ${error.response?.data?.message || error.message}`);
        },
    });

    const handleExcluirMaterial = (id: number) => {
        excluir(id);
    };

    const handleAlterarVisibilidade = (id: number, listado: boolean) => {
        if (listado) {
            ocultar(id);
        } else {
            listar(id);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BookOpenIcon className="h-5 w-5 mr-2" />
                    Lista de Materiais ({materiais?.length || 0})
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Material</TableHead>
                                <TableHead>Formato</TableHead>
                                <TableHead>Área</TableHead>
                                <TableHead>Autor</TableHead>
                                <TableHead>Avaliação</TableHead>
                                <TableHead>Usado</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materiais?.map((material) => (
                                <TableRow key={material.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={material.capa || "/capa-placeholder.png"}
                                                    alt="Capa do material"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-title">{material.titulo}</p>
                                                <p className="text-xs text-primary">
                                                    Cadastrado em: {material.adicionado}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="truncate">
                                            {material.formato.name}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{material.area.name}</TableCell>
                                    <TableCell>{material.autor}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                            <span className="text-faculdade-900">
                                                {new Intl.NumberFormat("en-US", {
                                                    minimumFractionDigits: 1,
                                                    maximumFractionDigits: 1,
                                                }).format(material.nota || 0)}
                                            </span>
                                            <span className="text-xs text-faculdade-500 ml-1">
                                                ({material.quantidadeAvaliacoes})
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-2">
                                        {material.tipo === "Fisico" ? (
                                            <div className="flex items-center">
                                                <CalendarIcon className="h-4 w-4 mr-1 text-faculdade-500" />
                                                {material.uso} empréstimos
                                            </div>
                                        ) : (
                                            <div className="flex items-center ">
                                                <DownloadIcon className="h-4 w-4 mr-1 text-faculdade-500" />
                                                {material.uso} downloads
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {material.listado ? (
                                            <Badge>Listado</Badge>
                                        ) : (
                                            <Badge variant="destructive">Oculto</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Abrir menu</span>
                                                    <MoreHorizontalIcon className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    onClick={() => router.push(`/material/${material.id}`)}
                                                >
                                                    <EyeIcon className="mr-2 h-4 w-4" />
                                                    Ver Detalhes
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <EditIcon className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleAlterarVisibilidade(material.id, material.listado)
                                                    }
                                                    className={material.listado ? "text-red-600" : "text-green-600"}
                                                >
                                                    {material.listado ? (
                                                        <>
                                                            <CircleSlash2Icon />
                                                            Ocultar Material
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CircleCheckBigIcon />
                                                            Listar Material
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                {material.tipo === "Digital" && (
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem
                                                                onSelect={(e) => e.preventDefault()}
                                                                className="text-red-600"
                                                            >
                                                                <Trash2Icon className="mr-2 h-4 w-4" />
                                                                Excluir
                                                            </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className="bg-white">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Tem certeza que deseja excluir o material{" "}
                                                                    <strong>{material.titulo}</strong>? Esta ação não
                                                                    pode ser desfeita e todos os dados do material serão
                                                                    perdidos.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleExcluirMaterial(material.id)}
                                                                    className="bg-red-600 hover:bg-red-700"
                                                                >
                                                                    Excluir
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default TabelaMateriais;
