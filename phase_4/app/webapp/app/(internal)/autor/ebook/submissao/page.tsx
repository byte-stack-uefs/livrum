"use client";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import React, { useState } from "react";

function CampoTexto({ texto }) {
    return (
        <Box display="flex" alignItems="center" marginBottom="7px">
            <label style={{ marginRight: "30px", color: "#163760", fontFamily: "Source Sans Pro, sans-serif", fontWeight: "bold" }}>{texto}:</label>
            <input
                type="text"
                style={{
                    border: "1px dotted #163760",
                    borderRadius: "4px",
                    backgroundColor: "#F1F1F1",
                    borderWidth: "2px",
                    width: "100px",
                    outline: "none",
                }}
            />
        </Box>
    );
}

export default function Page() {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [pag, setPag] = useState("");
    const [ano, setAno] = useState("");
    const [idioma, setIdioma] = useState("");
    const [genero, setGenero] = useState("");
    const [arq, setArq] = useState("");
    const [img, setImg] = useState("");
    const [sinopse, setSinopse] = useState("");

    const handleTituloInputChange = (event) => setTitulo(event.target.value);

    const handleAutorInputChange = (event) => setAutor(event.target.value);

    const handlePagInputChange = (event) => setPag(event.target.value);

    const handleAnoInputChange = (event) => setAno(event.target.value);

    const handleIdiomaInputChange = (event) => setIdioma(event.target.value);

    const handleGeneroInputChange = (event) => setGenero(event.target.value);

    const handleArqInputChange = (event) => setArq(event.target.value);

    const handleImgInputChange = (event) => setImg(event.target.value);

    const handleSinopseInputChange = (event) => setSinopse(event.target.value);
    //titulo !== '' && ano !== '' && genero !=='' && autor!=='' && pag!=='' && arq!=='' && idioma!=='' && sinopse!=='' && img!==''
    function dados(event) {
        event.preventDefault();
        if (
            titulo !== "" &&
            ano !== "" &&
            autor !== "" &&
            arq !== "" &&
            sinopse !== "" &&
            sinopse !== "" &&
            genero !== "" &&
            pag !== "" &&
            idioma !== ""
        ) {
            console.log("sucesso");
        } else {
            console.log("erro");
        }
    }

    return (
        <Box height="80vh" display="flex" flexDirection="column" justifyContent="flex-start">
            {/*Título*/}
            <input
                onChange={handleTituloInputChange}
                type="text"
                placeholder="Título do seu livro..."
                style={{
                    border: "1px dotted #163760",
                    borderRadius: "4px",
                    backgroundColor: "#F1F1F1",
                    borderWidth: "2px",
                    outline: "none",
                    width: "300px",
                    height: "100px",
                    fontSize: "20px",
                    color: "#163760",
                    marginLeft: "250px",
                    marginTop: "20px",
                }}
            />

            {/*Sinopse + imagem*/}
            <Box display="flex" flexDirection="row">
                <Box flexDirection="column" display="flex" marginTop="20px">
                    <label
                        class="picture"
                        tabIndex="0"
                        style={{
                            display: "flex",
                            width: "200px",
                            height: "200px",
                            background: "#ccc",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#aaa",
                            cursor: "pointer",
                            border: "2px dashed currentcolor",
                        }}
                    >
                        <input onChange={handleImgInputChange} class="picture__input" type="file" accept="image/*" style={{ display: "none" }} />
                        <span class="picture__image">Escolha uma Imagem</span>
                    </label>
                    <label
                        style={{
                            marginTop: "20px",
                            color: "#163760",
                            fontFamily: "Source Sans Pro, sans-serif",
                            fontWeight: "bold",
                            fontSize: "20px",
                        }}
                    >
                        Especificações
                    </label>
                </Box>

                <textarea
                    onChange={handleSinopseInputChange}
                    type="text"
                    placeholder="Sinopse do seu livro"
                    style={{
                        resize: "none",
                        marginLeft: "180px",
                        marginTop: "20px",
                        border: "1px dotted #163760",
                        borderRadius: "4px",
                        backgroundColor: "#F1F1F1",
                        borderWidth: "2px",
                        outline: "none",
                        width: "300px",
                        height: "200px",
                        fontSize: "16px",
                        color: "#163760",
                    }}
                />
            </Box>

            {/*Especificações*/}
            <Box width="auto" height="65vh" display="flex" flexDirection="row" justifyContent="flex-start">
                <Box
                    width="flex"
                    height="30vh"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    marginRight="100px"
                    marginTop="10px"
                >
                    <Box display="flex" alignItems="center" marginBottom="7px">
                        <label style={{ marginRight: "30px", color: "#163760", fontFamily: "Source Sans Pro, sans-serif", fontWeight: "bold" }}>
                            Autor:
                        </label>
                        <input
                            onChange={handleAutorInputChange}
                            type="text"
                            style={{
                                border: "1px dotted #163760",
                                borderRadius: "4px",
                                backgroundColor: "#F1F1F1",
                                borderWidth: "2px",
                                width: "100px",
                                outline: "none",
                            }}
                        />
                    </Box>

                    <Box display="flex" alignItems="center" marginBottom="7px">
                        <label style={{ marginRight: "30px", color: "#163760", fontFamily: "Source Sans Pro, sans-serif", fontWeight: "bold" }}>
                            Número de páginas:
                        </label>
                        <input
                            onChange={handlePagInputChange}
                            type="text"
                            style={{
                                border: "1px dotted #163760",
                                borderRadius: "4px",
                                backgroundColor: "#F1F1F1",
                                borderWidth: "2px",
                                width: "100px",
                                outline: "none",
                            }}
                        />
                    </Box>

                    <Box display="flex" alignItems="center" marginBottom="7px">
                        <label style={{ marginRight: "30px", color: "#163760", fontFamily: "Source Sans Pro, sans-serif", fontWeight: "bold" }}>
                            Ano de lançamento:
                        </label>
                        <input
                            onChange={handleAnoInputChange}
                            type="text"
                            style={{
                                border: "1px dotted #163760",
                                borderRadius: "4px",
                                backgroundColor: "#F1F1F1",
                                borderWidth: "2px",
                                width: "100px",
                                outline: "none",
                            }}
                        />
                    </Box>

                    <Box display="flex" alignItems="center" marginBottom="7px" marginTop="20px">
                        <label
                            style={{
                                marginRight: "14px",
                                color: "#163760",
                                fontFamily: "Source Sans Pro, sans-serif",
                                fontWeight: "bold",
                                fontSize: "20px",
                            }}
                        >
                            Livro:
                        </label>
                        <input
                            type="text"
                            value={arq}
                            placeholder="Nenhum arquivo selecionado"
                            style={{
                                border: "2px solid #163760",
                                backgroundColor: "#F1F1F1",
                                width: "200px",
                                borderLeft: "none",
                                borderRight: "none",
                                borderTop: "none",
                                outline: "none",
                            }}
                            disabled
                        />
                    </Box>
                    <label
                        class="button_label"
                        tabIndex="0"
                        style={{
                            display: "flex",
                            height: "35px",
                            width: "150px",
                            background: "#163760",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFFF",
                            cursor: "pointer",
                            fontFamily: "Source Sans Pro, sans-serif",
                            borderRadius: "5px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <input onChange={handleArqInputChange} class="input__button" type="file" accept="pdf/*" style={{ display: "none" }} />
                        <span class="button">Escolher arquivo</span>
                    </label>
                </Box>

                <Box width="flex" height="30vh" display="flex" flexDirection="column" marginTop="10px">
                    <Box display="flex" alignItems="center" marginBottom="7px">
                        <label style={{ marginRight: "30px", color: "#163760", fontFamily: "Source Sans Pro, sans-serif", fontWeight: "bold" }}>
                            Idioma:
                        </label>
                        <input
                            onChange={handleIdiomaInputChange}
                            type="text"
                            style={{
                                border: "1px dotted #163760",
                                borderRadius: "4px",
                                backgroundColor: "#F1F1F1",
                                borderWidth: "2px",
                                width: "100px",
                                outline: "none",
                            }}
                        />
                    </Box>

                    <Box display="flex" alignItems="center" marginBottom="7px">
                        <label style={{ marginRight: "30px", color: "#163760", fontFamily: "Source Sans Pro, sans-serif", fontWeight: "bold" }}>
                            Gênero:
                        </label>
                        <input
                            onChange={handleGeneroInputChange}
                            type="text"
                            style={{
                                border: "1px dotted #163760",
                                borderRadius: "4px",
                                backgroundColor: "#F1F1F1",
                                borderWidth: "2px",
                                width: "100px",
                                outline: "none",
                            }}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" marginBottom="7px">
                        <label style={{ marginRight: "24px", color: "#163760", fontFamily: "Source Sans Pro, sans-serif", fontWeight: "bold" }}>
                            Formato:
                        </label>
                        <label style={{ marginRight: "30px", color: "#8f8c8c", fontFamily: "Source Sans Pro, sans-serif", fontWeight: "bold" }}>
                            PDF
                        </label>
                    </Box>
                </Box>
            </Box>

            <Box display="flex" alignItems="start" justifyContent="center" marginBottom="20px">
                <Button onClick={dados} variant="contained" style={{ width: "200px", backgroundColor: "#8CD087", color: "#323131" }}>
                    Submeter e-Book
                </Button>
            </Box>
        </Box>
    );
}
