"use client";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import React, { useState } from "react";

export default function Page() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [tel, setTel] = useState("");
    const [endereco, setEndereco] = useState("");
    const [agencia, setAgencia] = useState("");
    const [conta, setConta] = useState("");

    const handleNomeInputChange = (event) => setNome(event.target.value);

    const handleEmailInputChange = (event) => setEmail(event.target.value);

    const handleCpfInputChange = (event) => setCpf(event.target.value);

    const handleTelInputChange = (event) => setTel(event.target.value);

    const handleEnderecoInputChange = (event) => setEndereco(event.target.value);

    const handleAgenciaInputChange = (event) => setAgencia(event.target.value);

    const handleContaInputChange = (event) => setConta(event.target.value);

    function dados(event) {
        event.preventDefault();
        if (nome !== "" && email !== "" && cpf !== "" && tel !== "" && endereco !== "" && agencia !== "" && conta !== "") {
            console.log("sucesso");
        } else {
            console.log("erro");
        }
    }

    return (
        <Box style={{ display: "flex", marginLeft: "150px", width: "100%", height: "100vh", flexDirection: "column" }}>
            <Box marginTop="40px">
                <label style={{ color: "#1E3345", fontSize: "22px", fontFamily: "roboto", fontWeight: "bold" }}>Dados do Autor</label>
            </Box>

            <label style={{ marginTop: "25px", color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>Nome Completo:</label>
            <input
                onChange={handleNomeInputChange}
                type="text"
                style={{ display: "flex", width: "500px", height: "30px", border: "2px solid #d9dcde" }}
            />
            <label style={{ marginTop: "20px", color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>E-mail:</label>
            <input
                onChange={handleEmailInputChange}
                type="text"
                style={{ display: "flex", width: "500px", height: "30px", border: "2px solid #d9dcde" }}
            />

            <Box flexDirection="row" display="flex">
                <Box flexDirection="column" marginTop="20px">
                    <label style={{ color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>CPF:</label>
                    <input
                        onChange={handleCpfInputChange}
                        type="text"
                        style={{ display: "flex", width: "200px", height: "30px", border: "2px solid #d9dcde" }}
                    />
                </Box>

                <Box marginLeft="100px" flexDirection="column" marginTop="20px">
                    <label style={{ color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>Telefone:</label>
                    <input
                        onChange={handleTelInputChange}
                        type="text"
                        style={{ display: "flex", width: "200px", height: "30px", border: "2px solid #d9dcde" }}
                    />
                </Box>
            </Box>

            <label style={{ marginTop: "20px", color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>Endereço:</label>
            <input
                onChange={handleEnderecoInputChange}
                type="text"
                style={{ display: "flex", width: "500px", height: "30px", border: "2px solid #d9dcde" }}
            />
            <hr style={{ color: "#1E3345", width: "500px", margin: "5px" }} />

            <label style={{ color: "#1E3345", fontSize: "20px", fontFamily: "roboto", fontWeight: "bold" }}>Dados Bancários</label>

            <Box flexDirection="row" display="flex">
                <Box flexDirection="column" marginTop="10px">
                    <label style={{ color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>Agência</label>
                    <input
                        onChange={handleAgenciaInputChange}
                        type="text"
                        style={{ display: "flex", width: "200px", height: "30px", border: "2px solid #d9dcde" }}
                    />
                </Box>

                <Box marginLeft="100px" flexDirection="column" marginTop="10px">
                    <label style={{ color: "#1E3345", fontSize: "18px", fontFamily: "roboto", fontWeight: "bold" }}>Conta</label>
                    <input
                        onChange={handleContaInputChange}
                        type="text"
                        style={{ display: "flex", width: "200px", height: "30px", border: "2px solid #d9dcde" }}
                    />
                </Box>
            </Box>

            <Box flexDirection="row" display="flex">
                <Box flexDirection="column" marginTop="10px">
                    <Button onClick={dados} style={{ backgroundColor: "#1E3345", color: "white" }}>
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
