"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { List, ListItem, Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { useState } from "react";
import CreditCard from "@/app/components/CreditCard";


function CardList() {
    const [openModal, setOpenModal] = useState(false);
    const [creditCards, setCreditCards] = useState([
        {
            id: 0,
            num: "1234123412341234",
            expiryDate: "27/11/2030",
            cvc: 110,
            name: "Nome sobrenome Um",
        },{
            id: 1,
            num: "4321432143214321",
            expiryDate: "27/11/2040",
            cvc: 852,
            name: "Nome sobrenome Dois",
        },
        {
            id: 2,
            num: "4567456745674567",
            expiryDate: "27/11/2035",
            cvc: 951,
            name: "Nome Sobrenome Tres",
        },
    ]);

    return (
        <Grid xs={12} md={6}>
            <h5>Meus Cartões</h5>
            <Box>
                <List sx={{ width: "100%", maxWidth: 360}}>
                {creditCards.map((creditcard) => (
                    <ListItem key={creditcard.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="body1">{creditcard.name}</Typography>
                                <Typography variant="body2">{creditcard.expiryDate}</Typography>
                                <Typography>{creditcard.num}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color='error'>Delete</Button>
                            </CardActions>
                        </Card>
                    </ListItem>

                ))}
                
                </List>

            </Box>
            
          
        </Grid>
    );
}
    {/*
    return (
        <Grid xs={12}>
            <List sx={{ width: "100%" }}>
                {creditCards.map((creditCard) => (
                    <ListItem>
                        <CreditCard>

                        </CreditCard>
                        
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
}

function BookListContainer() {
    return (
        <>
            <Grid container xs={12} sx={{ backgroundColor: "#F4F2F2", borderRadius: "16px" }}>
                <CardList></CardList>
            </Grid>
        </>
    );
}

const MyCards = () => {
    const [state, setState] = useState({
        num: '',
        expiryDate: '',
        cvc: '',
        name: '',
        focus: '',
      });

    return (
        <Grid container>
            <Grid xs={11} md={4} margin="auto">
                <Box>
                    <button>

                    </button>
                    <Card>
                        <CardContent>
                            <Typography>
                                Kbk
                            </Typography>

                        </CardContent>

                    </Card>
                </Box>
                
            </Grid>
        </Grid>
    );
}

export default MyCards;

id: number;
    num: number;
    expiryDate: string;
    cvc: number;
    name: string;
*/}
