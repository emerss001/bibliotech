import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MaterialResponse } from "@/http/get-materiais";
import { CalendarIcon, DownloadIcon } from "lucide-react";
import Image from "next/image";

interface MaterialCardProps {
    material: MaterialResponse;
}

const MaterialCard = ({ material }: MaterialCardProps) => {
    return (
        <Card className="p-6 space-y-3 min-w-80 w-full full-duplo-card:max-w-80">
            <div className="flex items-center justify-between">
                <Badge variant="default">{material.formato}</Badge>
                <Badge variant="outline" className="text-card">
                    {material.area}
                </Badge>
            </div>
            <div className="w-full relative aspect-[16/9] space-y-2">
                <h1 className="font-semibold text-lg text-title truncate">{material.titulo}</h1>
                <div>
                    <Image alt="Capa do titulo" src="/capa-placeholder.png" fill className="object-cover rounded-md" />
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <p className="font-normal text-sm text-muted-foreground">Nível: {material.nivel}</p>

                <p className="font-normal text-sm text-muted-foreground">Enviado por: {material.cadastrado_por}</p>
                <p className="font-normal text-sm text-secondary-foreground line-clamp-2">{material.descricao}</p>
            </div>
            {material.tipo === "Digital" ? (
                <Button className="w-full">
                    <DownloadIcon />
                    Fazer Download
                </Button>
            ) : (
                <Button className="w-full">
                    <CalendarIcon />
                    Solicitar Empréstimo
                </Button>
            )}
        </Card>
    );
};

export default MaterialCard;
