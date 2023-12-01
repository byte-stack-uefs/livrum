"use client"
import React, { useState } from 'react';
import Footer from "../components/Footer";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

 
  

const ClientRegister = () => {
  const [value, setValue] = React.useState(0);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [birthDay, setbirthDay] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [adress, setAdress] = useState('');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const handleSubmitClient = (event) => {
    event.preventDefault();
    console.log('Nome Completo:', name);
    console.log('CPF:', cpf);
    console.log('Data de nascimento:', birthDay);
    console.log('Telefone', telephone);
    console.log('Email:', email);
    console.log('Senha:', password);
    console.log('Confirme sua senha :', passwordConfirm);
    console.log('Endereço:', adress);

  };

  return (
    <>
      <form onSubmit={handleSubmitClient}>
        <TextField
          label="Nome"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
          >
            <Tab label="Cliente" />
            <Tab label="Autor" />
      
          </Tabs>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>





    </>

  );
};


export default ClientRegister;

