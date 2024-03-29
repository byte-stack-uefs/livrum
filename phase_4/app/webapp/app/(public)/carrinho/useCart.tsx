import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartItemType } from "../ebook/[id]/page";
import useRequest from "@/app/services/requester";

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

    const requester = useRequest();

    useEffect(() => {
        getCart();
    }, []);

    const getCart = () => {
        requester
            .get("/cart/")
            .then((response) => {
                setcartItems((prev) => {
                    return response.data;
                });
            })
            .catch((err) => {
                const cartEbooks: any = localStorage.getItem("shopCartItens");

                const cartItemsLocalSTORAGE: CartItemType[] = JSON.parse(cartEbooks);
                setcartItems(cartItemsLocalSTORAGE);
            });
    };

    useEffect(() => {
        const getTotal = () => {
            if (cartItems) {
                const { total, qty } = cartItems.reduce(
                    (accumulator, item) => {
                        accumulator.total += item.price;
                        accumulator.qty += 1;

                        return accumulator;
                    },
                    {
                        total: 0,
                        qty: 0,
                    }
                );
                setCardTotalQnt(qty);
                setCardTotalAmount(total);
            }
        };

        getTotal();
    }, [cartItems]);

    const handleAddEbookToCart = useCallback((item: CartItemType) => {
        setcartItems((prev) => {
            let updatedCart: CartItemType[];
            if (prev) {
                updatedCart = [...prev, item];
            } else {
                updatedCart = [item];
            }
            requester
                .post(`/cart/${item.id}`)
                .then((response) => {
                    localStorage.setItem("shopCartItens", JSON.stringify(updatedCart));
                    getCart();
                })
                .catch((err) => {
                    console.error("Erro ao remover item do carrinho", err);
                });
            return updatedCart;
        });
    }, []);

    const handleRemoveEbookFromCart = useCallback(
        (product: CartItemType) => {
            if (cartItems) {
                // Filtrar os produtos para remover apenas o produto atual
                const filteredProducts = cartItems.filter((item) => item.id !== product.id);
                requester
                    .delete(`/cart/${product.id}`)
                    .then((response) => {
                        setcartItems(filteredProducts);
                        localStorage.setItem("shopCartItens", JSON.stringify(filteredProducts));
                    })
                    .catch((error) => {
                        console.error("Erro ao remover item do carrinho", error);
                    });
            }
        },
        [cartItems, setcartItems]
    );

    const handleClearCart = useCallback(() => {
        requester
            .delete("/cart/")
            .then((response) => {
                setcartItems([]);
                localStorage.setItem("shopCartItens", JSON.stringify(null));
            })
            .catch((error) => {
                console.error("Erro ao limpar carrinho", error);
            });
    }, [cartItems, setcartItems]);

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
