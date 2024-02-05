"use client";
import Divider from "./Divider";
import { useEffect, useState } from "react";
import useRequest from "../services/requester";
import { CreditCard } from "../interfaces/CreditCard";
import { Alert, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";

export function PaymentCreditCardContainer({ onConfirm }: { onConfirm: () => void }) {

    const requester = useRequest();

    const [cards, setCards] = useState<CreditCard[] | null>(null);
    const [card, setCard] = useState(cards != null ? cards[0] : null);
    const [selectedCard, setSelectedCard] = useState(0);
    const [selectedInstallment, setSelectedInstallment] = useState(1);

    useEffect(() => {

        requester.get('/credit-card').then(response => {
            setCards(response.data);
            if (cards != null) {
                console.log('entrou')
                setCard(cards[0]);
            }
        })
            .catch(err => { }).finally(() => {
                setCards([{}])
                console.log(cards);
            })
    }, [])

    if (cards == null) {
        return <CircularProgress />;
    }

    function handleSelection(e: SelectChangeEvent<number>) {
        setSelectedCard(e.target.value);
        setCard(cards.filter(c => {
            return c.id == e.target.value;
        })[0]);
    }

    const installments: int[] = [];
    for (let i = 1; i <= 12; i++) {
        installments.push(i);
    }

    function getContent() {
        if (card == null) {
            return <Alert severity="error" variant="filled">
                Nenhum cartão de crédito encontrado.
            </Alert>
        }
        else {

            return (<><Grid xs={12} container item>
                <Grid item xs={8}>
                    <Typography display="inline" variant="body1" color="dark.main" fontWeight="bold">
                        Cartão de Crédito &ensp;
                    </Typography>
                    <Typography display="inline" variant="subtitle2" color="textLight.main">
                        **** **** **** {card?.number}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
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
                                return <MenuItem key={e.id} value={e.id}>final {e.number}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Divider width="85%" height={2} style={{ margin: '16px auto' }} />
            </Grid>
                <Grid xs={12} container justifyContent="space-between" item>
                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
                        <TextField fullWidth label="Código de Segurança" size='small' type="number" />
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                        <Button variant="contained" color="primary" onClick={onConfirm}>Confirmar pagamento</Button>
                    </Grid>
                </Grid></>)
        }
    }

    return (
        <Grid container>
            {getContent()}
        </Grid>
    );
}