"use client";

import { createContext, useContext, useState, useEffect } from "react";

type AccessibilityContextType = {
    fontSize: number;
    highContrast: boolean;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
    toggleHighContrast: () => void;
    resetAccessibility: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
    const [fontSize, setFontSize] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("fontSize");
            return saved ? parseInt(saved) : 100;
        }
        return 100;
    });

    const [highContrast, setHighContrast] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("highContrast");
            return saved === "true";
        }
        return false;
    });

    useEffect(() => {
        document.documentElement.style.setProperty("--font-size", `${fontSize}%`);
        localStorage.setItem("fontSize", fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        if (highContrast) {
            document.documentElement.classList.add("high-contrast");
        } else {
            document.documentElement.classList.remove("high-contrast");
        }
        localStorage.setItem("highContrast", highContrast.toString());
    }, [highContrast]);

    const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 10, 150));
    const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 10, 70));
    const toggleHighContrast = () => setHighContrast((prev) => !prev);
    const resetAccessibility = () => {
        setFontSize(100);
        setHighContrast(false);
    };

    return (
        <AccessibilityContext.Provider
            value={{
                fontSize,
                highContrast,
                increaseFontSize,
                decreaseFontSize,
                toggleHighContrast,
                resetAccessibility,
            }}
        >
            {children}
        </AccessibilityContext.Provider>
    );
}

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error("useAccessibility must be used within an AccessibilityProvider");
    }
    return context;
};
