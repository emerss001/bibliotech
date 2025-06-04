import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CadastrosPendentesResponse } from "@/http/admin";
import {
    AlertCircleIcon,
    CalendarIcon,
    CheckCircleIcon,
    FileTextIcon,
    MailIcon,
    UserIcon,
    XCircle,
} from "lucide-react";

interface CardCadastrosProps {
    pedido: CadastrosPendentesResponse;
    handleCadastro: (id: number, acao: "aprovar" | "rejeitar") => void;
}

const CardCadastros = ({ pedido, handleCadastro }: CardCadastrosProps) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Informações Pessoais */}
                    <div>
                        <h3 className="font-semibold text-title mb-3 flex items-center">
                            <UserIcon className="h-4 w-4 mr-2 text-accent-foreground" />
                            {pedido.nome}
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p className="flex items-center">
                                <MailIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                                {pedido.email}
                            </p>
                            <p className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                                {pedido.solicitado}
                            </p>
                            <p className="flex items-center">
                                <AlertCircleIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                                {pedido.necessidade || "Sou professor/bibliotecário"}
                            </p>
                        </div>
                    </div>

                    {/* Informações Acadêmicas */}
                    <div>
                        <h3 className="font-semibold text-title mb-3 flex items-center">
                            <FileTextIcon className="h-4 w-4 mr-2 text-accent-foreground" />
                            Informações Acadêmicas
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <Badge
                                className={`mr-2 ${
                                    pedido.vinculo === "Aluno"
                                        ? "bg-blue-600"
                                        : pedido.vinculo === "Professor"
                                        ? "bg-green-600"
                                        : "bg-purple-600"
                                }`}
                            >
                                {pedido.vinculo}
                            </Badge>
                            <p>Indentificador: {pedido.identificador}</p>
                        </div>
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col gap-2 justify-center">
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleCadastro(pedido.id, "aprovar")}
                        >
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Aprovar
                        </Button>
                        <Button
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleCadastro(pedido.id, "rejeitar")}
                        >
                            <XCircle className="h-4 w-4 mr-2" />
                            Rejeitar Cadastro
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardCadastros;
