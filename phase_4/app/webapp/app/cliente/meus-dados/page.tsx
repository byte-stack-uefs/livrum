"use client";

import Image from "next/image";
import { useState } from "react";
import Ebook from "@/app/interfaces/Ebook";
import Divider from "@/app/components/Divider";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { CloudDownload, CheckCircle, ReportProblem } from "@mui/icons-material";
import { Box, Button, InputLabel, List, ListItem, Pagination, Stack, TextField, Typography } from "@mui/material";
import { theme } from "@/app/theme";


function ClientDataContainerHeader() {
    return (
        <Grid xs={12}>
            <Grid xs={12} sx={{ fontSize: 28 }}>
                <Typography variant="h3">
                    Meus Dados
                </Typography>
            </Grid>
            <Grid xs={12}>
                <Divider height={4} width={"10%"} />
            </Grid>
        </Grid>
    );
}

function ClientDataContainer() {

    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmitClient = (event) => {
        event.preventDefault();
    };

    return (
        <Grid xs={11} sm={9} md={7} lg={5} style={{ width: '100%' }} >
            <form onSubmit={handleSubmitClient}>
                <Grid container
                    spacing={2}
                >
                    <Grid xs={6}>
                        <InputLabel htmlFor="labelName" required style={{ fontFamily: 'Lato, sans-serif',fontWeight:"bold", textAlign: 'left', color: theme.palette.dark.main }}>Nome Completo </InputLabel>
                        <TextField
                            id="labelName"
                            fullWidth
                            value={name}
                            size="small"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                                style: { backgroundColor: '#A2B0C1' },
                            }}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <InputLabel htmlFor="labelCpf" required style={{ fontFamily: 'Lato, sans-serif', fontWeight:"bold", textAlign: 'left', color: theme.palette.dark.main }}>CPF </InputLabel>
                        <TextField
                            fullWidth
                            id="labelCpf"
                            value={cpf}
                            size="small"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                                style: { backgroundColor: '#A2B0C1' },
                            }}
                        />
                    </Grid>

                    <Grid xs={6}>
                        <InputLabel htmlFor="labelBirthday" required style={{ fontFamily: 'Lato, sans-serif', fontWeight:"bold", textAlign: 'left', color: theme.palette.dark.main }}> Data de nascimento </InputLabel>
                        <TextField
                            fullWidth
                            id="labelBirthday"
                            value={birthday}
                            size="small"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                                style: { backgroundColor: '#A2B0C1' },
                            }}
                        />
                    </Grid>

                    <Grid xs={6}>
                        <InputLabel htmlFor="labelTelephone" style={{ fontFamily: 'Lato, sans-serif', fontWeight:"bold", textAlign: 'left', color: theme.palette.dark.main }}> Telefone </InputLabel>
                        <TextField
                            required
                            fullWidth
                            id="labelTelephone"
                            size="small"
                            value={telephone}
                            variant="outlined"
                            onChange={(e) => setTelephone(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        />
                    </Grid>

                    <Grid xs={12}>
                        <InputLabel htmlFor="labelEmail" style={{ fontFamily: 'Lato, sans-serif', fontWeight:"bold", textAlign: 'left', color: theme.palette.dark.main }}> E-mail </InputLabel>
                        <TextField
                            required
                            fullWidth
                            type="email"
                            size="small"
                            value={email}
                            id="labelEmail"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <InputLabel htmlFor="labelPassword" style={{ fontFamily: 'Lato, sans-serif', fontWeight:"bold", textAlign: 'left', color: theme.palette.dark.main }}> Senha </InputLabel>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            id="labelPassword"
                            type="password"
                            value={password}
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <InputLabel htmlFor="labelAddress" style={{ fontFamily: 'Lato, sans-serif', fontWeight:"bold", textAlign: 'left', color: theme.palette.dark.main }}> Endereço </InputLabel>
                        <TextField
                            required
                            fullWidth
                            type="text"
                            size="small"
                            value={address}
                            id="labelAddress"
                            variant="outlined"
                            onChange={(e) => setAddress(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        />
                    </Grid>
                    <Grid xs={11} lg={11}>
                    </Grid>
                    <Grid xs={1} lg={1}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                marginTop: "10px",
                            }}
                        >
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid >
    );
}


export default function Page() {
    return (<>
        <Grid container spacing={2}>
            <Grid xs={12} sx={{ backgroundColor: 'secondary.main', borderRadius: '16px' }}>
                <ClientDataContainerHeader></ClientDataContainerHeader>
                <ClientDataContainer></ClientDataContainer>
            </Grid>
        </Grid>
    </>);
}