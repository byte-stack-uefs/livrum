
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartItemType } from "../ebook/[id]/page";


type CartContextType ={
    cartTotalQnt: number;
    cartItems: CartItemType[] | null;
    handleAddEbookToCart: (item: CartItemType) => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) =>{
    const [cartTotalQnt, setCardTotalQnt] = useState(0)
    const [cartItems, setcartItems] = useState<CartItemType[] | null>([])

    const handleAddEbookToCart = useCallback((item: CartItemType) => {
        
        for(item)
        setcartItems((prev) => {
            let updatedCart;
            if(prev){
                updatedCart = [...prev, item]
            }else{
                updatedCart = [item]
            }
            return updatedCart;
        });
    }, []);
    useEffect(() => {console.log(cartItems)}, [cartItems])

    const value = {
        cartTotalQnt,
        cartItems,
        handleAddEbookToCart,
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
