"use client";

import { useState } from "react";
import { theme } from "@/app/theme";
import Divider from "@/app/components/Divider";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { cellphoneInput, cpfInput } from "@/app/components/CustomInputs";

function ClientDataContainerHeader() {
    return (
        <Grid xs={12}>
            <Grid xs={12} sx={{ fontSize: 28 }}>
                <Typography variant="h3">Meus Dados</Typography>
            </Grid>
            <Grid xs={12}>
                <Divider height={4} width={"10%"} />
            </Grid>
        </Grid>
    );
}

function ClientDataContainer() {
    const [cpf, setCpf] = useState("12345678912");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("78912345678");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmitClient = (event) => {
        event.preventDefault();
    };

    return (
        <Grid xs={11} sm={9} md={7} lg={5} style={{ width: "100%" }}>
            <form onSubmit={handleSubmitClient}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <InputLabel htmlFor="labelName" required style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            Nome Completo{" "}
                        </InputLabel>
                        <TextField
                            InputProps={{
                                sx: { backgroundColor: `${theme.palette.darker.main}40` },
                            }}
                            id="labelName"
                            fullWidth
                            value={name}
                            size="small"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <InputLabel htmlFor="labelCpf" required style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            CPF{" "}
                        </InputLabel>
                        <TextField
                            InputProps={{
                                sx: { backgroundColor: `${theme.palette.darker.main}40` },
                                inputComponent: cpfInput as any,
                            }}
                            fullWidth
                            id="labelCpf"
                            value={cpf}
                            size="small"
                            variant="outlined"
                            disabled
                        />
                    </Grid>

                    <Grid xs={12} md={6}>
                        <InputLabel
                            htmlFor="labelBirthday"
                            required
                            style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}
                        >
                            {" "}
                            Data de nascimento{" "}
                        </InputLabel>
                        <TextField
                            InputProps={{
                                sx: { backgroundColor: `${theme.palette.darker.main}40` },
                            }}
                            fullWidth
                            id="labelBirthday"
                            value={birthday}
                            size="small"
                            variant="outlined"
                            disabled
                        />
                    </Grid>

                    <Grid xs={12} md={6}>
                        <InputLabel htmlFor="labelTelephone" style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            {" "}
                            Telefone{" "}
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            id="labelTelephone"
                            size="small"
                            value={telephone}
                            variant="outlined"
                            onChange={(e) => setTelephone(e.target.value)}
                            InputProps={{
                                sx: { backgroundColor: "white" },
                                inputComponent: cellphoneInput as any,
                            }}
                        />
                    </Grid>
                    <Grid xs={12}></Grid>

                    <Grid xs={12} md={6}>
                        <InputLabel htmlFor="labelEmail" style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            {" "}
                            E-mail{" "}
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            type="email"
                            size="small"
                            value={email}
                            id="labelEmail"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                sx: { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <InputLabel htmlFor="labelPassword" style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            {" "}
                            Senha{" "}
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            id="labelPassword"
                            type="password"
                            value={password}
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                sx: { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <InputLabel htmlFor="labelAddress" style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            {" "}
                            Endereço{" "}
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            type="text"
                            size="small"
                            value={address}
                            id="labelAddress"
                            variant="outlined"
                            onChange={(e) => setAddress(e.target.value)}
                            InputProps={{
                                sx: { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid xs={12} lg={10}></Grid>
                    <Grid xs={12} lg={2}>
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
        </Grid>
    );
}

export default function Page() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={12} sx={{ backgroundColor: "secondary.main", borderRadius: "16px" }}>
                    <ClientDataContainerHeader></ClientDataContainerHeader>
                    <ClientDataContainer></ClientDataContainer>
                </Grid>
            </Grid>
        </>
    );
}
