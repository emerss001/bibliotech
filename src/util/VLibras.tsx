"use client";

import VLibras from "react-vlibras";

export default function ProvidersVLibras({ children }: { children: React.ReactNode }) {
    return (
        <>
            <VLibras safeInit />
            {children}
        </>
    );
}
