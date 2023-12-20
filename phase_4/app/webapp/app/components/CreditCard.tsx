"use client";
import Card from "@mui/material/Card";
import { Credit } from "../interfaces/Credit";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Button, Typography } from "@mui/material";

export default function CreditCard(credit: Credit){
    return (
        <Card>
            <CreditCardIcon color="primary" ></CreditCardIcon>
            <Typography>{credit.num}</Typography>
            <Typography>{credit.expiryDate}</Typography>
            <Button variant="contained" color="error">Delete</Button>
        </Card>
    );
   

}