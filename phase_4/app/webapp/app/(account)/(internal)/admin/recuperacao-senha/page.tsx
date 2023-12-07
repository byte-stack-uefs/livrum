"use client";

import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Link, FormControl, InputLabel } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { theme } from "@/app/theme";
import { Primary } from "@/stories/Button.stories";
import Divider from "@/app/components/Divider";

const AdminPasswordRestore = () => {
    const [value, setValue] = useState(0);
    const [email, setEmail] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmitClient = (event) => {
        event.preventDefault();
        console.log("Email:", email);
    };

    return (
        <Grid container direction="column">
            <Grid xs={12} md={4} sx ={{margin: "auto",mb: "30px"}} textAlign="center">
                <Typography sx={{ color: "black"}} variant="h6">
                    Recuperação de senha
                </Typography>
                <Divider width={"35%"} style={{ margin: "auto"}}/></Grid>
            <Grid xs={12} md={4} marginTop={10} margin="auto">
                <Paper elevation={0} style={{ padding: '30px', backgroundColor: '#F4F2F2' }}>
                    <Paper>
                        <form onSubmit={handleSubmitClient}>
                            <Grid container padding={3} spacing={3} justifyContent="center" alignItems="center">
                                <Grid xs={12}>
                                    <Typography variant="h6" fontWeight="bold" style={{ textAlign: "center", color: theme.palette.dark.main }}>
                                        Esqueceu sua senha?
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Typography variant="caption" fontWeitgh="regular" color="black" style={{ textAlign: "left" }}>
                                        Confirme o endereço de e-mail utilizado em seu cadastro, e enviaremos sua senha novamente
                                    </Typography>
                                </Grid>
                                <Grid container spacing={2} xs={12} py={3} justifyContent="center" alignItems="center" style={{ textAlign: "center" }}>
                                    <Grid xs={8}>
                                        <InputLabel htmlFor="labelEmail" fontWeight="Roboto" style={{ textAlign: 'left', color: theme.palette.primary.main }}>E-mail </InputLabel>
                                        <TextField
                                            id="labelEmail"
                                            variant="outlined"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            fullWidth
                                            style={{ borderColor: theme.palette.primary.main }}
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid xs={8} md={8}>
                                    <Button fullWidth type="submit" variant="contained" color="primary">
                                        Enviar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AdminPasswordRestore;
