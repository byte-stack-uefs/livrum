"use client";

import { theme } from "@/app/theme";
import React, { useState } from "react";
import Divider from "@/app/components/Divider";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { accountInput, agencyInput, cellphoneInput, cpfInput, operationInput } from "@/app/components/CustomInputs";

export default function Page() {
    const [cpf, setCpf] = useState("12345678912");
    const [tel, setTel] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [conta, setConta] = useState("");
    const [agencia, setAgencia] = useState("");
    const [endereco, setEndereco] = useState("");
    const [operacao, setOperacao] = useState("");

    const handleCpfInputChange = (event) => setCpf(event.target.value);
    const handleTelInputChange = (event) => setTel(event.target.value);
    const handleNomeInputChange = (event) => setNome(event.target.value);
    const handleEmailInputChange = (event) => setEmail(event.target.value);
    const handleContaInputChange = (event) => setConta(event.target.value);
    const handleAgenciaInputChange = (event) => setAgencia(event.target.value);
    const handleEnderecoInputChange = (event) => setEndereco(event.target.value);
    const handleOperacaoInputChange = (event) => setOperacao(event.target.value);

    function dados(event) {
        event.preventDefault();
        if (nome !== "" && email !== "" && cpf !== "" && tel !== "" && endereco !== "" && agencia !== "" && conta !== "") {
            console.log("sucesso");
        } else {
            console.log("erro");
        }
    }

    return (
        <Grid container>
            <Grid xs={12}>
                <Typography color="darker.main" variant="h4">
                    Meus Dados
                </Typography>
            </Grid>
            <Grid xs={12} container spacing={2} mt={2}>
                <Grid xs={12}>
                    <InputLabel htmlFor="labelName" required style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                        Nome Completo
                    </InputLabel>
                    <TextField
                        InputProps={{
                            sx: { backgroundColor: `${theme.palette.darker.main}40` },
                        }}
                        id="labelName"
                        fullWidth
                        value={nome}
                        size="small"
                        variant="outlined"
                        disabled
                    />
                </Grid>
                <Grid xs={12}>
                    <InputLabel htmlFor="labelEmail" required style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                        Email
                    </InputLabel>
                    <TextField
                        InputProps={{
                            sx: { backgroundColor: `${theme.palette.darker.main}40` },
                        }}
                        id="labelEmail"
                        fullWidth
                        value={email}
                        size="small"
                        variant="outlined"
                        disabled
                    />
                </Grid>
                <Grid xs={12} container>
                    <Grid xs={6}>
                        <InputLabel htmlFor="labelCpf" required style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            CPF
                        </InputLabel>
                        <TextField
                            InputProps={{
                                sx: { backgroundColor: `${theme.palette.darker.main}40` },
                                inputComponent: cpfInput as any,
                            }}
                            id="labelCpf"
                            fullWidth
                            value={cpf}
                            size="small"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid xs={6}>
                        <InputLabel htmlFor="labelTelephone" style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            Telefone
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            id="labelTelephone"
                            size="small"
                            value={tel}
                            variant="outlined"
                            onChange={handleTelInputChange}
                            InputProps={{
                                sx: { backgroundColor: "white" },
                                inputComponent: cellphoneInput as any,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid xs={12}>
                    <InputLabel htmlFor="labelAddress" style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                        Endereço
                    </InputLabel>
                    <TextField
                        required
                        fullWidth
                        id="labelAddress"
                        size="small"
                        value={endereco}
                        variant="outlined"
                        onChange={handleEnderecoInputChange}
                        InputProps={{
                            sx: { backgroundColor: "white" },
                        }}
                    />
                </Grid>
                <Grid xs={12}>
                    <Divider width="90%" style={{ margin: "auto" }} />
                </Grid>
                <Grid xs={12} container>
                    <Grid xs={4}>
                        <InputLabel htmlFor="labelOperation" style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            Operação
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            id="labelOperation"
                            size="small"
                            value={operacao}
                            variant="outlined"
                            onChange={handleOperacaoInputChange}
                            InputProps={{
                                sx: { backgroundColor: "white" },
                                inputComponent: operationInput as any,
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <InputLabel htmlFor="labelAgency" style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            Agência
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            id="labelAgency"
                            size="small"
                            value={agencia}
                            variant="outlined"
                            onChange={handleAgenciaInputChange}
                            InputProps={{
                                sx: { backgroundColor: "white" },
                                inputComponent: agencyInput as any,
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <InputLabel htmlFor="labelAccount" style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            Conta
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            id="labelAccount"
                            size="small"
                            value={conta}
                            variant="outlined"
                            onChange={handleContaInputChange}
                            InputProps={{
                                sx: { backgroundColor: "white" },
                                inputComponent: accountInput as any,
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} container mt={3} justifyContent="end">
                <Grid xs={12} md={2} textAlign="right">
                    <Button fullWidth variant="contained" color="primary">
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        // <Box style={{ display: "flex", marginLeft: "150px", width: "100%", height: "100vh", flexDirection: "column" }}>
        //     <Box marginTop="40px">
        //         <label style={{ color: "#1E3345", fontSize: "22px", fontFamily: "roboto", fontWeight: "bold" }}>Dados do Autor</label>
        //     </Box>

        //     <label style={{ marginTop: "25px", color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>Nome Completo:</label>
        //     <input
        //         onChange={handleNomeInputChange}
        //         type="text"
        //         style={{ display: "flex", width: "500px", height: "30px", border: "2px solid #d9dcde" }}
        //     />
        //     <label style={{ marginTop: "20px", color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>E-mail:</label>
        //     <input
        //         onChange={handleEmailInputChange}
        //         type="text"
        //         style={{ display: "flex", width: "500px", height: "30px", border: "2px solid #d9dcde" }}
        //     />

        //     <Box flexDirection="row" display="flex">
        //         <Box flexDirection="column" marginTop="20px">
        //             <label style={{ color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>CPF:</label>
        //             <input
        //                 onChange={handleCpfInputChange}
        //                 type="text"
        //                 style={{ display: "flex", width: "200px", height: "30px", border: "2px solid #d9dcde" }}
        //             />
        //         </Box>

        //         <Box marginLeft="100px" flexDirection="column" marginTop="20px">
        //             <label style={{ color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>Telefone:</label>
        //             <input
        //                 onChange={handleTelInputChange}
        //                 type="text"
        //                 style={{ display: "flex", width: "200px", height: "30px", border: "2px solid #d9dcde" }}
        //             />
        //         </Box>
        //     </Box>

        //     <label style={{ marginTop: "20px", color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>Endereço:</label>
        //     <input
        //         onChange={handleEnderecoInputChange}
        //         type="text"
        //         style={{ display: "flex", width: "500px", height: "30px", border: "2px solid #d9dcde" }}
        //     />
        //     <hr style={{ color: "#1E3345", width: "500px", margin: "5px" }} />

        //     <label style={{ color: "#1E3345", fontSize: "20px", fontFamily: "roboto", fontWeight: "bold" }}>Dados Bancários</label>

        //     <Box flexDirection="row" display="flex">
        //         <Box flexDirection="column" marginTop="10px">
        //             <label style={{ color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>Agência</label>
        //             <input
        //                 onChange={handleAgenciaInputChange}
        //                 type="text"
        //                 style={{ display: "flex", width: "200px", height: "30px", border: "2px solid #d9dcde" }}
        //             />
        //         </Box>

        //         <Box marginLeft="100px" flexDirection="column" marginTop="10px">
        //             <label style={{ color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>Conta</label>
        //             <input
        //                 onChange={handleContaInputChange}
        //                 type="text"
        //                 style={{ display: "flex", width: "200px", height: "30px", border: "2px solid #d9dcde" }}
        //             />
        //         </Box>
        //     </Box>

        //     <Box flexDirection="row" display="flex">
        //         <Box flexDirection="column" marginTop="10px">
        //             <Button onClick={dados} style={{ backgroundColor: "#1E3345", color: "white" }}>
        //                 Salvar
        //             </Button>
        //         </Box>
        //     </Box>
        // </Box>
    );
}
