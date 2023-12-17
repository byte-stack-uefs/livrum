"use client";
import Divider from "./Divider";
import { useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";

export function PaymentCreditCardContainer({ onConfirm }: { onConfirm: () => void }) {

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
            <Grid xs={12} container item>
                <Grid item xs={8}>
                    <Typography display="inline" variant="body1" color="dark.main" fontWeight="bold">
                        Cartão de Crédito &ensp;
                    </Typography>
                    <Typography display="inline" variant="subtitle2" color="textLight.main">
                        termina em {card.number}
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
                                return <MenuItem key={e.id} value={e.id}>{e.number}</MenuItem>
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
            </Grid>
        </Grid>
    );
}