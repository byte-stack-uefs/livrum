import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartItemType } from "../ebook/[id]/page";
import useRequest from "@/app/services/requester";
import Cookies from 'js-cookie';

type CartContextType = {
    cartTotalQnt: number;
    cartTotalAmount: number;
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
    const [cartTotalAmount, setCardTotalAmount] = useState(0);
    const [cartItems, setcartItems] = useState<CartItemType[]>([]);

    const tokenUser = Cookies.get('token');

    useEffect(() => {
        const cartEbooks: any = localStorage.getItem("shopCartItens");

        const cartItems: CartItemType[] = JSON.parse(cartEbooks);

        setcartItems(cartItems);
    }, []);

    useEffect(() => {
        const getTotal = () =>{
            if(cartItems){
                const {total, qty} = cartItems.reduce((accumulator, item) => {
                    accumulator.total += item.price;
                    accumulator.qty += 1;
    
                    return accumulator;
                }, {
                    total: 0,
                    qty:0,
                })
                setCardTotalQnt(qty)
                setCardTotalAmount(total)
            }
            
        }

        getTotal()
    }, [cartItems])

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
        cartTotalAmount,
        cartItems,
        handleAddEbookToCart,
        handleRemoveEbookFromCart,
        handleClearCart,
    };

    const requester = useRequest();
    console.log(cartItems)

    // function verificarSeUsuarioEstaLogado(): boolean {
    //     if (tokenUser != null){
    //         const data = localStorage.getItem('shopCartItens');
    //         //mandar post pro banco
    //         requester
    //         .post("/credit-card", {
    //             // cvv: cvv,
    //             // token: cardToken,
    //             // namePrinted: cardHolder,
    //             // cardNumber: cardNumber.slice(12),
    //             // expiryDate: cardExpiration?.toFormat("yyyy-LL"),
    //         })
    //         .then((response) => {
    //             setCardCreatedSuccessfully(true);
    //             setOpen(false);
    //             setCVV("");
    //             setCardHolder("");
    //             setCardNumber("");
    //             setCardToken("");
    //             setCardExpiration(null);

    //             setHasCreationFailed(false);
    //             setCreationError("");
    //         })
    //         .catch((err) => {
    //             setHasCreationFailed(true);
    //             setCreationError(err.response.data.detail);
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });
    //     }
    //     return true;
    // }

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context == null) {
        throw new Error("useCart must be used within a CardContextProvider");
    }

    return context;
};
