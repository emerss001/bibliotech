import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/AuthContext";
import ReactQueryProvider from "@/util/ReactQueryProvider";
import ProvidersVLibras from "@/util/VLibras";
import { AccessibilityProvider } from "@/util/AccessibilityContext";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import Script from "next/script";

const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Acervo Inclusivo",
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
                <Script id="set-high-contrast" strategy="beforeInteractive">
                    {`
                    try {
                        const hc = localStorage.getItem("highContrast");
                        if (hc === "true") {
                            document.documentElement.classList.add("high-contrast");
                        }
                    } catch (e) {}
                `}
                </Script>

                <AccessibilityProvider>
                    <ProvidersVLibras>
                        <AccessibilityToolbar />
                        <ReactQueryProvider>
                            <AuthProvider>
                                <div className="min-h-screen flex flex-col">
                                    <Sidebar />
                                    <main className="flex-1 w-full">{children}</main>
                                    <Toaster richColors />
                                    <Footer /> {/* sempre no final da tela */}
                                </div>
                            </AuthProvider>
                        </ReactQueryProvider>
                    </ProvidersVLibras>
                </AccessibilityProvider>
            </body>
        </html>
    );
}
