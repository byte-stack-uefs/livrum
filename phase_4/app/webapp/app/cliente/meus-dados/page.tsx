"use client";
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { theme } from "@/app/theme";
import Divider from "@/app/components/Divider";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { cellphoneInput, cpfInput } from "@/app/components/CustomInputs";
import useRequest from '@/app/services/requester';
import { UserAttributes, CustomerAttributes } from '@/app/interfaces/User';

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
    const [clientData, setClientData] = useState<UserAttributes>();
    const [customerData, setCustomerData] = useState<UserAttributes>();
    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const requester = useRequest();
    useEffect(() => {
        getDataUserObject();
        getDataCustomerObject();
    }, [])

    const getDataUserObject = () => {
        
        requester.get(`/customer/`).then((response: { data: CustomerAttributes; }) => {
            const customerData = response.data;
            setCpf(customerData.cpf);
            setBirthday(customerData.dataNascimento);
            setAddress(customerData.endereco);
            setTelephone(customerData.telefone);
        }).catch((err: any) => { });

    }

    const getDataCustomerObject = () => {
        
        requester.get(`/user/`).then((response: { data: UserAttributes; }) => {
            const userData = response.data;
            setName(userData.nome);
            setEmail(userData.email);
            setPassword(userData.senha);
    
        }).catch((err: any) => { })
       
    }  

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    const handleSubmitClient = (event: { preventDefault: () => void; }) => {
        requester.patch(`/user/`,{nome: name, email:email, senha:password}).then((response: any) => {
            getDataUserObject();
        }).catch((err: any) => { })

        requester.patch(`/customer/`,{ cpf: cpf ,dataNascimento: birthday, endereco: address, telefone: telephone}).then((response: any) => {
            getDataCustomerObject();
        }).catch((err: any) => { })
    };

    return (
        <Grid xs={11} sm={9} md={7} lg={5} style={{ width: "100%" }}>
            <form onSubmit={handleSubmitClient}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <InputLabel htmlFor="labelName" required style={{ fontWeight: "bold", textAlign: "left", color: theme.palette.dark.main }}>
                            Nome Completo{""}
                        </InputLabel>
                        <TextField
                            id="labelName"
                            fullWidth
                            value={name}
                            size="small"
                            variant="outlined"
                            onChange={(e: { target: { value: any; }; }) => setName(e.target.value)}
                            InputProps={{
                                sx: { backgroundColor: "white" },
                            }}
                        
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
             
                            fullWidth
                            id="labelBirthday"
                            value={birthday}
                            size="small"
                            variant="outlined"
                            type='date'
                            onChange={(e: { target: { value: any; }; }) => setBirthday(e.target.value)}
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
                            onChange={(e: { target: { value: any; }; }) => setTelephone(e.target.value)}
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
                            onChange={(e: { target: { value: any; }; }) => setEmail(e.target.value)}
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
                            onChange={(e: { target: { value: any; }; }) => setPassword(e.target.value)}
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
                            onChange={(e: { target: { value: any; }; }) => setAddress(e.target.value)}
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
