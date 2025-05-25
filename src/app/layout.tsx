import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/AuthContext";
import ReactQueryProvider from "@/util/ReactQueryProvider";

const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BiblioTech",
    description: "Sistema de biblioteca de materiais didáticos acessíveis",
    icons: {
        icon: "/ico.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased bg-rootbackground`} suppressHydrationWarning>
                <ReactQueryProvider>
                    <AuthProvider>
                        <div className="min-h-screen flex flex-col">
                            <div className="flex flex-1">
                                <Sidebar /> {/* fixo na esquerda */}
                                <main className="flex-1 pt-20">{children}</main>
                            </div>
                            <Toaster richColors />
                            <Footer /> {/* sempre no final da tela */}
                        </div>
                    </AuthProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
