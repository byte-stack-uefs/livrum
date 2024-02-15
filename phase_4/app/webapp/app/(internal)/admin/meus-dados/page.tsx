"use client";
import React, { useState, useEffect } from "react";
import { Button, InputAdornment, Typography, FormControl, IconButton, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@/app/components/Divider";
import { theme } from "@/app/theme";
// @ts-ignore
import BootstrapInput from "@/app/theme";
import useRequest from '@/app/services/requester';
import { UserAttributes } from '@/app/interfaces/User';
import { alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";

import InputBase from "@mui/material/InputBase";
const AdminData = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [oldPassword, setOldPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [creationError, setCreationError] = useState("");
    const [hasCreationFailed, setHasCreationFailed] = useState(false);
    const [hasCreationSucess, setHasCreationSucess] = useState(false);
    const [creationSucess, setCreationSucess] = useState("");
    const requester = useRequest();

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

    useEffect(() => {
        getDataUserObject();
    }, [])

    const getDataUserObject = () => {

        requester.get(`/user/`).then((response: { data: UserAttributes; }) => {
            const userData = response.data;
            setName(userData.nome);
            setEmail(userData.email);
            setOldPassword(userData.senha);

        }).catch((err: any) => { })
        
    }

    const handleSubmitClient = async (event: { preventDefault: () => void; }) => {
        setHasCreationFailed(false);
        setCreationError("");
        setHasCreationSucess(false);
        setCreationSucess(""); 
        const validationError = validateFields();
        if (validationError) {
            setHasCreationFailed(true);
            setCreationError(validationError);
            return;
        }
        await requester.patch(`/user/`,{nome: name, email:email, senha:password}).then((response: any) => {
            getDataUserObject();
            setHasCreationSucess(true);
            setCreationSucess("Atualização efetuada com sucesso"); 
        }).catch((err: any) => {
            
            setHasCreationFailed(true);
            setCreationError("Não foi possível realizar a atualização dos dados"); 
        
        })
    };

    const validateFields = () => {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isPasswordValid = password.length >= 4;
    
        if (!isEmailValid) {
            return "Por favor, preencha o e-mail corretamente.";
        }
    
        if (!isPasswordValid) {
            return "A senha deve ter no mínimo 4 caracteres.";
        }
    
        return null;
    };
   
    return (
        <form onSubmit={handleSubmitClient}>
            <Grid xs={11} sm={9} md={7} lg={5} margin="auto">
                <Typography
                    variant="h5"
                    fontWeight="semi-bold"
                    style={{ textAlign: "left", color: theme.palette.dark.main, marginTop: "20px", paddingLeft: 8, marginBottom: 8 }}
                >
                    Dados administrador
                </Typography>
                <FormControl fullWidth>
                    <Grid
                        container
                        sx={{
                            margin: "auto",
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20,
                        }}
                        spacing={2}
                    >
                        <Grid xs={12} md={6}>
                            <div>
                                <strong>Nome:</strong>
                            </div>
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

                        <Grid xs={12} md={6}>
                            <div>
                                <strong>Email:</strong>
                            </div>
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
                        <Grid xs={12} sx={{ borderBottom: "1px solid black", marginBottom: 2, marginX: 1 }}></Grid>
                        <Grid xs={6}>
                            <div>
                                <strong>Senha Atual:</strong>
                            </div>
                            <TextField
                                fullWidth
                                size="small"
                                type={showPassword ? "text" : "password"}
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
                        <Grid container xs={12}>
                            <Grid xs={6}>
                                <div>
                                    <strong>Nova Senha:</strong>
                                </div>
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    type={showPassword ? "text" : "password"}
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
                                <div>
                                    <strong>Confirmar Senha:</strong>
                                </div>
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    type={showPassword ? "text" : "password"}
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
                        </Grid>
                        {hasCreationFailed && (
                                <Grid xs={12}>
                                    <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                                        {creationError}
                                    </Alert>
                                </Grid>
                        )}
                        {hasCreationSucess && (
                        <Grid xs={12}>
                            <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
                                    {creationSucess}
                            </Alert>
                        </Grid>
                        )}
                        <Grid xs={12} sm={6} md={4} lg={2}>
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
    );
};

export default AdminData;
