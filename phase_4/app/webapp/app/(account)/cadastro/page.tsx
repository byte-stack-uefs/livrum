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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
  const customStyles = (widthParam) => ({
    fontFamily: "Roboto",
    fontSize: "14px",
    width: widthParam,
    "@media (max-width: 600px)": {
      fontSize: "12px",
    },
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
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
          width: "600px",
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
              borderRadius: "12px 0 0 0",
              "@media (max-width: 600px)": {
                borderRadius: "12px",
              },
            }}
          />

          <Tab
            label="Autor"
            sx={{
              borderRadius: "0 12px 0 0",
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
                      fontSize="10px"
                      fontWeight="bold"
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        "@media (max-width: 600px)": {
                          fontSize: "8px",
                        },
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpen();
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
                sx={{
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                Prosseguir
              </Button>
            </Grid>
          </Grid>

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
                Agradecemos por utilizar nossos serviços. Esta Política de
                Privacidade descreve como coletamos, usamos, compartilhamos e
                protegemos suas informações quando você utiliza nossos produtos
                e serviços. Ao acessar ou utilizar nossos Serviços, você
                concorda com os termos desta Política de Privacidade. Se você
                não concorda com os termos desta política, não utilize nossos
                Serviços.
              </Typography>
              <Typography gutterBottom>
                Se tiver qualquer problema, não se acanhe, contate Almir
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} sx={{backgroundColor: '#E5E2E2', color: "black"}}>
                Fechar
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </form>
      </Box>
      <Box sx={{ marginBottom: "40px" }}></Box>
    </>
  );
};

export default ClientRegister;
// tenho que mudar as cores do botao, textfield, tab, texto de termos de uso, grid
// baixar a biblioteca de estilização da tab
