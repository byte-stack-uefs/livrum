"use client";

import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Link, FormControl, InputLabel, Modal} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { theme } from "@/app/theme";
import { Primary } from "@/stories/Button.stories";
import Divider from "@/app/components/Divider";

const UserPasswordRestore = () => {
    const [value, setValue] = useState(0);
    const [email, setEmail] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    const validateEmail = (email) => {

        const isValidEmail = /\S+@\S+\.\S+/.test(email);

        setButtonDisabled(!isValidEmail);

    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSubmitClient = (event) => {
        event.preventDefault();

        const isValidEmail = /\S+@\S+\.\S+/.test(email);

        if (isValidEmail) {

            setOpenModal(true);

        }
    };

    return (
        <Grid container direction="column">
            <Grid xs={11} md={4} sx={{ margin: "auto", mb: "30px" }} textAlign="center">
                <Typography sx={{ color: "black" }} variant="h6">
                    Recuperação de senha
                </Typography>
                <Divider width={"35%"} style={{ margin: "auto" }} /></Grid>
            <Grid xs={11} md={4} marginTop={10} margin="auto">
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
                                <Grid xs={8} md={8}>
                                    <Button fullWidth type="submit" variant="contained" color="primary" onClick={handleSubmitClient} disabled={isButtonDisabled}>
                                        Enviar
                                    </Button>
                                </Grid>

                                <Modal
                                    open={openModal}
                                    onClose={handleCloseModal}
                                    aria-labelledby="modal-title"
                                    aria-describedby="modal-description"
                                    BackdropClick={true}
                                >
                                    <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '30px', backgroundColor: '#FFF' }}>
                                        <CheckCircleOutlineIcon sx={{ fontSize: 50, color: 'white', backgroundColor:"" }} />
                                        <Typography id="modal-title" variant="h6" component="h2">
                                            E-mail enviado com sucesso
                                        </Typography>
                                        <Typography id="modal-subtitle" variant="h6" component="h2">
                                            Caso o email não apareça na caixa de entrada, verifique a caixa de spam
                                        </Typography>
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

export default UserPasswordRestore