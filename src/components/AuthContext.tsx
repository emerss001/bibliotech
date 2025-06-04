"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface DecodedToken {
    sub: string;
    exp: number;
}

interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;
    logout: () => void;
    login: () => void;
    authChecked: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userEmail: null,
    logout: () => {},
    login: () => {},
    authChecked: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserEmail(null);
        router.push("/auth/login");
    };

    const login = () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                const now = Date.now() / 1000;

                if (decoded.exp > now) {
                    setIsAuthenticated(true);
                    setUserEmail(decoded.sub);
                } else {
                    logout();
                }
            } catch {
                logout();
            }
        }
    };

    useEffect(() => {
        login(); // Verifica se já há um token válido ao carregar
        setAuthChecked(true);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, logout, login, authChecked }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
