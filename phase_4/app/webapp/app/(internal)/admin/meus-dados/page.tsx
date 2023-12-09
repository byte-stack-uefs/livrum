"use client";
import React, { useState } from "react";
import {
    Tab,
    Tabs,
    Button,
    styled,
    Dialog,
    Checkbox,
    InputAdornment,
    Typography,
    DialogTitle,
    FormControl,
    DialogContent,
    DialogActions,
    FormControlLabel,
    IconButton,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@/app/components/Divider";
import { theme } from "@/app/theme";
// @ts-ignore
import BootstrapInput from "@/app/theme";

import { alpha } from '@mui/material/styles';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';

import InputBase from '@mui/material/InputBase';
const ClientRegister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [oldPassword, setOldPassword] = useState("");

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === passwordConfirm);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
       
        setPasswordsMatch(e.target.value === password);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid xs={11} sm={9} md={7} lg={5} margin="auto" >
                    <Typography variant="h5" fontWeight="semi-bold" style={{ textAlign: "left", color: theme.palette.dark.main, marginTop: "20px", marginLeft: "30px" }}>
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
                                <div><strong>Nome:</strong></div>
                                <TextField
                                    required
                                    fullWidth
                                    value={name}
                                    size="small"
                                    variant="outlined"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={name}
                                />



                            </Grid>

                            <Grid xs={7}>
                                <div><strong>Email:</strong></div>
                                <TextField
                                    required
                                    fullWidth
                                    type="email"
                                    size="small"
                                    value={email}
                                    variant="outlined"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={email}
                                />
                            </Grid>
                            <Grid xs={12} style={{ borderBottom: '1px solid black', height: '1px' }}>

                            </Grid>
                            <Grid xs={12}>
                                <div><strong>Senha Atual:</strong></div>
                                <TextField

                                    size="small"
                                    type={showPassword ? 'text' : 'password'}
                                    value={oldPassword}
                                    placeholder={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <div><strong>Nova Senha :</strong></div>
                                <TextField
                                    size="small"

                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <div><strong>Confirmar Senha:</strong></div>
                                <TextField
                                    size="small"

                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordConfirm}
                                    onChange={handlePasswordConfirmChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
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
                                        backgroundColor: theme.palette.dark.main,
                                    }}
                                >
                                    Salvar
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>

                </Grid>
            </form>
        </>
    );
};

export default ClientRegister;
// tenho que mudar as cores do botao, textfield, tab, texto de termos de uso, grid
// baixar a biblioteca de estilização da tab
