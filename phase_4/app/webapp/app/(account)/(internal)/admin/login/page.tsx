"use client";

import { theme } from "@/app/theme";
import React, { useState } from "react";
import { useUser } from "@/app/context";
import { useRouter } from "next/navigation";
import LivrumLink from "@/app/components/LivrumLink";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormProvider, useForm } from "react-hook-form";
import { login, redirectByType } from "@/app/helpers/login";
import { TextField, Button, Paper, Typography } from "@mui/material";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const methods = useForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const { updateUser } = useUser();

    const onSubmit = handleSubmit((data) => {
        setErrorMessage("");
        setLoggingIn(true);

        login(email, password)
            .then((response: any) => {
                const level = response.data.user.tipo;
                const link = redirectByType(level);
                updateUser(response.data.user);

                router.push(link);
            })
            .catch((err: string) => {
                setErrorMessage(err);
                setLoggingIn(false);
            });
    });

    return (
        <Grid container>
            <Grid xs={11} md={4} margin="auto">
                <Paper elevation={0} sx={{ backgroundColor: theme.palette.secondary.main }}>
                    <FormProvider {...methods}>
                        <form onSubmit={(e) => e.preventDefault()} noValidate autoComplete="false">
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
                                            {...register("email", { required: true })}
                                            onChange={(e) => setEmail(e.target.value)}
                                            error={errors.email ? true : false}
                                            helperText={errors.email ? "O email é obrigatório" : null}
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
                                            fullWidth
                                            size="small"
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

                                <Grid xs={12} style={{ textAlign: "right", alignSelf: "flex-start" }}>
                                    <LivrumLink href="/admin/recuperacao-senha">
                                        <Typography variant="body2" color="primary.main">
                                            Esqueceu a senha?
                                        </Typography>
                                    </LivrumLink>
                                </Grid>
                                <Grid xs={12} sm={6} md={6}>
                                    <Button disabled={loggingIn} onClick={onSubmit} fullWidth type="submit" variant="contained" color="darker">
                                        {loggingIn ? "Carregando..." : "Login"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </FormProvider>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AdminLogin;
