import { createContext, useContext, useState } from "react";

type CartContextType ={
    cartTotalQnt: number
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) =>{
    const[cartTotalQnt, setCardTotalQnt] = useState(0)

    const value = {
        cartTotalQnt
    }

    return <CartContext.Provider value={value} {...props}/>
};

export const useCart = () =>{
    const context = useContext(CartContext);

    if(context== null) {
        throw new Error("useCart must be used within a CardContextProvider")
    }

    return context;
}
