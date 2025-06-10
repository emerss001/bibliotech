import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontSize: {
                dynamic: ["var(--font-size)", "1.2"],
            },
            colors: {
                rootbackground: "var(--root-background)",
                write: "var(--write)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                star: "var(--star-icon)",
                title: "var(--title)",
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                chart: {
                    "1": "var(--chart-1)",
                    "2": "var(--chart-2)",
                    "3": "var(--chart-3)",
                    "4": "var(--chart-4)",
                    "5": "var(--chart-5)",
                },
            },
            transitionProperty: {
                size: "font-size, padding, margin",
                colors: "background-color, border-color, color, fill, stroke",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            screens: {
                "full-duplo-card": "743px",
                "duplo-card": "1015px",
            },
            // highContrast: {
            //     colors: {
            //         background: "#000000",
            //         foreground: "#FFFFFF",
            //         primary: "#FFFF00",
            //         // title: "#FFFF00",
            //         secondary: "#FFA500",
            //         card: "#000000",
            //         cardForeground: "#FFFFFF",
            //         popover: "#000000",
            //         popoverForeground: "#FFFFFF",
            //         muted: "#333333",
            //         mutedForeground: "#CCCCCC",
            //         accent: "#FFFF00",
            //         accentForeground: "#000000",
            //         border: "#FFFF00",
            //         input: "#FFFF00",
            //         ring: "#FFFF00",
            //         destructive: "#FF0000",
            //         destructiveForeground: "#FFFFFF",
            //     },
            // },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        // Plugin para habilitar o tema de alto contraste
    ],
} satisfies Config;
