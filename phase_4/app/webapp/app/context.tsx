"use client";
import { createContext } from "react";

export const defaultUser = {
    isLoggedIn: false,
    user: {
        level: null,
        name: "Almir Livrum",
        id: 1,
        email: 'livrum@gmail.com'
    }
};

export const Context = createContext(defaultUser);

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <Context.Provider value={defaultUser}>
            {children}
        </Context.Provider>
    );
}