"use client";

import { CartContextProvider } from "./useCart";

interface CartProviderProps{
    children: React.ReactNode
}

const CartProvider: React.FC<CartProviderProps> = ({children}) =>{
    return (
        <CartContextProvider>{children}</CartContextProvider>
    );
}

export default CartProvider;