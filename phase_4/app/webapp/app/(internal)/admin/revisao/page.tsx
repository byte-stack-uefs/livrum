"use client";

import React, { useState } from "react";
import { Button, styled, Dialog, TextField, Typography, DialogTitle, DialogContent, DialogActions, Stack } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@/app/components/Divider";
import { theme } from "@/app/theme";
import Image from "next/image";

const adminRevision = () => {
    const [openModal, setOpenModal] = useState(false);

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        "& .MuiDialogContent-root": {
            padding: theme.spacing(2),
        },
        "& .MuiDialogActions-root": {
            padding: theme.spacing(1),
        },
    }));

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
        backgroundColor: "#E5E2E2",
        fontFamily: "Roboto",
        fontSize: "20px",
    });

    return (
        <main>
            <Grid container>
                <Grid xs={12} mb={2}>
                    <Typography sx={{ color: theme.palette.dark.main }} variant="h6" paddingTop={2}>
                        Revisão de Ebook
                    </Typography>
                    <Divider width={"10%"} />
                </Grid>

                <Grid xs={3} pr={1}>
                    <div style={{ borderRadius: "15px", overflow: "hidden" }}>
                        <Image src="https://m.media-amazon.com/images/I/6175IU0qFgL._SL1000_.jpg" width={214} height={321} alt="image"></Image>
                    </div>
                </Grid>

                <Grid xs={9} p={1} sx={{ margin: "auto", border: 1.5, borderColor: "primary.main", borderRadius: 5 }}>
                    <Typography sx={{ color: "dark.main", padding: 1, fontWeight: "bold" }} variant="h6">
                        Secrets in a Silicon Valley Startup
                    </Typography>

                    <Typography sx={{ color: "dark.main", padding: 1, fontSize: 16 }}>
                        <span style={{ fontWeight: "bold" }}>Autor</span>: Fred Scott <br />
                        Quantidade de páginas: 564 <br />
                        Gêneros: Ação, Drama <br />
                        Preço: R$ 55,00 <br />
                        Idioma: Português <br />
                        Ano de Lançamento: 2023
                    </Typography>
                    <Typography sx={{ color: "dark.main", padding: 1, fontSize: 16, fontWeight: "bold" }}>Sinopse:</Typography>
                    <Typography sx={{ color: "dark.main", padding: 1, fontSize: 14 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos excepturi earum numquam animi eligendi corporis labore
                        rerum expedita adipisci, voluptate quam odio tempora sapiente nisi nesciunt obcaecati aut sed minima.
                    </Typography>

                    <Grid xs={12} p={1} my={2}>
                        <a
                            href="#"
                            style={{
                                color: theme.palette.dark.main,
                                fontSize: 12,
                                textTransform: "uppercase",
                                fontWeight: "bold",
                            }}
                        >
                            Clique aqui para baixar PDF da obra
                        </a>
                    </Grid>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                        <Button color="success" variant="contained">
                            Aprovar
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenModal(true);
                            }}
                        >
                            Recusar
                        </Button>
                    </Stack>
                </Grid>

                <BootstrapDialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
                    <StyledDialogTitle id="customized-dialog-title">
                        <strong>Descrição de recusa</strong>
                    </StyledDialogTitle>
                    <DialogContent dividers>
                        <TextField
                            helperText="Essa informação será exibida ao autor"
                            fullWidth
                            label="Insira aqui o motivo pelo qual o Ebook será recusado"
                            multiline
                            minRows={5}
                        ></TextField>
                    </DialogContent>

                    <DialogActions>
                        <Stack justifyContent="center" gap={2} flexDirection="row" width={1.0} flexWrap="wrap">
                            <Button
                                color="success"
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenModal(false);
                                }}
                            >
                                Salvar
                            </Button>
                            <Button
                                color="error"
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenModal(false);
                                }}
                            >
                                Cancelar
                            </Button>
                        </Stack>
                    </DialogActions>
                </BootstrapDialog>
            </Grid>
        </main>
    );
};

export default adminRevision;
