"use client";
import React, { use, useEffect, useState } from "react";
import {
    Tab,
    Tabs,
    Button,
    styled,
    Dialog,
    Checkbox,
    TextField,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Alert,
} from "@mui/material";

import { theme } from "@/app/theme";

import Divider from "@/app/components/Divider";
import Grid from "@mui/material/Unstable_Grid2";

import { accountInput, agencyInput, cellphoneInput, cpfInput, operationInput } from "@/app/components/CustomInputs";
import { UserForm, UserLevel } from "@/app/interfaces/User";
import { CustomerForm } from "@/app/interfaces/Customer";
import { AuthorForm } from "@/app/interfaces/Author";
import { EnumUserStatus } from "@/app/User";
import useRequest from "@/app/services/requester";
const ClientRegister = () => {

    const [userStatus, setUserStatus] = useState(EnumUserStatus.CREATED);
    const [userType, setUserType] = useState(UserLevel.CUSTOMER);
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
    const requester = useRequest();
    const [creationError, setCreationError] = useState("");
    const [cardCreatedSuccessfully, setCardCreatedSuccessfully] = useState(false);
    const [hasCreationFailed, setHasCreationFailed] = useState(false);
    const [user, setUser] = useState<UserForm>();
    const [customerOrAuthor, setCustomerOrAuthor] = useState<AuthorForm | CustomerForm >();
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        "& .MuiDialogContent-root": {
            padding: theme.spacing(2),
        },
        "& .MuiDialogActions-root": {
            padding: theme.spacing(1),
        },
    }));
    useEffect(() => {
        handleTabClick(UserLevel.CUSTOMER)
    }, [])

    
   

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === passwordConfirm);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);

        setPasswordsMatch(e.target.value === password);
    };
    const handleOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => {
        setOpenModal(false);
    };
    const StyledDialogTitle = styled(DialogTitle)({
        m: 0,
        p: 2,
        textAlign: "center",
        backgroundColor: theme.palette.secondary.main,
        fontFamily: "Roboto",
        fontSize: "20px",
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleTabClick = (type:UserLevel) => {
        
        setUserType(type)

        if(type == UserLevel.CUSTOMER){

            setUserStatus(EnumUserStatus.CREATED);

        }else{

            setUserStatus(EnumUserStatus.PENDING);

        }

    }

    const handleSubmitClient = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    const saveChanges = (event) => {
        setHasCreationFailed(false);
        setCreationError("");
    
        const cpfValue = cpf.replace(/\D/g, ''); 
        const agencyNumberValue = agencyNumber.replace(/\D/g, '');
        const accountNumberValue = accountNumber.replace(/\D/g, ''); 

        setUser({
            nome: name,
            email: email,
            senha: password,
            tipo: userType,
            status: userStatus
        });

        if(userType == UserLevel.AUTHOR){
                
            setCustomerOrAuthor({
                cpf: cpfValue,
                dataNascimento: birthday,
                endereco: address,
                numeroAgencia: agencyNumberValue,
                numeroConta: accountNumberValue,
                numeroOperacao: operationNumber,
            });
            
        }else{

            setCustomerOrAuthor({
                cpf: cpfValue,
                dataNascimento: birthday,
                endereco: address,
                telefone: telephone,
            });

        }
          
        try {
            
            requester.post("/endpoint", userType === UserLevel.AUTHOR ? 
                { userForm: user, authorForm: customerOrAuthor } : 
                { userForm: user, customerForm: customerOrAuthor })
                .then((response) => {
                    setAccountNumber('');
                    setAddress('');
                    setCpf('');
                    setName('');
                    setEmail('');
                    setBirthday('');
                    setPassword('');
                    setTelephone('');
                    setAgencyNumber('');
                    setPasswordConfirm('');
                    setOperationNumber('');
                    setHasCreationFailed(false);
                    setCreationError("");
                })

        } catch (err) {
            setHasCreationFailed(true);
            setCreationError(err.response?.data?.detail || "Erro desconhecido ao criar conta.");
        }
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
                        <Tab label="Cliente" onClick={() => handleTabClick(UserLevel.CUSTOMER)} />
                        <Tab label="Autor" onClick={() => handleTabClick(UserLevel.AUTHOR)} />
                    </Tabs>
                    <form onSubmit={handleSubmitClient}>
                        <Grid
                            container
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
                                margin: "auto",
                                padding: 3,
                                borderBottomRightRadius: 20,
                                borderBottomLeftRadius: 20,
                            }}
                            spacing={2}
                        >
                            <Grid xs={7}></Grid>
                            <Grid xs={5} sx={{ textAlign: "right" }}>
                                <label style={{ color: theme.palette.dark.main }}>Dados obrigatórios *</label>
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
                                    variant="outlined"
                                    onChange={(e) => setCpf(e.target.value)}
                                    InputProps={{
                                        inputComponent: cpfInput as any,
                                    }}
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
                                    InputProps={{
                                        inputComponent: cellphoneInput as any,
                                    }}
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
                                        <Typography sx={{ color: theme.palette.dark.main }} variant="h6">
                                            Dados bancários
                                        </Typography>
                                        <Divider width={"10%"} />
                                    </Grid>
                                    <Grid xs={4}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Operação"
                                            variant="outlined"
                                            value={operationNumber}
                                            onChange={(e) => setOperationNumber(e.target.value)}
                                            InputProps={{
                                                inputComponent: operationInput as any,
                                            }}
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
                                            InputProps={{
                                                inputComponent: agencyInput as any,
                                            }}
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
                                            InputProps={{
                                                inputComponent: accountInput as any,
                                            }}
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid
                                xs={12}
                                lg={8}
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
                            {hasCreationFailed && (
                                <Grid xs={12}>
                                    <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                                        {creationError}
                                    </Alert>
                                </Grid>
                            )}
                            <Grid xs={12} lg={4}>
                                <Button
                                    variant="contained"
                                    color="darker"
                                    fullWidth
                                    sx={{
                                        marginTop: "10px",
                                    }}
                                    onClick={saveChanges}
                                >
                                    Prosseguir
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

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
