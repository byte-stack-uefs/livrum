"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Paper,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  styled,
  Modal,
  Typography,
} from "@mui/material";
import { Margin } from "@mui/icons-material";


const ClientRegister = () => {
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [adress, setAdress] = useState("");
  const [operationNumber, setOperationNumber] = useState("");
  const [agencyNumber, setAgencyNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const maxWidthPage = "500px";
  const [openModal, setOpenModal] = useState(false);
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

  const customStyles = (widthParam) => ({
    fontFamily: "Roboto",
    fontSize: "14px",
    width: widthParam,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitClient = (event) => {
    event.preventDefault();
    
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
          justifyContent: "center",
          height: "100%",
          flexGrow: 1,
        }}
      >
        <Tabs
          value={value}
          scrollButtons={false}
          onChange={handleChange}
          centered
          style={{ marginBottom: "16px", marginLeft: "-16px" }}
          TabIndicatorProps={{ style: { display: "none" } }}
        >
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
            style={{
              backgroundColor: "#E5E2E2",
              flexBasis: "700px",
              borderRadius: "0 0 12px 12px",
              padding: "30px",
            }}
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
                type="number"
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
                onChange={handlePasswordConfirmChange}
                error={!passwordsMatch}
                helperText={!passwordsMatch ? "As senhas não coincidem" : ""}
                style={customStyles("92%")}
                size="small"
              />
            </Grid>
            {value === 1 && (
              <>
                <Grid item xs={12}>
                  <label style={customStyles("")}>Dados bancários</label>
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
            <Grid
              item
              xs={8.3}
              spacing={2}
              style={{
                textAlign: "justify",
                alignSelf: "flex-start",
                color: "#2665BE",
                cursor: "pointer",
              }}
            >
              <FormControlLabel
                required
                control={
                  <Checkbox
                    inputProps={{ "aria-label": "controlled" }}
                    style={{ padding: 0, marginRight: "5px" }}
                  />
                }
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      marginTop="30px"
                      fontFamily="Roboto"
                      fontSize="10px" // Adjust the font size as needed
                      fontWeight="bold"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpen();
                      }}
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Li os termos e estou de acordo com as políticas de uso
                      Politicas da empresa
                    </Typography>
                  </div>
                }
              />
            </Grid>
            <Grid item xs={3}>
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

          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={customStyles("")}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Termos de Uso
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {/*termos de uso aqui*/}
              </Typography>
            </Box>
          </Modal>
        </form>
      </Box>
      <Box sx={{ marginBottom: "40px" }}></Box>
    </>
  );
};

export default ClientRegister;
// tenho que mudar as cores do botao, textfield, tab, texto de termos de uso, grid
// baixar a biblioteca de estilização da tab
