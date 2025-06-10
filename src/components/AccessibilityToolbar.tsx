"use client";

import { useAccessibility } from "@/util/AccessibilityContext";
import { AArrowDownIcon, AArrowUpIcon, ContrastIcon, RotateCcwIcon } from "lucide-react";

export function AccessibilityToolbar() {
    const { fontSize, highContrast, increaseFontSize, decreaseFontSize, toggleHighContrast, resetAccessibility } =
        useAccessibility();

    return (
        <div className="fixed bottom-4 left-6 z-[9998] flex flex-col gap-3">
            <div className="bg-card text-card-foreground rounded-full shadow-lg p-2 flex flex-col items-center gap-2 border border-border">
                <button
                    onClick={increaseFontSize}
                    className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label={`Aumentar tamanho da fonte. Tamanho atual: ${fontSize}%`}
                    aria-live="polite"
                    disabled={fontSize >= 150}
                    tabIndex={0}
                >
                    <AArrowUpIcon className="w-5 h-5" />
                    <p className="sr-only">Aumentar tamanho da fonte</p>
                </button>

                <span className="text-xs font-medium" aria-label={`tamnho ataul da fonte é ${fontSize}%`}>
                    {fontSize}%
                </span>

                <button
                    onClick={decreaseFontSize}
                    className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="Diminuir tamanho da fonte"
                    disabled={fontSize <= 70}
                >
                    <AArrowDownIcon className="w-5 h-5" />
                </button>
            </div>

            <button
                onClick={toggleHighContrast}
                className={`p-3 rounded-full ${
                    highContrast
                        ? "bg-card items-center text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                aria-label={highContrast ? "Desativar alto contraste" : "Ativar alto contraste"}
            >
                <ContrastIcon className="w-5 h-5" />
            </button>

            <button
                onClick={resetAccessibility}
                className="p-3 rounded-full bg-muted text-muted-foreground shadow-lg hover:bg-muted/80 transition-colors"
                aria-label="Redefinir configurações de acessibilidade"
            >
                <RotateCcwIcon className="w-5 h-5" />
            </button>
        </div>
    );
}
