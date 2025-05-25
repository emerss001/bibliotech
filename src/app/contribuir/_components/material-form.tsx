"use client";

import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import getFiltros, { FiltroResponse } from "@/http/get-filtros";
import { useAuth } from "@/components/AuthContext";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircleIcon, UploadIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { criarMaterialDigital, CriarMaterialFisico } from "@/http/criar-material";

const formSchema = z
    .object({
        tipo: z.enum(["Físico", "Digital"]),
        titulo: z.string().min(3, { message: "Mínimo 3 caracteres" }),
        formato: z.string({ message: "Campo obrigatório" }),
        area: z.string({ message: "Campo obrigatório" }),
        nivel: z.enum(["Básico", "Intermediário", "Avançado"], { message: "Campo obrigatório" }),
        autor: z.string().min(3, { message: "Mínimo 3 caracteres" }),
        descricao: z.string({ message: "Campo obrigatório" }).max(150, { message: "Máximo 150 caracteres" }),
        capa: z
            .instanceof(File)
            .refine((file) => file.type.startsWith("image/"), "Apenas imagens são permitidas")
            .refine((file) => file.size <= 5 * 1024 * 1024, "A imagem deve ter no máximo 5MB")
            .nullable()
            .optional(),

        declaracao: z.boolean().refine((val) => val === true, { message: "Campo obrigatório" }),

        quantidade: z.coerce.number().min(1, { message: "Deve ter pelo menos um material" }).optional(),
        arquivo: z
            .instanceof(File)
            .refine((file) => file.size > 0, "O arquivo não pode estar vazio")
            .optional(),
    })
    .superRefine((data, ctx) => {
        if (data.tipo === "Digital" && !data.arquivo) {
            ctx.addIssue({
                path: ["arquivo"],
                message: "Campo obrigatório",
                code: z.ZodIssueCode.custom,
            });
        }

        if (data.tipo === "Físico" && !data.quantidade) {
            ctx.addIssue({
                path: ["quantidade"],
                message: "Campo obrigatório",
                code: z.ZodIssueCode.custom,
            });
        }
    });

const MaterialForm = () => {
    const router = useRouter();
    const { isAuthenticated, logout, authChecked } = useAuth();
    const [area, setArea] = useState<FiltroResponse[]>([]);
    const [formato, setFormato] = useState<FiltroResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tipo: "Digital",
            titulo: "",
            formato: undefined,
            area: undefined,
            nivel: undefined,
            autor: "",
            descricao: undefined,
            capa: null,
            arquivo: undefined,
            declaracao: false,
            quantidade: 1,
        },
    });

    useEffect(() => {
        if (authChecked && !isAuthenticated) {
            toast.error("Sessão expirada. Faça login novamente.", { duration: 3000 });
            logout();
        }
    }, [authChecked, isAuthenticated, logout]);

    useEffect(() => {
        async function getCatalogo() {
            const { formato, areaConhecimento } = await getFiltros();

            if (!formato || !areaConhecimento) {
                alert("Fudeo");
                return null;
            }

            setArea(areaConhecimento);
            setFormato(formato);
        }

        getCatalogo();
    }, []);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);
        setProgress(0);

        console.log("object");

        try {
            if (data.tipo === "Digital") {
                await criarMaterialDigital(data, (percent) => {
                    setProgress(percent);
                });
            } else {
                await CriarMaterialFisico(data);
            }

            toast.success("Material criado com sucesso");
            router.push("/material");
        } catch (error) {
            toast.error("Erro ao criar material");
            console.log(error);
        } finally {
            setLoading(false);
            setProgress(0);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Tabs defaultValue="Digital" className="w-full border-none" value={form.watch("tipo")}>
                    <TabsList className="grid grid-cols-2 w-full mb-6">
                        <TabsTrigger
                            value="Digital"
                            onClick={() => form.setValue("tipo", "Digital")}
                            className="data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                            Material Digital
                        </TabsTrigger>
                        <TabsTrigger
                            value="Físico"
                            onClick={() => form.setValue("tipo", "Físico")}
                            className="data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                            Material Físico
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="Digital" className="space-y-4">
                        <FormField
                            control={form.control}
                            name="titulo"
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <FormItem>
                                        <Label className="text-secondary-foreground">Título do material</Label>
                                        <FormControl>
                                            <Input
                                                id="titulo-digital"
                                                className="border focus:border-ring"
                                                {...field}
                                                placeholder="Ex: Anatomia Humana - Audiolivro"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <div className="flex justify-between">
                            <FormField
                                control={form.control}
                                name="formato"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <FormItem>
                                            <Label className="text-secondary-foreground">Formato do material</Label>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o formato" />
                                                    </SelectTrigger>
                                                    <SelectContent className="gap-4">
                                                        {formato.map((item) => (
                                                            <SelectItem key={item.id} value={item.id.toString()}>
                                                                {item.nome}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                            {/* TODO: Criar componente de select para os forms */}
                            <FormField
                                control={form.control}
                                name="area"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <FormItem>
                                            <Label className="text-secondary-foreground">Área de conhecimento</Label>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione a área de conhecimento" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {area.map((item) => (
                                                            <SelectItem key={item.id} value={item.id.toString()}>
                                                                {item.nome}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nivel"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <FormItem>
                                            <Label className="text-secondary-foreground">Nível</Label>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o nível" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Básico">Básico</SelectItem>
                                                        <SelectItem value="Intermediário">Intermediário</SelectItem>
                                                        <SelectItem value="Avançado">Avançado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="autor"
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <FormItem>
                                        <Label className="text-secondary-foreground">Autor/Criador</Label>
                                        <FormControl>
                                            <Input
                                                className="border focus:border-ring"
                                                {...field}
                                                placeholder="Nome do autor ou responsável pelo material"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="descricao"
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <FormItem>
                                        <Label className="text-secondary-foreground">Descrição do Material</Label>
                                        <FormControl>
                                            <Textarea
                                                className="border focus:border-ring"
                                                {...field}
                                                placeholder="Descreva o material, seu conteúdo e características de acessibilidade"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="arquivo"
                            render={({ field: { onChange, onBlur, name, ref } }) => (
                                <div className="space-y-2">
                                    <FormItem>
                                        <Label className="text-secondary-foreground">Arquivo do Material</Label>
                                        <div className="border-2 border-dashed border-muted-foreground rounded-lg p-6 text-center">
                                            <UploadIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Arraste e solte o arquivo aqui ou clique para selecionar
                                            </p>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="mx-auto max-w-xs border-input"
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files && e.target.files[0]
                                                                ? e.target.files[0]
                                                                : null;
                                                        onChange(file);
                                                    }}
                                                />
                                            </FormControl>
                                            <p className="text-xs text-primary mt-2">
                                                Formatos aceitos: PDF, DOCX, MP3, MP4, ZIP (máx. 500MB)
                                            </p>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="capa"
                            render={({ field: { onChange, onBlur, name, ref } }) => (
                                <div className="space-y-2">
                                    <FormItem>
                                        <Label className="text-secondary-foreground"> Imagem de Capa (opcional)</Label>
                                        <div className="border-2 border-dashed border-muted-foreground rounded-lg p-6 text-center">
                                            <UploadIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Arraste e solte a imagem aqui ou clique para selecionar{" "}
                                            </p>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="mx-auto max-w-xs border-input"
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files && e.target.files[0]
                                                                ? e.target.files[0]
                                                                : null;
                                                        onChange(file);
                                                    }}
                                                />
                                            </FormControl>
                                            <p className="text-xs text-primary mt-2">
                                                Formatos aceitos: JPG, PNG (máx. 5MB)
                                            </p>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                </div>
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
                                                <Label htmlFor="declaracao" className="text-sm text-muted-foreground">
                                                    Declaro que possuo os direitos necessários para compartilhar este
                                                    material e que ele está em conformidade com as diretrizes de
                                                    acessibilidade
                                                </Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="ml-6" />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {loading ? (
                            <div className="my-8">
                                <Progress value={progress} />
                            </div>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full bg-muted-foreground hover:bg-secondary-foreground"
                                disabled={loading}
                            >
                                Solicitar Cadastro
                            </Button>
                        )}
                    </TabsContent>

                    <TabsContent value="Físico" className="space-y-4">
                        <FormField
                            control={form.control}
                            name="titulo"
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <FormItem>
                                        <Label className="text-secondary-foreground">Título do material</Label>
                                        <FormControl>
                                            <Input
                                                id="titulo-digital"
                                                className="border focus:border-ring"
                                                {...field}
                                                placeholder="Ex: Anatomia Humana - Audiolivro"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <div className="flex justify-between">
                            <FormField
                                control={form.control}
                                name="formato"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <FormItem>
                                            <Label className="text-secondary-foreground">Formato do material</Label>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o formato" />
                                                    </SelectTrigger>
                                                    <SelectContent className="gap-4">
                                                        {formato.map((item) => (
                                                            <SelectItem key={item.id} value={item.id.toString()}>
                                                                {item.nome}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                            {/* TODO: Criar componente de select para os forms */}
                            <FormField
                                control={form.control}
                                name="area"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <FormItem>
                                            <Label className="text-secondary-foreground">Área de conhecimento</Label>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione a área de conhecimento" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {area.map((item) => (
                                                            <SelectItem key={item.id} value={item.id.toString()}>
                                                                {item.nome}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nivel"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <FormItem>
                                            <Label className="text-secondary-foreground">Nível</Label>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o nível" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Básico">Básico</SelectItem>
                                                        <SelectItem value="Intermediário">Intermediário</SelectItem>
                                                        <SelectItem value="Avançado">Avançado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                        </div>

                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="autor"
                                render={({ field }) => (
                                    <div className="space-y-2 w-full">
                                        <FormItem>
                                            <Label className="text-secondary-foreground">Autor/Criador</Label>
                                            <FormControl>
                                                <Input
                                                    className="border focus:border-ring"
                                                    {...field}
                                                    placeholder="Nome do autor ou responsável pelo material"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="quantidade"
                                render={({ field }) => (
                                    <div className="space-y-2 w-full max-w-[40%]">
                                        <FormItem>
                                            <Label className="text-secondary-foreground">Quantidade Disponível</Label>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    className="border focus:border-ring"
                                                    {...field}
                                                    placeholder="Quantidade de cópias"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="descricao"
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <FormItem>
                                        <Label className="text-secondary-foreground">Descrição do Material</Label>
                                        <FormControl>
                                            <Textarea
                                                className="border focus:border-ring"
                                                {...field}
                                                placeholder="Descreva o material, seu conteúdo e características de acessibilidade"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="capa"
                            render={({ field: { onChange, onBlur, name, ref } }) => (
                                <div className="space-y-2">
                                    <FormItem>
                                        <Label className="text-secondary-foreground"> Imagem de Capa (opcional)</Label>
                                        <div className="border-2 border-dashed border-muted-foreground rounded-lg p-6 text-center">
                                            <UploadIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Arraste e solte a imagem aqui ou clique para selecionar{" "}
                                            </p>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="mx-auto max-w-xs border-input"
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files && e.target.files[0]
                                                                ? e.target.files[0]
                                                                : null;
                                                        onChange(file);
                                                    }}
                                                />
                                            </FormControl>
                                            <p className="text-xs text-primary mt-2">
                                                Formatos aceitos: JPG, PNG (máx. 5MB)
                                            </p>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                </div>
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
                                                <Label htmlFor="declaracao" className="text-sm text-muted-foreground">
                                                    Declaro que possuo os direitos necessários para compartilhar este
                                                    material e que ele está em conformidade com as diretrizes de
                                                    acessibilidade
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
                            disabled={loading}
                        >
                            {loading ? <LoaderCircleIcon className="animate-spin" /> : "Solicitar Cadastro"}
                        </Button>
                    </TabsContent>
                </Tabs>
            </form>
        </Form>
    );
};

export default MaterialForm;
