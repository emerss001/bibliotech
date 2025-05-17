import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MaterialResponse } from "@/http/get-materiais";
import { BookOpenTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MaterialCardProps {
    material: MaterialResponse;
}

const MaterialCard = ({ material }: MaterialCardProps) => {
    return (
        <Card className="p-6 space-y-3 w-full full-duplo-card:max-w-80">
            <div className="flex items-center justify-between">
                <Badge variant="default" className="max-w-[45%]">
                    <p className="truncate">{material.formato}</p>
                </Badge>
                <Badge variant="outline" className="max-w-[45%]">
                    <p className="truncate">{material.area}</p>
                </Badge>
            </div>
            <div className="space-y-2">
                <h1 className="font-semibold text-lg text-title truncate">{material.titulo}</h1>
                <div className="w-full aspect-[16/9] relative">
                    <Image alt="Capa do titulo" src="/capa-placeholder.png" fill className="object-cover rounded-md" />
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <p className="font-normal text-sm text-muted-foreground">Nível: {material.nivel}</p>

                <p className="font-normal text-sm text-muted-foreground">Enviado por: {material.cadastrado_por}</p>
                <p className="font-normal text-sm text-secondary-foreground     ">{material.descricao}</p>
            </div>
            <Link href={`material/${material.id}`}>
                <Button className="w-full mt-6">
                    <BookOpenTextIcon />
                    Ver detalhes
                </Button>
            </Link>
        </Card>
    );
};

export default MaterialCard;
