"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderCircleIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cadastro } from "@/http/auth";
import { getNecessidades } from "@/http/catalo";

const formSchema = z
    .object({
        nome: z.string().min(3, { message: "Mínimo 3 caracteres" }),
        email: z.string().email({ message: "Email inválido" }),
        vinculo: z.enum(["ALUNO", "PROFESSOR", "BIBLIOTECARIO"], {
            required_error: "Selecione um tipo de usuário",
        }),
        senha: z.string().min(8, { message: "Mínimo 8 caracteres" }),
        senhaConfirmacao: z.string().min(8, { message: "Mínimo 8 caracteres" }),
        declaracao: z.boolean().refine((value) => value === true, {
            message: "Você deve aceitar os termos de uso",
        }),

        matricula: z.string().optional(),
        siap: z.string().optional(),
        codigo: z.string().optional(),
        idNecessidade: z.string().optional(),
    })
    .refine((data) => data.senha === data.senhaConfirmacao, {
        message: "As senhas devem ser iguais",
        path: ["senhaConfirmacao"],
    })
    .superRefine((data, ctx) => {
        if (data.vinculo === "BIBLIOTECARIO" && !data.codigo) {
            ctx.addIssue({
                path: ["codigo"],
                message: "Campo obrigatório para bibliotecários",
                code: z.ZodIssueCode.custom,
            });
        }
    })
    .superRefine((data, ctx) => {
        if (data.vinculo === "ALUNO" && !data.matricula) {
            ctx.addIssue({
                path: ["matricula"],
                message: "Campo obrigatório para alunos",
                code: z.ZodIssueCode.custom,
            });
        }

        if (data.vinculo === "PROFESSOR" && !data.siap) {
            ctx.addIssue({
                path: ["siap"],
                message: "Campo obrigatório para professores",
                code: z.ZodIssueCode.custom,
            });
        }

        if (data.vinculo === "ALUNO" && !data.idNecessidade) {
            ctx.addIssue({
                path: ["idNecessidade"],
                message: "Campo obrigatório para alunos",
                code: z.ZodIssueCode.custom,
            });
        }
    });

const CadastroForm = () => {
    const router = useRouter();
    const { data: necessidades } = useQuery({
        queryKey: ["necessidade"],
        queryFn: () => getNecessidades(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vinculo: "ALUNO",
            idNecessidade: "",
            nome: "",
            email: "",
            senha: "",
            senhaConfirmacao: "",
            declaracao: false,
            matricula: "",
            siap: "",
            codigo: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: cadastro,
        onSuccess: (result) => {
            toast.success(result.mensagem || "Cadastro realizado. Aguarde aprovação!");
            router.push("/");
        },
        onError: (error: Error) => {
            toast.error(error.message, { duration: 5000 });
        },
    });

    async function handleSubmit(data: z.infer<typeof formSchema>) {
        if (!data.idNecessidade) data.idNecessidade = String(0);
        mutate(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem>
                            <Label className="text-secondary-foreground">Nome completo</Label>
                            <FormControl>
                                <Input
                                    placeholder="Seu nome completo"
                                    className="border focus:border-ring"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <Label className="text-secondary-foreground">Email institucional</Label>
                            <FormControl>
                                <Input
                                    placeholder="seu.nome@email.edu.br"
                                    className="border focus:border-ring"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="vinculo"
                    render={({ field }) => (
                        <FormItem>
                            <Label className="text-secondary-foreground">Tipo de usuário</Label>
                            <FormControl>
                                <RadioGroup
                                    className="grid grid-cols-3 gap-2"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <div className="flex items-center justify-center space-x-2 border border-border rounded-md p-2 hover:bg-muted">
                                        <RadioGroupItem
                                            value="ALUNO"
                                            id="login-estudante"
                                            className="text-secondary-foreground"
                                        />
                                        <Label
                                            htmlFor="login-estudante"
                                            className="cursor-pointer text-secondary-foreground text-sm"
                                        >
                                            Estudante
                                        </Label>
                                    </div>

                                    <div className="flex items-center justify-center space-x-2 border border-border rounded-md p-2 hover:bg-muted">
                                        <RadioGroupItem
                                            value="PROFESSOR"
                                            id="login-professor"
                                            className="text-secondary-foreground"
                                        />
                                        <Label
                                            htmlFor="login-professor"
                                            className="cursor-pointer text-secondary-foreground text-sm"
                                        >
                                            Professor
                                        </Label>
                                    </div>

                                    <div className="flex items-center justify-center space-x-2 border border-border rounded-md p-2 hover:bg-muted">
                                        <RadioGroupItem
                                            value="BIBLIOTECARIO"
                                            id="login-bibliotecario"
                                            className="text-secondary-foreground"
                                        />
                                        <Label
                                            htmlFor="login-bibliotecario"
                                            className="cursor-pointer text-secondary-foreground text-sm"
                                        >
                                            Bibliotecário
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.watch("vinculo") === "BIBLIOTECARIO" && (
                    <FormField
                        control={form.control}
                        name="codigo"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-secondary-foreground">Código de acesso</Label>
                                <FormControl>
                                    <Input placeholder="Ex: 123456" className="border focus:border-ring" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {form.watch("vinculo") === "ALUNO" && (
                    <FormField
                        control={form.control}
                        name="matricula"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-secondary-foreground">Matrícula</Label>
                                <FormControl>
                                    <Input placeholder="Ex: 2024001" className="border focus:border-ring" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {form.watch("vinculo") === "PROFESSOR" && (
                    <FormField
                        control={form.control}
                        name="siap"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-secondary-foreground">SIAP</Label>
                                <FormControl>
                                    <Input placeholder="Ex: 123456" className="border focus:border-ring" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {form.watch("vinculo") === "ALUNO" && (
                    <FormField
                        control={form.control}
                        name="idNecessidade"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-secondary-foreground">Necessidade específica</Label>
                                <FormControl>
                                    <Select {...field} onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione sua necessidade específica" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {necessidades?.map((item) => (
                                                <SelectItem value={item.id.toString()} key={item.id}>
                                                    {item.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="senha"
                    render={({ field }) => (
                        <FormItem>
                            <Label className="text-secondary-foreground">Senha</Label>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    className="border focus:border-ring"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="senhaConfirmacao"
                    render={({ field }) => (
                        <FormItem>
                            <Label className="text-secondary-foreground">Senha</Label>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    className="border focus:border-ring"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="declaracao"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                            <div className="flex flex-col space-y-2">
                                <FormControl>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="declaracao"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label htmlFor="declaracao" className="text-xs text-secondary-foreground">
                                            Declaro que as informações fornecidas são verdadeiras e estou ciente que o
                                            acesso ao sistema é exclusivo para membros da comunidade acadêmica
                                        </Label>
                                    </div>
                                </FormControl>
                                <FormMessage className="ml-6" />
                            </div>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full bg-muted-foreground hover:bg-secondary-foreground"
                    disabled={isPending}
                >
                    {isPending ? <LoaderCircleIcon className="animate-spin" /> : "Solicitar Cadastro"}
                </Button>
            </form>
        </Form>
    );
};

export default CadastroForm;
