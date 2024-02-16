"use client";

import { theme } from "@/app/theme";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Divider from "@/app/components/Divider";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import useRequest from "@/app/services/requester";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TextField, Button, Paper, Typography, InputLabel, Modal, Alert } from "@mui/material";

const AdminPasswordRestore = () => {
    const [value, setValue] = useState(0);
    const [email, setEmail] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();
    const requester = useRequest();

    const validateEmail = (email) => {
        const isValidEmail = /\S+@\S+\.\S+/.test(email);

        setButtonDisabled(!isValidEmail);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCloseModal = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
        setOpenModal(false);
    };

    const resquestRecoverPassword = () => {
        return new Promise((resolve, reject) => {
            requester
                .patch("/account/recuperar-senha", { email: email })
                .then(() => {
                    resolve(true);
                })
                .catch((err: any) => {
                    reject(err.response.data.detail);
                });
        });
    };

    const handleSubmitClient = (event) => {
        event.preventDefault();

        const isValidEmail = /\S+@\S+\.\S+/.test(email);

        setError(null);

        if (isValidEmail) {
            setButtonDisabled(true);
            resquestRecoverPassword()
                .then(() => {
                    setOpenModal(true);
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => {
                    setButtonDisabled(false);
                });
        }
    };

    return (
        <Grid container direction="column">
            <Grid xs={11} md={4} sx={{ margin: "auto", mb: "30px" }} textAlign="center">
                <Typography sx={{ color: "black" }} variant="h6">
                    Recuperação de senha
                </Typography>
                <Divider width={"35%"} style={{ margin: "auto" }} />
            </Grid>
            <Grid xs={11} sm={9} md={6} margin="auto">
                <Paper elevation={0} style={{ padding: "30px", backgroundColor: theme.palette.secondary.main }}>
                    <Paper>
                        <form onSubmit={handleSubmitClient}>
                            <Grid container padding={3} spacing={3} justifyContent="center" alignItems="center">
                                <Grid xs={12}>
                                    <Typography variant="h6" fontWeight="bold" style={{ textAlign: "center", color: theme.palette.dark.main }}>
                                        Esqueceu sua senha?
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Typography variant="caption" fontWeight="regular" color="black" style={{ textAlign: "left" }}>
                                        Confirme o endereço de e-mail utilizado em seu cadastro, e enviaremos sua senha novamente
                                    </Typography>
                                </Grid>
                                <Grid container spacing={2} xs={12} py={3} justifyContent="center" alignItems="center" style={{ textAlign: "center" }}>
                                    <Grid xs={12} sm={8}>
                                        <InputLabel htmlFor="labelEmail" style={{ textAlign: "left", color: theme.palette.primary.main }}>
                                            E-mail{" "}
                                        </InputLabel>
                                        <TextField
                                            required
                                            id="labelEmail"
                                            variant="outlined"
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                validateEmail(e.target.value);
                                            }}
                                            fullWidth
                                            style={{ borderColor: theme.palette.primary.main }}
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                                {error && (
                                    <>
                                        <Grid xs={8}>
                                            <Alert variant="filled" severity="error">
                                                {error}
                                            </Alert>
                                        </Grid>
                                        <Grid xs={12}></Grid>
                                    </>
                                )}
                                <Grid xs={6} sm={4}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            router.push("/admin/login");
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                                <Grid xs={6} sm={4}>
                                    <Button fullWidth type="submit" variant="contained" color="primary" onClick={handleSubmitClient} disabled={isButtonDisabled}>
                                        Enviar
                                    </Button>
                                </Grid>
                                <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
                                    <Paper
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            padding: "30px",
                                            backgroundColor: "#FFF",
                                        }}
                                    >
                                        <Grid container direction="column" alignItems="center" justifyContent="center">
                                            <Grid xs={12} md={4} margin="auto" style={{ textAlign: "center" }}>
                                                <CheckCircleOutlineIcon sx={{ fontSize: 50, color: "green" }} />
                                            </Grid>
                                            <Grid xs={12} md={4} margin="auto" style={{ textAlign: "center", width: "100%" }}>
                                                <Typography variant="h6">E-mail enviado com sucesso</Typography>
                                            </Grid>
                                            <Grid xs={12} md={4} margin="auto" style={{ textAlign: "center", width: "100%" }}>
                                                <Typography variant="caption">Caso o email não apareça na caixa de entrada, verifique a caixa de spam</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Modal>
                            </Grid>
                        </form>
                    </Paper>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AdminPasswordRestore;
