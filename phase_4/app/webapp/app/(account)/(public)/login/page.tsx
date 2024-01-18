"use client";

import { theme } from "@/app/theme";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Unstable_Grid2";
import useRequest from "@/app/services/requester";
import { redirectByType } from "@/app/helpers/helpers";
import { FormProvider, useForm } from "react-hook-form";
import { Tab, Tabs, TextField, Button, Paper, Typography, Link } from "@mui/material";

const Login = () => {
    const [value, setValue] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();
    const requester = useRequest();

    const methods = useForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onSubmit = handleSubmit((data) => {
        setErrorMessage("");

        requester
            .post("/auth", {
                username: email,
                password: password,
            })
            .then((response) => {
                localStorage.setItem("token", response.data.access_token);

                const level = response.data.user.tipo;
                const link = redirectByType(level);

                router.push(link);
            })
            .catch((err) => {
                let message = "Algo deu errado, tente novamente mais tarde";

                if (err?.response?.data?.detail) {
                    message = err?.response?.data?.detail;
                    setErrorMessage(message);
                }
            });
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                        <FormProvider {...methods}>
                            <form onSubmit={(e) => e.preventDefault()} noValidate autoComplete="false">
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
                                                fullWidth
                                                type="email"
                                                color="info"
                                                size="small"
                                                value={email}
                                                label="E-mail"
                                                error={errors.email ? true : false}
                                                {...register("email", { required: true })}
                                                onChange={(e) => setEmail(e.target.value)}
                                                helperText={errors.email ? "O email é obrigatório" : null}
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Senha"
                                                type="password"
                                                value={password}
                                                error={errors.password ? true : false}
                                                {...register("password", { required: true, minLength: 4 })}
                                                onChange={(e) => setPassword(e.target.value)}
                                                helperText={
                                                    errors.password
                                                        ? errors.password?.type == "required"
                                                            ? "A senha é obrigatória"
                                                            : "A senha deve ter no mínimo 4 caracteres"
                                                        : null
                                                }
                                            />
                                        </Grid>
                                        {errorMessage != "" && (
                                            <Grid xs={12} py={0}>
                                                <Typography color="error" textAlign="left">
                                                    {errorMessage}
                                                </Typography>
                                            </Grid>
                                        )}
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
                                        <Button onClick={onSubmit} fullWidth type="submit" variant="contained" color="darker">
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </FormProvider>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;
