"use client";
import React, { useState } from "react";
import {
    TextField, Button, Tabs, Tab, Box, Paper, Grid, FormGroup, FormControlLabel, Checkbox, styled
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
const ClientRegister = () => {
    const [value, setValue] = useState(0);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [telephone, setTelephone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [adress, setAdress] = useState("");
    const [operationNumber, setOperationNumber] = useState("");
    const [agencyNumber, setAgencyNumber] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const maxWidthPage = "500px";
    const customStyles = (widthParam) => ({
        fontFamily: 'Roboto',
        fontSize: '14px',
        margin: 0, 
        width: widthParam
    });
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmitClient = (event) => {
        event.preventDefault();
        console.log("Nome Completo:", name);
        console.log("CPF:", cpf);
        console.log("Data de nascimento:", birthday);
        console.log("Telefone", telephone);
        console.log("Email:", email);
        console.log("Senha:", password);
        console.log("Confirme sua senha:", passwordConfirm);
        console.log("Endereço:", adress);
        console.log("Número de operação:", operationNumber);
        console.log("Número de agência:", agencyNumber);
        console.log("Número da conta:", accountNumber);
    };

    return (
        <>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "auto",
                    maxWidth: "500px",
                    justifyContent: "center",
                    height: "100%", 
                    flexGrow: 1,
                    
                }}

            >
                <Tabs value={value} scrollButtons={false} onChange={handleChange} centered style={{ marginBottom: "16px", marginLeft: "-16px"}} TabIndicatorProps={{ style: { display: 'none'  }  }} >
                <Tab
                    label="Cliente"
                    sx={{
                    borderRadius: "12px 0 0 0", // Ajuste os valores conforme necessário
                        }}
                />
                <Tab
                    label="Autor"
                    sx={{
                    borderRadius: "0 12px 0 0", // Ajuste os valores conforme necessário
                    }}
                />
                </Tabs>
                <form onSubmit={handleSubmitClient}> 
    

              
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        style={{ backgroundColor: '#E5E2E2', flexBasis: '500px', borderRadius: "0 0 12px 12px" , padding: '30px' }}
                    >
                        <Grid item xs={7}></Grid>
                        <Grid item xs={5}>
                            <label style={customStyles("")}>Dados obrigatórios* </label>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                required
                                label="Nome Completo"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={customStyles("90%")}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                required
                                label="CPF"
                                variant="outlined"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                style={customStyles("90%")}
                                size="small"
                            />
                        </Grid>
    
                        <Grid item xs={7}>
                            <TextField
                                required
                                label="Telefone"
                                variant="outlined"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                                style={customStyles("90%")}
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <TextField
                                required
                                label="Data de nascimento"
                                variant="outlined"
                                value={birthday}
                                type="date"
                                onChange={(e) => setBirthday(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                style={customStyles("90%")}
                                size="small"
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="E-mail"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={customStyles("96%")}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="Senha"
                                variant="outlined"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                style={customStyles("92%")}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="Confirme sua senha"
                                variant="outlined"
                                value={passwordConfirm}
                                type="password"
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                style={customStyles("92%")}
                                size="small"
                            />
                        </Grid>
                        {value === 1 && (
                            <>
                                <Grid item xs={12}>
                                    <label style={customStyles("")}>
                                        Dados bancários
                                    </label>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        label="Operação"
                                        variant="outlined"
                                        value={operationNumber}
                                        onChange={(e) => setOperationNumber(e.target.value)}
                                        style={customStyles("90%")}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        label="Agência"
                                        variant="outlined"
                                        value={agencyNumber}
                                        onChange={(e) => setAgencyNumber(e.target.value)}
                                        style={customStyles("90%")}
                                        size="small"    
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Conta"
                                        variant="outlined"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        style={customStyles("92%")}
                                        size="small"
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={8.4}>
                            <FormGroup>
                                <FormControlLabel
                                    required
                                    control={<Checkbox />}
                                    label="Li os termos e estou de acordo com as politicas de uso"
                                    style={customStyles("")}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={3.6}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={customStyles("")}
                            >
                                Prosseguir
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Box sx={{marginBottom: "40px"}}>



            </Box>
        </>
    );
};

export default ClientRegister;
// tenho que mudar as cores do botao, textfield, tab, texto de termos de uso, grid
// baixar a biblioteca de estilização da tab
