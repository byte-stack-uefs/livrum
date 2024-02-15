import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartItemType } from "../ebook/[id]/page";
import useRequest from "@/app/services/requester";
import Cookies from 'js-cookie';
import { error } from "console";

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

    //const tokenUser = Cookies.get('token');
    const requester = useRequest();
    //console.log(localStorage.getItem("shopCartItens"));
    //console.log(cartItems)

    useEffect(() => {
        // const cartEbooks: any = localStorage.getItem("shopCartItens");

        // const cartItems: CartItemType[] = JSON.parse(cartEbooks);

        // setcartItems(cartItems);
        getCart();
    }, []);

    const getCart = () =>{
        requester.get("/carrinho/").then(response => {
            setcartItems(prev=>{
                return response.data;
            }
        )
            }).catch(err => {
                const cartEbooks: any = localStorage.getItem("shopCartItens");

                const cartItemsLocalSTORAGE: CartItemType[] = JSON.parse(cartEbooks);
                setcartItems(cartItemsLocalSTORAGE);
            })
    } 
        

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
            let updatedCart: CartItemType[];
            if (prev) {
                updatedCart = [...prev, item];
            } else {
                updatedCart = [item];
            }
            requester
            .post(`/carrinho/${item.id}`, {
                idEbook: item.id
            })
            .then((response) => {
                localStorage.setItem("shopCartItens", JSON.stringify(updatedCart));
            })
            .catch((err) => {console.error('Erro ao remover item do carrinho', err);})
            return updatedCart;
        });
    }, []);

    const handleRemoveEbookFromCart = useCallback((
        product: CartItemType
    ) => {
        if (cartItems) {
            // Filtrar os produtos para remover apenas o produto atual
            const filteredProducts = cartItems.filter(item => item.id !== product.id);
            console.log('Item removido com sucesso:', product);
            requester
            .delete(`/carrinho/${product.id}`)
            .then(response => {
                console.log('Item removido com sucesso:', product.id);
                setcartItems(filteredProducts);
                localStorage.setItem("shopCartItens", JSON.stringify(filteredProducts));
            })
            .catch(error => {
                console.error('Erro ao remover item do carrinho', error);
            })
        }
    }, [cartItems, setcartItems])

    const handleClearCart = useCallback(() => {
        requester
        .delete("/carrinho/")
        .then(response => {
            setcartItems([])
            localStorage.setItem("shopCartItens", JSON.stringify(null));
        })
        .catch(error => {
            console.error('Erro ao limpar carrinho', error);
        })
        
    }, [cartItems])

    const value = {
        cartTotalQnt,
        cartTotalAmount,
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
