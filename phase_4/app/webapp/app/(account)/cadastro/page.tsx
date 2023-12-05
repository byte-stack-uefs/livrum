"use client";
import React, { useState } from "react";
import {
    Tab,
    Box,
    Tabs,
    // Grid,
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

const ClientRegister = () => {
    const maxWidthPage = "500px";
    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [value, setValue] = useState(0);
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [agencyNumber, setAgencyNumber] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [operationNumber, setOperationNumber] = useState("");

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        "& .MuiDialogContent-root": {
            padding: theme.spacing(2),
        },
        "& .MuiDialogActions-root": {
            padding: theme.spacing(1),
        },
    }));

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
    const handleOpen = () => {
        setOpenModal(true);
    };

    // Função para fechar o modal
    const handleClose = () => {
        setOpenModal(false);
    };
    const StyledDialogTitle = styled(DialogTitle)({
        m: 0,
        p: 2,
        textAlign: "center",
        backgroundColor: "#E5E2E2",
        fontFamily: "Roboto",
        fontSize: "20px",
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmitClient = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Grid container>
                <Grid xs={11} sm={9} md={7} lg={5} margin="auto">
                    <Tabs
                        value={value}
                        variant="fullWidth"
                        scrollButtons={false}
                        onChange={handleChange}
                        centered
                        TabIndicatorProps={{ style: { display: "none" } }}
                    >
                        <Tab label="Cliente" />
                        <Tab label="Autor" />
                    </Tabs>
                    <FormControl fullWidth>
                        <Grid
                            container
                            sx={{
                                backgroundColor: "#E5E2E2",
                                margin: "auto",
                                padding: 3,
                                borderBottomRightRadius: 20,
                                borderBottomLeftRadius: 20,
                            }}
                            spacing={2}
                        >
                            <Grid xs={7}></Grid>
                            <Grid xs={5} sx={{ textAlign: "right" }}>
                                <label>Dados obrigatórios *</label>
                            </Grid>
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
                            <Grid xs={5}>
                                <TextField
                                    required
                                    fullWidth
                                    label="CPF"
                                    value={cpf}
                                    size="small"
                                    type="number"
                                    variant="outlined"
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </Grid>

                            <Grid xs={5}>
                                <TextField
                                    required
                                    fullWidth
                                    type="date"
                                    size="small"
                                    value={birthday}
                                    variant="outlined"
                                    label="Data de nascimento"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </Grid>

                            <Grid xs={7}>
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    label="Telefone"
                                    value={telephone}
                                    variant="outlined"
                                    onChange={(e) => setTelephone(e.target.value)}
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

                            <Grid xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="text"
                                    size="small"
                                    value={address}
                                    label="Endereço"
                                    variant="outlined"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>
                            {value === 1 && (
                                <>
                                    <Grid xs={12}>
                                        <Typography variant="h6">Dados bancários</Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Operação"
                                            variant="outlined"
                                            value={operationNumber}
                                            onChange={(e) => setOperationNumber(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid xs={4}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Agência"
                                            variant="outlined"
                                            value={agencyNumber}
                                            onChange={(e) => setAgencyNumber(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid xs={4}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Conta"
                                            variant="outlined"
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid
                                xs={12}
                                lg={9}
                                style={{
                                    color: "#2665BE",
                                    cursor: "pointer",
                                }}
                            >
                                <FormControlLabel
                                    required
                                    control={<Checkbox inputProps={{ "aria-label": "controlled" }} />}
                                    label={
                                        <>
                                            <span>Li os termos e estou de acordo com as </span>
                                            <span
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpenModal(true);
                                                }}
                                                style={{ textDecoration: "underline" }}
                                            >
                                                políticas de privacidade
                                            </span>
                                        </>
                                    }
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

                    <BootstrapDialog
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <StyledDialogTitle id="customized-dialog-title">
                            <strong>Políticas de Privacidade</strong>
                        </StyledDialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                Agradecemos por utilizar nossos serviços. Esta Política de Privacidade descreve como coletamos, usamos, compartilhamos
                                e protegemos suas informações quando você utiliza nossos produtos e serviços. Ao acessar ou utilizar nossos Serviços,
                                você concorda com os termos desta Política de Privacidade. Se você não concorda com os termos desta política, não
                                utilize nossos Serviços.
                            </Typography>
                            <Typography gutterBottom>Se tiver qualquer problema, não se acanhe, contate Almir</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} sx={{ backgroundColor: "#E5E2E2", color: "black" }}>
                                Fechar
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </Grid>
            </Grid>
        </>
    );
};

export default ClientRegister;
// tenho que mudar as cores do botao, textfield, tab, texto de termos de uso, grid
// baixar a biblioteca de estilização da tab
