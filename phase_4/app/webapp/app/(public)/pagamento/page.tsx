"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Divider from "@/app/components/Divider";
import { TabSelector } from "@/app/components/TabSelector";
import { PixContainer } from "@/app/components/PixContainer";
import { CheckCircle, CreditCard, Pix } from "@mui/icons-material";
import { PaymentCreditCardContainer } from "@/app/components/PaymentCreditCardContainer";
import { Box, Button, Container, Dialog, DialogContent, Grid, TextField, Typography } from "@mui/material";

export interface PaymentEbook {
    id: number;
    title: string;
    price: number;
    cover: string;
    authors: Array<string>;
}

function PaymentEbook({ ebook }: { ebook: PaymentEbook }) {
    return (
        <Grid container py={2}>
            <Grid item xs={3} position="relative" minHeight={200}>
                <Image src={ebook.cover} fill alt="Book cover" objectFit="contain" />
            </Grid>
            <Grid item xs={9} container alignContent={"center"}>
                <Grid item xs={12}>
                    <Typography variant="h6" color="dark.main" fontWeight="bold">
                        {ebook.title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" color="dark.main">por {ebook.authors.join(', ')}</Typography>
                    <Divider width="80%" height={2} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" color="dark.main" fontWeight="bold">
                        {ebook.price.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default function Page() {

    const router = useRouter();
    const [total, setTotal] = useState(0);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [subtotal, setSubtotal] = useState(50);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const books = [
        {
            id: 5,
            cover: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSpz_PGgi7jqYjc-QQ554j02VSA6G_TOT6w3FBlk2Zd9YFV64FvyVGkSatjDrBJWlOnRnK-jfRE0ws0BRoq2jLFF83dVRIdo9SlpHQzCUZOEpGTPeIXLFWTkA',
            title: 'Teste ebook',
            authors: ['Almir Neto'],
            price: 25.90
        },
        {
            id: 10,
            cover: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSpz_PGgi7jqYjc-QQ554j02VSA6G_TOT6w3FBlk2Zd9YFV64FvyVGkSatjDrBJWlOnRnK-jfRE0ws0BRoq2jLFF83dVRIdo9SlpHQzCUZOEpGTPeIXLFWTkA',
            title: 'Teste ebook',
            authors: ['Almir Neto'],
            price: 25.90
        }
    ];

    useEffect(() => {
        const calculate = subtotal - discount;
        setTotal(calculate < 0 ? 0 : calculate);
    }, [subtotal, discount]);

    const [tab, setTab] = useState(0);

    const tabItems = [
        {
            title: 'Cartão',
            icon: <CreditCard />
        },
        {
            title: 'Pix',
            icon: <Pix />
        },
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 3 }}>

            <Dialog fullWidth maxWidth="sm" open={showSuccessModal} onClose={(ev, reason) => { setShowSuccessModal(false) }}>
                <DialogContent>
                    <Grid container>
                        <Grid xs={12} item textAlign="center">
                            <CheckCircle sx={{ fontSize: 80 }} color="success" />
                        </Grid>
                        <Grid xs={12} item mb={2}>
                            <Typography textAlign="center" color="dark.main" variant="h4">
                                Pagamento confirmado
                            </Typography>
                        </Grid>
                        <Grid xs={12} item textAlign="center">
                            <Button variant="contained" onClick={() => {
                                router.push('/cliente/biblioteca')
                            }}>
                                Ir para a biblioteca
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Grid container>
                <Grid item xs={12}>
                    <Typography color="dark.main" variant="h4">
                        Revisar itens do pedido
                    </Typography>
                    <Divider width={"25%"} />
                </Grid>
                <Grid item xs={12}>
                    {books.map(e => {
                        return <PaymentEbook key={e.id} ebook={e} />
                    })}
                </Grid>
            </Grid>
            <Grid container>
                <Divider width="100%" height={2} style={{ margin: "16px 0" }} />
                <Grid xs={4} item container>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="dark.main" fontWeight="bold">
                            Subtotal:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="dark.main" variant="body1">
                            {subtotal.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="dark.main" fontWeight="bold">
                            Desconto:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="dark.main" variant="body1">
                            {discount.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="dark.main" fontWeight="bold">
                            Total:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="dark.main" variant="body1">
                            {total.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={8} textAlign="right" justifyContent="end">
                    <Grid item xs={6}>
                        <TextField value={coupon} onChange={(e) => {
                            setCoupon(e.target.value)
                        }} fullWidth placeholder="Possui cupom? Digite-o aqui" size="small"></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary">Aplicar</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Grid item xs={12}>
                    <Typography color="dark.main" variant="h4">
                        Informações de pagamento
                    </Typography>
                    <Divider width={"25%"} />
                </Grid>
                <Grid item xs={12} my={2} container>
                    <Grid item xs={12}>
                        <TabSelector items={tabItems} def={0} onChange={(e) => {
                            setTab(e);
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ border: '1px solid #e5e5e5' }} p={2} borderRadius={2}>

                            <Box sx={{ display: tab == 0 ? 'block' : 'none' }}>
                                <PaymentCreditCardContainer onConfirm={() => {
                                    setShowSuccessModal(true)
                                }} />
                            </Box>

                            <Box sx={{ display: tab == 1 ? 'block' : 'none' }}>
                                <PixContainer />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}