import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/AuthContext";

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
            <body className={`${inter.className} antialiased`} suppressHydrationWarning>
                <AuthProvider>
                    <Sidebar />
                    {children}
                    <Toaster richColors />
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
