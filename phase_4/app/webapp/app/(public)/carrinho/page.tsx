"use client";

import Image from "next/image";
import { useCart } from "./useCart";
import { useRouter } from "next/navigation";
import Divider from "@/app/components/Divider";
import LivrumLink from "@/app/components/LivrumLink";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Box, Button, Container, Grid, Typography, Alert } from "@mui/material";

const Cart = () => {
    const { cartItems } = useCart();
    const { handleRemoveEbookFromCart, handleClearCart, cartTotalAmount } = useCart();

    const router = useRouter();

    if (!cartItems || cartItems.length == 0) {
        return (
            <Grid container justifyContent={"center"}>
                <Grid item xs={12} md={8} mt={2}>
                    <Alert severity="warning" sx={{ alignItems: "center" }}>
                        <Typography variant="body1" fontSize={20}>
                            Carrinho Vazio
                        </Typography>
                        <LivrumLink href="/">
                            <Typography variant="body2">Vamos às Compras</Typography>
                        </LivrumLink>
                    </Alert>
                </Grid>
            </Grid>
        );
    }
    return (
        <Container maxWidth={false}>
            <Grid container mt={4}>
                <Grid xs={9} container item sx={{ backgroundColor: "secondary.main", borderRadius: 5 }}>
                    <Grid xs={8} p={2} item>
                        <Typography variant="h4" color="dark.main" fontWeight="bold">
                            Carrinho
                        </Typography>
                        <Divider width="25%" />
                    </Grid>
                    <Grid xs={4} p={3} item textAlign="right" alignSelf="left">
                        <Button color="error" variant="outlined" onClick={() => handleClearCart()}>
                            Limpar Carrinho
                        </Button>
                    </Grid>
                    <Grid xs={12} item p={2}>
                        <Box sx={{ borderRadius: 5, backgroundColor: "#fff" }}>
                            <Grid container item xs={12} p={2}>
                                {cartItems.map((item) => {
                                    return (
                                        <Grid
                                            mb={2}
                                            item
                                            xs={12}
                                            key={item.id}
                                            container
                                            p={2}
                                            sx={{ backgroundColor: "secondary.main", borderRadius: 5 }}
                                        >
                                            <Grid xs={3} item>
                                                <div style={{ width: "100%", height: 250, position: "relative", borderRadius: 5 }}>
                                                    <Image src={item.cover} fill alt="Ebook cover" objectFit="cover" style={{ borderRadius: 5 }} />
                                                </div>
                                            </Grid>
                                            <Grid xs={7} item p={2} alignSelf="center">
                                                <LivrumLink href={`/ebook/${item.id}`}>
                                                    <Typography color="dark.main" variant="h5" fontWeight="bold">
                                                        {item.title}
                                                    </Typography>
                                                </LivrumLink>
                                                <Typography color="dark.main">{item.author}</Typography>
                                                <Typography>{item.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</Typography>
                                            </Grid>
                                            <Grid xs={2} item textAlign="right" alignSelf="end">
                                                <Button color="error" variant="contained" onClick={() => handleRemoveEbookFromCart(item)}>
                                                    Remover
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid xs={3} item container pl={2}>
                    <Grid xs={12} item>
                        <Box p={2} sx={{ backgroundColor: "secondary.main", borderRadius: 5 }}>
                            <Grid xs={12} item container sx={{ backgroundColor: "#FFF", borderRadius: 5 }} p={2}>
                                <Grid xs={12} item container textAlign={"center"} my={6}>
                                    <Grid item xs={12}>
                                        <Typography color="primary" variant="h6">
                                            Valor dos produtos:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography color="primary">
                                            {cartTotalAmount.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider width="90%" style={{ margin: "auto" }} />
                                    </Grid>
                                    <Grid item xs={12} p={1}>
                                        <LivrumLink href="/">Continuar comprando</LivrumLink>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} item textAlign="center">
                                    <Button
                                        onClick={() => {
                                            router.push("/pagamento");
                                        }}
                                        color="primary"
                                        variant="contained"
                                        startIcon={<ShoppingCartCheckoutIcon />}
                                    >
                                        Finalizar compra
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
