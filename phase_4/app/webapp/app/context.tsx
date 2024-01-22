"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
    user: {
        id: number;
        nome: string;
        email: string;
        tipo: string;
        status: string;
    };
    updateUser: (u) => void;
}

const defaultUser = {
    id: 1,
    tipo: "CLIENTE",
    status: "",
    nome: "[NAME]",
    email: "[EMAIL]",
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
        let u = localStorage.getItem("user");
        if (!u) {
            u = defaultUser;
        }
        setUser(JSON.parse(u));
    }, []);

    const updateUser = (u) => {
        setUser(u);
        localStorage.setItem("user", JSON.stringify(u));
    };

    const value = {
        user,
        updateUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);

    if (context == null) {
        throw new Error("Não foi possível recuperar o Contexto");
    }

    return context;
}
