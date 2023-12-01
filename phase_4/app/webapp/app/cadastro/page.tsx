"use client"
import React, { useState } from 'react';
import Footer from "../components/Footer";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const ClientRegister = () => {
  const [value, setValue] = useState(0);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [adress, setAdress] = useState('');
  const [operationNumber, setOperationNumber] = useState('');
  const [agencyNumber, setAgencyNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitClient = (event) => {
    event.preventDefault();
    console.log('Nome Completo:', name);
    console.log('CPF:', cpf);
    console.log('Data de nascimento:', birthday);
    console.log('Telefone', telephone);
    console.log('Email:', email);
    console.log('Senha:', password);
    console.log('Confirme sua senha:', passwordConfirm);
    console.log('Endereço:', adress);
    console.log('Número de operação:', operationNumber);
    console.log('Número de agência:', agencyNumber);
    console.log('Número da conta:', accountNumber);
  };

  return (
    
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 'auto', // Centraliza horizontalmente
          maxWidth: '500px',
          justifyContent: 'center',
          height: '100%', // Adiciona altura para centralizar verticalmente
        }}
      >
    
      <form onSubmit={handleSubmitClient}>

        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          sx={{ width: '100%', mx: 'auto', marginBottom: '16px' }}
        >
          <Tab label="Cliente" />
          <Tab label="Autor" />
        </Tabs>
        
          <TextField
            label="Nome Completo:"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{width: '500px' }}
            margin="normal"
          />

          <TextField
            label="CPF"
            variant="outlined"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            sx={{width: '300px' }}
            margin="normal"
          />

          <TextField
            label="Data de nascimento"
            variant="outlined"
            value={birthday}
            onChange={(e) => setEmail(e.target.value)}
            sx={{width: '200px' }}
            margin="normal"
          />

          <TextField
            label="Telefone"
            variant="outlined"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            sx={{width: '200px' }}
            margin="normal"
          />

          <TextField

            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{width: '300px' }}
            margin="normal"

          />

          <TextField

            label="Senha"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{width: '250px' }}
            margin="normal"
        
          />

          <TextField

            label="Confirme sua senha"
            variant="outlined"
            value={password}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            sx={{width: '250px' }}
            margin="normal"

          />

          {value === 1 && (
          
            <>

            <TextField
              label="Número de operação"
              variant="outlined"
              value={operationNumber}
              onChange={(e) => setOperationNumber(e.target.value)}
              sx={{width: '100px' }}
              margin="normal"
            />

            <TextField
              label="Número da agência"
              variant="outlined"
              value={agencyNumber}
              onChange={(e) => setAgencyNumber(e.target.value)}
              sx={{ width: '100px' }}
              margin="normal"
            />


            <TextField
              label="Número da conta"
              variant="outlined"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              sx={{ width: '300px' }}
              margin="normal"
            />

        </>
        
        )}
      </form>
      <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
    </Box>
  );
};


export default ClientRegister;

