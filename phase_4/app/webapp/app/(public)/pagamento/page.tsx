"use client";

import Divider from "@/app/components/Divider";
import { TabSelector } from "@/app/components/TabSelector";
import { CreditCard, Pix } from "@mui/icons-material";
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

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
            <Grid xs={3} position="relative" minHeight={200}>
                <Image src={ebook.cover} fill alt="Book cover" objectFit="contain" />
            </Grid>
            <Grid xs={9} container alignContent={"center"}>
                <Grid xs={12}>
                    <Typography variant="h6" color="dark.main" fontWeight="bold">
                        {ebook.title}
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <Typography variant="body1" color="dark.main">por {ebook.authors.join(', ')}</Typography>
                    <Divider width="80%" height={2} />
                </Grid>
                <Grid xs={12}>
                    <Typography variant="body1" color="dark.main" fontWeight="bold">
                        {ebook.price.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default function Page() {

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

    const [subtotal, setSubtotal] = useState(50);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [coupon, setCoupon] = useState('');

    useEffect(() => {
        const calculate = subtotal - discount;
        setTotal(calculate < 0 ? 0 : calculate);
    }, [subtotal, discount]);

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
            <Grid container>
                <Grid xs={12}>
                    <Typography color="dark.main" variant="h4">
                        Revisar itens do pedido
                    </Typography>
                    <Divider width={"25%"} />
                </Grid>
                <Grid xs={12}>
                    {books.map(e => {
                        return <PaymentEbook ebook={e} />
                    })}
                </Grid>
            </Grid>
            <Grid container>
                <Divider width="100%" height={2} style={{ margin: "16px 0" }} />
                <Grid xs={4} container>
                    <Grid xs={6}>
                        <Typography variant="body1" color="dark.main" fontWeight="bold">
                            Subtotal:
                        </Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography color="dark.main" variant="body1">
                            {subtotal.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })}
                        </Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography variant="body1" color="dark.main" fontWeight="bold">
                            Desconto:
                        </Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography color="dark.main" variant="body1">
                            {discount.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })}
                        </Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography variant="body1" color="dark.main" fontWeight="bold">
                            Total:
                        </Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography color="dark.main" variant="body1">
                            {total.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container xs={8} textAlign="right" justifyContent="end">
                    <Grid xs={6}>
                        <TextField value={coupon} onChange={(e) => {
                            setCoupon(e.target.value)
                        }} fullWidth placeholder="Possui cupom? Digite-o aqui" size="small"></TextField>
                    </Grid>
                    <Grid xs={3}>
                        <Button variant="contained" color="primary">Aplicar</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Grid xs={12}>
                    <Typography color="dark.main" variant="h4">
                        Informações de pagamento
                    </Typography>
                    <Divider width={"25%"} />
                </Grid>
                <Grid xs={12} my={2} container>
                    <Grid xs={12}>
                        <TabSelector items={tabItems} def={0} onChange={(e) => { }} />
                    </Grid>
                    <Grid xs={12}>
                        <Box sx={{ border: '1px solid #e5e5e5' }} p={2} borderRadius={2}>
                            <CreditCardContainer />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

function CreditCardContainer() {

    const cards = [
        {
            id: 4,
            number: '8922'
        },
        {
            id: 15,
            number: '4450'
        }
    ]
    const [card, setCard] = useState(cards[0]);
    const [selectedCard, setSelectedCard] = useState(4);
    const [selectedInstallment, setSelectedInstallment] = useState(1);

    function handleSelection(e: SelectChangeEvent<number>) {
        setSelectedCard(e.target.value);
        setCard(cards.filter(c => {
            return c.id == e.target.value;
        })[0]);
    }

    const installments = [];
    for (let i = 1; i <= 12; i++) {
        installments.push(i);
    }


    return (
        <Grid container>
            <Grid xs={12} container>
                <Grid xs={8}>
                    <Typography display="inline" variant="body1" color="dark.main" fontWeight="bold">
                        Cartão de Crédito &ensp;
                    </Typography>
                    <Typography display="inline" variant="subtitle2" color="textLight.main">
                        termina em {card.number}
                    </Typography>
                </Grid>
                <Grid xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="my-cards-select-label">Meus cartões</InputLabel>
                        <Select
                            labelId="my-cards-select-label"
                            id="my-cards-select"
                            value={selectedCard}
                            label="Meus cartões"
                            onChange={handleSelection}
                            size="small"
                        >
                            {cards.map(e => {
                                return <MenuItem key={e.id} value={e.id}>{e.number}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Divider width="85%" height={2} style={{ margin: '16px auto' }} />
            </Grid>
            <Grid xs={12} container justifyContent="space-between">
                <Grid xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="installments-select-label">Parcelas</InputLabel>
                        <Select
                            labelId="installments-select-label"
                            id="installments-select"
                            value={selectedInstallment}
                            label="Parcelas"
                            onChange={(e) => {
                                setSelectedInstallment(e.target.value);
                            }}
                            size="small"
                        >
                            {installments.map(e => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={3}>
                    <TextField fullWidth label="Código de Segurança" size='small' type="number" />
                </Grid>
                <Grid xs={4} textAlign="right">
                    <Button variant="contained" color="primary">Confirmar pagamento</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}