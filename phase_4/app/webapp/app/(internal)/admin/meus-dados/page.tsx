"use client";
import React, { useState } from "react";
import {
    Tab,
    Tabs,
    Button,
    styled,
    Dialog,
    Checkbox,
    TextField,
    Typography,
    DialogTitle,
    FormControl,
    DialogContent,
    DialogActions,
    FormControlLabel,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@/app/components/Divider";
import { theme } from "@/app/theme";

const ClientRegister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [oldPassword, setOldPassword] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // Verificar correspondência de senhas quando a senha é alterada
        setPasswordsMatch(e.target.value === passwordConfirm);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
        // Verificar correspondência de senhas quando a senha de confirmação é alterada
        setPasswordsMatch(e.target.value === password);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmitClient = (event) => {
        event.preventDefault();
    };

    return (
        <>  
            
                <Grid xs={11} sm={9} md={7} lg={5} margin="auto" >
                    <Typography variant="h4" fontWeight="semi-bold" style={{ textAlign: "center", color: theme.palette.dark.main }}>
                        Dados administrador 
                    </Typography>
                    <FormControl fullWidth>
                        <Grid
                            container
                            sx={{
                                margin: "auto",
                                padding: 3,
                                borderBottomRightRadius: 20,
                                borderBottomLeftRadius: 20,
                            }}
                            spacing={2}
                        >
                            <Grid xs={7}></Grid>
                          
                            <Grid xs={7}>
                                <TextField
                                    required
                                    fullWidth
                                    value={name}
                                    size="small"
                                    variant="outlined"
                                    label="Nome Completo"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                           
                           

                    

                            <Grid xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="email"
                                    size="small"
                                    value={email}
                                    label="E-mail"
                                    variant="outlined"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    label="Senha"
                                    type="password"
                                    value={password}
                                    variant="outlined"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    type="password"
                                    variant="outlined"
                                    value={passwordConfirm}
                                    error={!passwordsMatch}
                                    label="Confirme sua senha"
                                    onChange={handlePasswordConfirmChange}
                                    helperText={!passwordsMatch ? "As senhas não coincidem" : ""}
                                />
                            </Grid>

        
                           
                            <Grid xs={12} lg={3}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{
                                        marginTop: "10px",
                                    }}
                                >
                                    Prosseguir
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>

                </Grid>
        </>
    );
};

export default ClientRegister;
// tenho que mudar as cores do botao, textfield, tab, texto de termos de uso, grid
// baixar a biblioteca de estilização da tab
