"use client";

import React, { useState } from "react";

import { Box, Tab, Tabs, TextField, Button, Paper, Typography, Link, FormControl } from "@mui/material";


import Grid from "@mui/material/Unstable_Grid2";
import { theme } from "@/app/theme";

const Login = () => {
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
        <Grid container>
            <Grid xs={11} sm={9} md={7} lg={5} margin="auto">
                <Paper>
                    <form onSubmit={handleSubmitClient}>
                        <Grid container padding={3} spacing={2} justifyContent="center" alignItems="center" style={{ textAlign: "center", backgroundColor: "#E5E2E2"}}>
                            <Tabs
                                value={value}
                                variant="fullWidth"
                                scrollButtons={false}
                                onChange={handleChange}
                                centered
                                TabIndicatorProps={{ style: { display: "display-box" } }}
                                sx={{ width: '100%'}}
                                >
                                <Tab label="Sou Autor" />
                                <Tab label="Sou Leitor" />
                            </Tabs>
                            {/* <Box sx={{ width: '100%'}}>
                                
                            </Box> */}
                            <Grid xs={12}>
                                <Typography variant="h5" fontWeight="bold">
                                    Entre na sua conta
                                </Typography>
                                <Typography variant="caption" color="GrayText">
                                    Seja bem-vindo de volta!
                                </Typography>
                            </Grid>
                            <Grid container spacing={2} xs={12} py={3}>
                                <Grid xs={12}>
                                    <TextField
                                        label="E-mail"
                                        variant="filled"
                                        type="email"
                                        color="info"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        label="Senha"
                                        variant="filled"
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
                                    
                                    //Direcionar para a página de recuperação!!!!
                                    }}
                                    style={{
                                        color: theme.palette.primary.main,
                                        //backgroundColor: "#E5E2E2",
                                    }}
                                >
                                    Esqueceu a senha?
                                </Link>
                            </Grid>
                            <Grid xs={12} md={6}>
                                <Button fullWidth type="submit" variant="contained" color="dark">
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
            
            
        </Grid>
        </>
        
        );
};

export default Login;