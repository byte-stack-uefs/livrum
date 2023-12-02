"use client";
import React, { useState } from "react";
import Footer from "../components/Footer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { CheckBox } from "@mui/icons-material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
  const fontText = {
    fontFamily: 'Roboto',
    fontSize: '14px', 
    margin: '10px',
  };
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
          margin: "auto", // Centraliza horizontalmente
          maxWidth: "500px",
          justifyContent: "center",
          height: "100%", // Adiciona altura para centralizar verticalmente
          flexGrow: 1,
        }}
      >
        <form onSubmit={handleSubmitClient}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab style={fontText} label="Cliente" />
            <Tab style={fontText} label="Autor" />
          </Tabs>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={7}></Grid>
            <Grid item xs={5}>
              <label style={fontText}>Dados obrigatórios* </label>
            </Grid>
            <Grid item xs={7}>
              <TextField
                label="Nome Completo*"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                style={fontText}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="CPF*"
                variant="outlined"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                fullWidth
                margin="normal"
                style={fontText}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                label="Data de nascimento*"
                variant="outlined"
                value={birthday}
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
                style={fontText}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Telefone*"
                variant="outlined"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                fullWidth
                margin="normal"
                style={fontText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="E-mail*"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                style={fontText}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Senha*"
                variant="outlined"
                value={password}
                type="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                style={fontText}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Confirme sua senha*"
                variant="outlined"
                value={passwordConfirm}
                type="password"
                fullWidth
                onChange={(e) => setPasswordConfirm(e.target.value)}
                margin="normal"
                style={fontText}
              />
            </Grid>
            {value === 1 && (
              <>
                <Grid item xs={12}>
                  <label style={fontText}>
                    Dados bancários
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Número de operação"
                    variant="outlined"
                    value={operationNumber}
                    onChange={(e) => setOperationNumber(e.target.value)}
                    margin="normal"
                    fullWidth
                    style={fontText}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Número da agência"
                    variant="outlined"
                    value={agencyNumber}
                    onChange={(e) => setAgencyNumber(e.target.value)}
                    margin="normal"
                    fullWidth
                    style={fontText}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Número da conta"
                    variant="outlined"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    margin="normal"
                    fullWidth
                    style={fontText}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={9}>
              <FormGroup>
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Li os termos e estou de acordo com as politicas de uso"
                  style={fontText}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={fontText}
              >
                Prosseguir
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default ClientRegister;
// tenho que mudar as cores do botao, textfield, tab, texto de termos de uso, grid
// baixar a biblioteca de estilização da tab
