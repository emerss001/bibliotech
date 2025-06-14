import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlunosResponse, ativarAluno, suspenderAluno } from "@/http/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookOpenIcon, LoaderCircleIcon, UserCheckIcon, UsersIcon, UserXIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TabelaAlunosProps {
    alunos: AlunosResponse[] | undefined;
    refetch: () => void;
}

const TabelaAlunos = ({ alunos, refetch }: TabelaAlunosProps) => {
    const queryClient = useQueryClient();
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const { mutate: suspender } = useMutation({
        mutationKey: ["suspender-aluno"],
        mutationFn: suspenderAluno,

        onSuccess: () => {
            toast.success("Aluno atualizado com sucesso!");
            refetch();
            queryClient.invalidateQueries({ queryKey: ["metricas-alunos"] });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast.error(`Erro ao atualizar material: ${error.response?.data?.message || error.message}`);
        },
    });

    const { mutate: ativar } = useMutation({
        mutationKey: ["ativar-aluno"],
        mutationFn: ativarAluno,

        onSuccess: () => {
            toast.success("Aluno atualizado com sucesso!");
            refetch();
            queryClient.invalidateQueries({ queryKey: ["metricas-alunos"] });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast.error(`Erro ao atualizar material: ${error.response?.data?.message || error.message}`);
        },
    });

    const handleSuspenderAluno = (suspenso: boolean, alunoId: number) => {
        setLoadingId(alunoId);

        if (suspenso) {
            ativar(alunoId, {
                onSettled: () => setLoadingId(null),
            });
        } else {
            suspender(alunoId, {
                onSettled: () => setLoadingId(null),
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <UsersIcon className="h-5 w-5 mr-2" />
                    Lista de Materiais ({alunos?.length || 0})
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Matrícula</TableHead>
                                <TableHead>Necessidade</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Empréstimos</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {alunos?.map((aluno) => (
                                <TableRow key={aluno.id}>
                                    <TableCell className="font-medium text-title">{aluno.nome}</TableCell>
                                    <TableCell className="text-muted-foreground">{aluno.email}</TableCell>
                                    <TableCell className="text-muted-foreground">{aluno.matricula}</TableCell>
                                    <TableCell className="text-muted-foreground max-w-[150px] truncate">
                                        {aluno.necessidade}
                                    </TableCell>

                                    <TableCell>
                                        {aluno.suspenso ? (
                                            <Badge className="bg-red-600">Suspenso</Badge>
                                        ) : (
                                            <Badge className="bg-green-600">Ativo</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-muted-foreground">
                                            <BookOpenIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                                            {aluno.emprestimosFinalizados} / {aluno.emprestimosTotatis}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {aluno.suspenso ? (
                                            <Button
                                                size="icon"
                                                className="w-full"
                                                onClick={() => handleSuspenderAluno(aluno.suspenso, aluno.id)}
                                                disabled={loadingId === aluno.id}
                                            >
                                                {loadingId === aluno.id ? (
                                                    <LoaderCircleIcon className="animate-spin" />
                                                ) : (
                                                    <>
                                                        <UserCheckIcon className="mr-2 h-4 w-4" />
                                                        Ativar Aluno
                                                    </>
                                                )}
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="w-full"
                                                onClick={() => handleSuspenderAluno(aluno.suspenso, aluno.id)}
                                                disabled={loadingId === aluno.id}
                                            >
                                                {loadingId === aluno.id ? (
                                                    <LoaderCircleIcon className="animate-spin" />
                                                ) : (
                                                    <>
                                                        <UserXIcon className="mr-2 h-4 w-4" />
                                                        Suspender Aluno
                                                    </>
                                                )}
                                            </Button>
                                        )}
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

export default TabelaAlunos;
