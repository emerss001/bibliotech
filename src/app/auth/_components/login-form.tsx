import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import login from "@/http/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    vinculo: z.enum(["ALUNO", "PROFESSOR", "BIBLIOTECARIO"], {
        required_error: "Selecione um tipo de usuário",
    }),
    identificador: z.string().min(3, { message: "Mínimo 3 caracteres" }),
    senha: z.string().min(8, { message: "Mínimo 8 caracteres" }),
});

const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vinculo: "ALUNO",
            identificador: "",
            senha: "",
        },
    });

    async function handleSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);
        const result = await login(data);

        if (result.error) {
            setLoading(false);
            toast.error("Erro ao fazer login: " + result.error, { duration: 5000 });
            setLoading(false);
            return;
        }

        toast.success("Login realizado com sucesso!", { duration: 5000 });
        localStorage.setItem("token", result.token!);

        router.push("/");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

                <FormField
                    control={form.control}
                    name="identificador"
                    render={({ field }) => (
                        <FormItem>
                            <Label className="text-secondary-foreground">
                                {form.watch("vinculo") === "ALUNO" ? "Matrícula" : "SIAP"}
                            </Label>
                            <FormControl>
                                <Input
                                    placeholder={
                                        form.watch("vinculo") === "ALUNO" ? "Digite sua matrícula" : "Digite seu SIAPE"
                                    }
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
                    name="senha"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between">
                                <Label className="text-secondary-foreground">Senha</Label>
                                <Link
                                    href="#"
                                    className="text-xs text-primary hover:text-secondary-foreground hover:underline"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>
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

                <Button
                    type="submit"
                    className="w-full bg-muted-foreground hover:bg-secondary-foreground"
                    disabled={loading}
                >
                    {loading ? <LoaderCircleIcon className="animate-spin" /> : "Entrar"}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
