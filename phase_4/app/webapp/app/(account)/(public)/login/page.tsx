"use client";

import { theme } from "@/app/theme";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Unstable_Grid2";
import useRequest from "@/app/services/requester";
import { Tab, Tabs, TextField, Button, Paper, Typography, Link } from "@mui/material";

const Login = () => {
    const [value, setValue] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();
    const requester = useRequest();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmitClient = (event) => {
        event.preventDefault();

        requester
            .post("/auth", {
                username: email,
                password: password,
            })
            .then((response) => {
                localStorage.setItem("token", response.data.access_token);

                const level = response.data.tipo;
            })
            .catch((err) => {
                let message = "Algo deu errado, tente novamente mais tarde";

                if (err?.response?.data?.detail) {
                    message = err?.response?.data?.detail;
                    setErrorMessage(message);
                }
            });
    };

    return (
        <>
            <Grid container>
                <Grid xs={11} md={4} margin="auto">
                    <Tabs
                        value={value}
                        variant="fullWidth"
                        scrollButtons={false}
                        onChange={handleChange}
                        centered
                        TabIndicatorProps={{ style: { display: "none" } }}
                        sx={{ width: "100%" }}
                    >
                        <Tab label="Sou Autor" />
                        <Tab label="Sou Leitor" />
                    </Tabs>
                    <Paper elevation={0} sx={{ borderRadius: 50 }}>
                        <form onSubmit={handleSubmitClient}>
                            <Grid
                                container
                                padding={3}
                                justifyContent="center"
                                alignItems="center"
                                style={{
                                    textAlign: "center",
                                    backgroundColor: theme.palette.secondary.main,
                                    borderBottomRightRadius: 20,
                                    borderBottomLeftRadius: 20,
                                }}
                            >
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
                                            value={password}
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid mb={2} xs={12} style={{ textAlign: "right", alignSelf: "flex-start" }}>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        underline="none"
                                        onClick={() => {
                                            router.push("/recuperacao-senha");
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
        </>
    );
};

export default Login;
