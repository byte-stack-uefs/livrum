"use client";
import { createContext, useContext } from "react";

export const defaultUser = {
    isLoggedIn: false,
    user: {
        id: 1,
        tipo: "",
        status: "",
        nome: "Almir Livrum",
        email: "livrum@gmail.com",
    },
};

export const Context = createContext(defaultUser);

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    return <Context.Provider value={defaultUser}>{children}</Context.Provider>;
}

export function useUser() {
    const context = useContext(Context);

    if (context == null) {
        throw new Error("Não foi possível recuperar o Contexto");
    }

    return context;
}
