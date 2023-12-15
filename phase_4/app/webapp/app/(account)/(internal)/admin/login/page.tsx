"use client";

import { theme } from "@/app/theme";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { TextField, Button, Paper, Typography, Link } from "@mui/material";

const AdminLogin = () => {
    const [value, setValue] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmitClient = (event) => {
        event.preventDefault();
        console.log("Email:", email);
        console.log("Senha:", password);
    };

    return (
        <Grid container>
            <Grid xs={11} md={4} margin="auto">
                <Paper elevation={0} sx={{ backgroundColor: theme.palette.secondary.main }}>
                    <form onSubmit={handleSubmitClient}>
                        <Grid container padding={3} spacing={2} justifyContent="center" alignItems="center" style={{ textAlign: "center" }}>
                            <Grid xs={12}>
                                <Typography variant="h5" fontWeight="bold">
                                    Acesso administrador
                                </Typography>
                                <Typography variant="caption" color="GrayText">
                                    Seja bem-vindo de volta!
                                </Typography>
                            </Grid>
                            <Grid container spacing={2} xs={12} py={3}>
                                <Grid xs={12}>
                                    <TextField
                                        label="E-mail"
                                        variant="outlined"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        label="Senha"
                                        variant="outlined"
                                        value={password}
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <Grid xs={12} style={{ textAlign: "right", alignSelf: "flex-start" }}>
                                <Link
                                    component="button"
                                    variant="body2"
                                    underline="none"
                                    onClick={() => {
                                        /*
                                    Direcionar para a página de recuperação!!!!
                                */
                                    }}
                                    style={{
                                        color: theme.palette.primary.main,
                                    }}
                                >
                                    Esqueceu a senha?
                                </Link>
                            </Grid>
                            <Grid xs={12} sm={6} md={6}>
                                <Button fullWidth type="submit" variant="contained" color="darker">
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AdminLogin;
