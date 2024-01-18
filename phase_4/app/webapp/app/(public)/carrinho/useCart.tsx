import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartItemType } from "../ebook/[id]/page";

type CartContextType = {
    cartTotalQnt: number;
    cartItems: CartItemType[];
    //cartItems: Array<CartItemType>;
    handleAddEbookToCart: (item: CartItemType) => void;
    handleRemoveEbookFromCart: (item: CartItemType) => void;
    handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQnt, setCardTotalQnt] = useState(0);
    const [cartItems, setcartItems] = useState<CartItemType[]>([]);

    useEffect(() => {
        const cartEbooks: any = localStorage.getItem("shopCartItens");

        const cartItems: CartItemType[] = JSON.parse(cartEbooks);

        setcartItems(cartItems);
    }, []);

    const handleAddEbookToCart = useCallback((item: CartItemType) => {
        setcartItems((prev) => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, item];
            } else {
                updatedCart = [item];
            }

            localStorage.setItem("shopCartItens", JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleRemoveEbookFromCart = useCallback((
        product: CartItemType
    ) => {
        if(cartItems){
            const filteredProducts = cartItems.filter((item) => {
                return item.id != product.id
            })
            setcartItems(filteredProducts)
            localStorage.setItem("shopCartItens", JSON.stringify(filteredProducts));
        }
    }, [cartItems])

    const handleClearCart = useCallback(() => {
        setcartItems([])
        localStorage.setItem("shopCartItens", JSON.stringify(null));
        
    }, [cartItems])

    const value = {
        cartTotalQnt,
        cartItems,
        handleAddEbookToCart,
        handleRemoveEbookFromCart,
        handleClearCart,
    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context == null) {
        throw new Error("useCart must be used within a CardContextProvider");
    }

    return context;
};
