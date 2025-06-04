import { decodedToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAdmin = (requiredRole: string) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const token = decodedToken();
        const hasAccess = requiredRole ? token?.tipo === requiredRole : !!token;

        if (!hasAccess) {
            setIsAuthorized(false);
            router.push("/");
            return; // Importante: interrompe a execução aqui
        }

        setIsAuthorized(true);
    }, [requiredRole, router]);

    return { isAuthorized };
};
