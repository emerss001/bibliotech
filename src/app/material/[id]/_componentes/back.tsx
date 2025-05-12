"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Back = () => {
    const router = useRouter();

    return (
        <div onClick={() => router.back()} className=" flex items-center gap-2 cursor-pointer">
            <ArrowLeftIcon size={16} className="text-primary" />
            <p className="font-normal text-base text-primary">Voltar para o acervo</p>
        </div>
    );
};

export default Back;
