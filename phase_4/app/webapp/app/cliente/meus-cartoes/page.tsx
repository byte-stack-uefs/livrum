"use client";

import { theme } from "@/app/theme";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Icon, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function Page() {
    const [open, setOpen] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [creditCards, setCreditCards] = useState([
        {
            id: 0,
            num: "1234123412341234",
            expiryDate: "27/11/2030",
            cvc: 110,
            name: "Alguem da Silva",
        },{
            id: 1,
            num: "4321432143214321",
            expiryDate: "27/11/2040",
            cvc: 852,
            name: "Alguem dos Santos",
        },
        {
            id: 2,
            num: "4567456745674567",
            expiryDate: "27/11/2035",
            cvc: 951,
            name: "Alguem de Jesus",
        },
    ]);

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
     
        <Grid xs={12} sx={{ fontSize: 18 }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
                Meus Cartões
            </Typography>
        </Grid>
 
        <Grid xs={12} md={6} >
            <Grid item xs={12} sx={{ backgroundColor: "secondary.main", p: 1, margin: 'auto', borderBottomRightRadius: 20, }}>
                <Grid justifyContent="flex-end" alignItems="flex-end">
                    <Button variant="contained"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Adicionar
                    </Button>
                </Grid>
                
                <List sx={{ width: "100%", height: "100%"}} >
                {creditCards.map((creditcard) => (
                    <ListItem key={creditcard.id}> 
                        <Grid sx={{ backgroundColor: "white", margin: 'auto', minWidth: 350}}>
                            <CardContent>
                                <Typography variant="body1">{creditcard.name}</Typography>
                                <Typography variant="body2">Validade: {creditcard.expiryDate}</Typography>
                                <Typography>{creditcard.num}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color='error'>Delete</Button>
                            </CardActions>
                        </Grid>
                       
                    </ListItem>

                ))}
            
                </List>  
            </Grid> 
        </Grid>
        
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign="center" sx={{ backgroundColor: "secondary.main", p: 1 }}>
                    Cadastro novo cartão
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField label={"Nome no Cartão *"} fullWidth size="small" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={"Numero do Cartão *"} fullWidth size="small" />
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs={6}>
                                <TextField type="date" label={"Data de Nascimento *"} fullWidth size="small" />
                            </Grid>
                            <Grid item xs={6} pl={2}>
                                <TextField label={"CVV *"} fullWidth size="small" />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button color="success" variant="contained" onClick={handleClose}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
