"use client";

import React, { useState } from "react";
import Ebook from "@/app/interfaces/Ebook";
import { Image } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, styled, Box } from "@mui/material";
import { numberInput, priceInput } from "@/app/components/CustomInputs";
import PreviewDialog from "@/app/components/PreviewDialog";

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

export default function Page() {

    const [openPreview, setOpenPreview] = useState(false);

    const [ebook, setEbook] = useState<Ebook>({
        title: '',
        author: '',
        summary: '',
        // @ts-ignore
        price: '0',
        id: 0,
        cover: '',
        releaseYear: '',
        isAvailable: false
    });

    const [arq, setArq] = useState("");
    const [img, setImg] = useState("");

    const updateEbook = (key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        let eb = {};
        // @ts-ignore
        eb[key] = event.target.value;

        setEbook(ebook => ({
            ...ebook,
            ...eb
        }))
    }

    function dados(event) {
        event.preventDefault();
        if (
            true
        ) {
            console.log("sucesso");
        } else {
            console.log("erro");
        }
    }

    const readImage = (ev) => {

        if (ev.target.files[0]) {

            const reader = new FileReader();
            reader.onload = function () {
                let eb = {};
                // @ts-ignore
                eb['cover'] = reader.result;
                setEbook(ebook => ({
                    ...ebook,
                    ...eb,
                }))
            }
            reader.readAsDataURL(ev?.target.files[0]);
        } else {
            let eb = {};
            // @ts-ignore
            eb['cover'] = null;
            setEbook(ebook => ({
                ...ebook,
                ...eb,
            }))
        }
    }

    return (
        <Grid container>
            <PreviewDialog ebook={ebook} open={openPreview} onClose={() => { setOpenPreview(false) }} />
            <Grid container justifyContent="center">
                <Grid xs={12} md={6} item>
                    <DashedInput fullWidth value={ebook.title} onChange={(e) => { updateEbook('title', e) }} placeholder="Título do seu livro" />
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={12} item container my={3}>
                    <Grid xs={5} item>
                        <input type="file" hidden accept="image/*" id="image-in" onChange={readImage} />
                        <label htmlFor="image-in">
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
                                <Typography>{ebook.cover ? 'Uma imagem selecionada' : 'Clique aqui e envie a capa do Ebook'}</Typography>
                            </Box>
                        </label>
                    </Grid>
                    <Grid xs={7} item pl={1} container>
                        <Grid item container xs={12}>

                            <Grid item container xs={12}>
                                <Grid item xs={12} mb={2}>
                                    <Typography color="darker.main" variant="h5" fontWeight="bold">
                                        Sinopse
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <DashedInput fullWidth value={ebook.summary} onChange={(e) => { updateEbook('summary', e) }} minRows={15} multiline placeholder="Sinopse" />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} container justifyItems={"center"} mt={3}>
                                <Grid item xs={12} md={6} sx={{ margin: 'auto' }}>

                                    <DashedInput InputProps={{
                                        inputComponent: priceInput as any,
                                    }} fullWidth value={ebook.price} onChange={(e) => { updateEbook('price', e) }} placeholder="Preço" />
                                </Grid>
                            </Grid>

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
                                    <DashedInput fullWidth size="small" value={ebook.author} onChange={(e) => { updateEbook('author', e) }} />
                                </Grid>
                            </Grid>
                            <Grid xs={12} item container alignItems="center" py={1}>
                                <Grid xs={4} item>
                                    <Typography color="dark.main">Número de páginas: </Typography>
                                </Grid>
                                <Grid xs={6} item>
                                    <DashedInput InputProps={{
                                        inputComponent: numberInput as any,
                                    }} fullWidth size="small" value={ebook.pages} onChange={(e) => { updateEbook('pages', e) }} />
                                </Grid>
                            </Grid>
                            <Grid xs={12} item container alignItems="center" py={1}>
                                <Grid xs={4} item>
                                    <Typography color="dark.main">Ano de lançamento: </Typography>
                                </Grid>
                                <Grid xs={6} item>
                                    <DashedInput InputProps={{
                                        inputComponent: numberInput as any,
                                    }} fullWidth size="small" value={ebook.releaseYear} onChange={(e) => { updateEbook('releaseYear', e) }} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={6} item container>
                            <Grid xs={12} item container alignItems="center" py={1}>
                                <Grid xs={4} item>
                                    <Typography color="dark.main">Idioma: </Typography>
                                </Grid>
                                <Grid xs={6} item>
                                    <DashedInput fullWidth size="small" value={ebook.languages} onChange={(e) => { updateEbook('languages', e) }} />
                                </Grid>
                            </Grid>
                            <Grid xs={12} item container alignItems="center" py={1}>
                                <Grid xs={4} item>
                                    <Typography color="dark.main">Gênero: </Typography>
                                </Grid>
                                <Grid xs={6} item>
                                    <DashedInput fullWidth size="small" value={ebook.genre} onChange={(e) => { updateEbook('genre', e) }} />
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
                        <input hidden accept="application/pdf" id="raised-button-file" type="file" />
                        <label htmlFor="raised-button-file">
                            <Button color="dark" variant="contained" component="span">
                                Escolher arquivo
                            </Button>
                        </label>
                    </Grid>
                </Grid>

                <Grid item xs={12} my={2}>
                    <Button variant="outlined" onClick={() => {
                        setOpenPreview(true);
                    }}>
                        Abrir pré-visualização
                    </Button>
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
