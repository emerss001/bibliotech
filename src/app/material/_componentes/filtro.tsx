"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { FiltroResponse } from "@/http/get-filtros";
import { FiltroProps } from "@/http/get-materiais";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FiltrosPageProps {
    formato: FiltroResponse[];
    areaConhecimento: FiltroResponse[];
    getMateriaisFiltrados: (data: FiltroProps) => void;
}

const formSchema = z.object({
    tipo: z.array(z.string()).optional(),
    formato: z.array(z.number()).optional(),
    area: z.array(z.number()).optional(),
    nivel: z.array(z.string()).optional(),
});

const Filtros = ({ formato, areaConhecimento, getMateriaisFiltrados }: FiltrosPageProps) => {
    const tipoOptions = ["Digital", "Físico"];
    const nivelOptions = ["Básico", "Intermediário", "Avançado"];
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tipo: [],
            formato: [],
            area: [],
            nivel: [],
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        getMateriaisFiltrados(data);
    };

    return (
        <Card className="min-w-64 self-start w-full">
            <CardHeader>
                <CardTitle className="font-semibold text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Accordion type="single" collapsible>
                            <FormField
                                control={form.control}
                                name="tipo"
                                render={({ field }) => (
                                    <FormItem>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="font-medium text-base text-title">
                                                Tipo do material
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-2">
                                                {tipoOptions.map((option) => (
                                                    <FormControl key={option}>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={option}
                                                                checked={field.value?.includes(option)}
                                                                onCheckedChange={(checked) => {
                                                                    const updated = checked
                                                                        ? [...(field.value || []), option]
                                                                        : (field.value || []).filter(
                                                                              (v) => v !== option
                                                                          );
                                                                    field.onChange(updated);
                                                                }}
                                                            />
                                                            <Label
                                                                htmlFor={option}
                                                                className="font-normal text-sm text-secondary-foreground"
                                                            >
                                                                {option}
                                                            </Label>
                                                        </div>
                                                    </FormControl>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nivel"
                                render={({ field }) => (
                                    <FormItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger className="font-medium text-base text-title">
                                                Nível do material
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-2">
                                                {nivelOptions.map((option) => (
                                                    <FormControl key={option}>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={option}
                                                                checked={field.value?.includes(option)}
                                                                onCheckedChange={(checked) => {
                                                                    const updated = checked
                                                                        ? [...(field.value || []), option]
                                                                        : (field.value || []).filter(
                                                                              (v) => v !== option
                                                                          );
                                                                    field.onChange(updated);
                                                                }}
                                                            />
                                                            <Label
                                                                htmlFor={option}
                                                                className="font-normal text-sm text-secondary-foreground"
                                                            >
                                                                {option}
                                                            </Label>
                                                        </div>
                                                    </FormControl>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="formato"
                                render={({ field }) => (
                                    <FormItem>
                                        <AccordionItem value="item-3">
                                            <AccordionTrigger className="font-medium text-base text-title">
                                                Formato do material
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-2">
                                                {formato.map((option) => (
                                                    <FormControl key={option.id}>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={option.id.toString()}
                                                                checked={field.value?.includes(option.id)}
                                                                onCheckedChange={(checked) => {
                                                                    const updated = checked
                                                                        ? [...(field.value || []), option.id]
                                                                        : (field.value || []).filter(
                                                                              (v) => v !== option.id
                                                                          );
                                                                    field.onChange(updated);
                                                                }}
                                                            />
                                                            <Label
                                                                htmlFor={option.id.toString()}
                                                                className="font-normal text-sm text-secondary-foreground"
                                                            >
                                                                {option.nome}
                                                            </Label>
                                                        </div>
                                                    </FormControl>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="area"
                                render={({ field }) => (
                                    <FormItem>
                                        <AccordionItem value="item-4">
                                            <AccordionTrigger className="font-medium text-base text-title">
                                                Área de conhecimento
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-2">
                                                {areaConhecimento.map((option) => (
                                                    <FormControl key={option.id}>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={option.id.toString()}
                                                                checked={field.value?.includes(option.id)}
                                                                onCheckedChange={(checked) => {
                                                                    const updated = checked
                                                                        ? [...(field.value || []), option.id]
                                                                        : (field.value || []).filter(
                                                                              (v) => v !== option.id
                                                                          );
                                                                    field.onChange(updated);
                                                                }}
                                                            />
                                                            <Label
                                                                htmlFor={option.id.toString()}
                                                                className="font-normal text-sm text-secondary-foreground"
                                                            >
                                                                {option.nome}
                                                            </Label>
                                                        </div>
                                                    </FormControl>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </FormItem>
                                )}
                            />
                        </Accordion>

                        <div className="space-y-2">
                            <Button
                                type="submit"
                                className="w-full"
                                onClick={() => form.handleSubmit(getMateriaisFiltrados)}
                            >
                                Aplicar Filtros
                            </Button>
                            <Button
                                type="submit"
                                className="w-full"
                                variant="secondary"
                                onClick={() => {
                                    form.reset();
                                }}
                            >
                                Limpar Filtros
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default Filtros;
