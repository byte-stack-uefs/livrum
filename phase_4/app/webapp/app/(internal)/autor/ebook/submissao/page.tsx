"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { Button, Grid, TextField, Typography, styled } from "@mui/material";
import { Image } from "@mui/icons-material";

const DashedInput = styled(TextField)(({ theme }) => ({
    borderRadius: 0,
    border: "none",

    "& .MuiInputBase-root": {
        backgroundColor: "transparent",
        borderRadius: 0,
        border: "1px dashed white",
        borderColor: theme.palette.dark.main,

        ":hover": {
            borderColor: theme.palette.darker.main,
        },
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: 0,
    },

    " & .MuiInputBase-inputSizeSmall": {
        height: "0.7em",
    },
}));

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
        <Grid container>
            <Grid container justifyContent="center">
                <Grid xs={12} md={6} item>
                    <DashedInput fullWidth value={titulo} onChange={handleTituloInputChange} placeholder="Título do seu livro" />
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={12} item container my={3}>
                    <Grid xs={5} item>
                        <Box
                            sx={{
                                display: "flex",
                                backgroundColor: "secondary.main",
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <Image sx={{ fontSize: 80 }} />
                            <Typography>Clique aqui e envie a capa do Ebook</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={7} item pl={1} container>
                        <Grid item xs={12} mb={2}>
                            <Typography color="darker.main" variant="h5" fontWeight="bold">
                                Sinopse
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <DashedInput fullWidth value={sinopse} onChange={handleSinopseInputChange} minRows={15} multiline placeholder="Sinopse" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" color="darker.main" fontWeight="bold">
                        Especificações
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid xs={6} item container>
                            <Grid xs={12} item container alignItems="center" py={1}>
                                <Grid xs={4} item>
                                    <Typography color="dark.main">Autor: </Typography>
                                </Grid>
                                <Grid xs={6} item>
                                    <DashedInput fullWidth size="small" onChange={handleAutorInputChange} />
                                </Grid>
                            </Grid>
                            <Grid xs={12} item container alignItems="center" py={1}>
                                <Grid xs={4} item>
                                    <Typography color="dark.main">Número de páginas: </Typography>
                                </Grid>
                                <Grid xs={6} item>
                                    <DashedInput fullWidth size="small" onChange={handlePagInputChange} />
                                </Grid>
                            </Grid>
                            <Grid xs={12} item container alignItems="center" py={1}>
                                <Grid xs={4} item>
                                    <Typography color="dark.main">Ano de lançamento: </Typography>
                                </Grid>
                                <Grid xs={6} item>
                                    <DashedInput fullWidth size="small" onChange={handleAnoInputChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={6} item container>
                            <Grid xs={12} item container alignItems="center" py={1}>
                                <Grid xs={4} item>
                                    <Typography color="dark.main">Idioma: </Typography>
                                </Grid>
                                <Grid xs={6} item>
                                    <DashedInput fullWidth size="small" onChange={handleIdiomaInputChange} />
                                </Grid>
                            </Grid>
                            <Grid xs={12} item container alignItems="center" py={1}>
                                <Grid xs={4} item>
                                    <Typography color="dark.main">Gênero: </Typography>
                                </Grid>
                                <Grid xs={6} item>
                                    <DashedInput fullWidth size="small" onChange={handleGeneroInputChange} />
                                </Grid>
                            </Grid>
                            <Grid xs={12} item container alignItems="center" py={1}>
                                <Grid xs={4} item>
                                    <Typography color="dark.main">Formato: </Typography>
                                </Grid>
                                <Grid xs={8} item>
                                    <Typography color="textLight.main">PDF</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} mt={2}>
                    <Grid item xs={12}>
                        <Typography color="darker.main" variant="h5" fontWeight="bold">
                            Livro: <Typography display="inline">Nenhum arquivo selecionado</Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <input hidden accept="image/*" id="raised-button-file" multiple type="file" />
                        <label htmlFor="raised-button-file">
                            <Button color="dark" variant="contained" component="span">
                                Escolher arquivo
                            </Button>
                        </label>
                    </Grid>
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <Button onClick={dados} variant="contained" color="success">
                        Submeter e-Book
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}