"use client";
import React, { useState } from "react";
import {
    TextField, Button, Tabs, Tab, Box, Paper, Grid, FormGroup, FormControlLabel, Checkbox, styled,Typography,Link
} from "@mui/material";

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
        <>

            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "auto",
                    width:"20%",
                    justifyContent: "center",
                    flexGrow: 1,
                }}

            >
                <form onSubmit={handleSubmitClient}> 
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        style={{ textAlign: 'center' }}
                    >
                        <Grid item xs={12}>
                            <Typography variant="body2" fontFamily="Raleway, sans-serif" fontSize="22px" fontWeight="bold">
                                Acesso Administrador
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" fontFamily="Poppins, sans-serif" fontSize="11px" fontWeight="regular" color="#636363">
                                Seja bem vindo de volta
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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

                        <Grid item xs={12} style={{ textAlign: 'right', alignSelf: 'flex-start' }}>
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
                                color: "#4285F4",
                            }}
                        >
                            Esqueceu a senha ?
                        </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{ width:"40%", backgroundColor: "#163760", color: "#FFFFFF" }}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

        </>
    );
};

export default AdminLogin;
