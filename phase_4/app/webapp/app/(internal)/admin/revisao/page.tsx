"use client";

import React, { useState } from "react";
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
    FormControl,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Box,
    Stack,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@/app/components/Divider";
import { flexbox } from '@mui/system';
import { theme } from "@/app/theme";
import Image from 'next/image'
import { blue, grey } from "@mui/material/colors";

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
                <Grid xs={12}>
                    <Typography sx={{ color: theme.palette.dark.main }} variant="h6" paddingTop={2}>
                    Revisão de Ebook 
                    </Typography>
                    <Divider width={"10%"} />
                </Grid>

                <Grid xs={3} sx={{marginTop:2}}>
                    <div style={{borderRadius: '15px', overflow: 'hidden', width:'214px', height:'321'}}>
                        <Image src="https://m.media-amazon.com/images/I/6175IU0qFgL._SL1000_.jpg" width={214} height={321} alt="image" ></Image>
                    </div>
                </Grid>

                <Grid xs={8} sx={{margin: "auto",height: 440,marginTop:2,border:1.5,borderColor:"#2665BE",borderRadius:5 }}>
                    <Typography sx={{ color:"dark", padding:1, paddingTop:2}} variant="h6">
                    Secrets in a Silicon Valley Startup
                    </Typography>

                    <Typography sx={{ color:"dark", padding:1,fontSize:16}} >
                    Autor: Fred Scott <br/>
                    Quantidade de páginas: 564 <br/>
                    Gêneros: Ação, Drama <br/>
                    Preço: R$ 55,00 <br/>
                    Idioma: Português <br/>
                    Ano de Lançamento: 2023 
                    </Typography>   
                    <Typography sx={{ color:"dark", padding:1,fontSize:16}} >
                        Sinopse:
                    </Typography>
                    <Typography sx={{ color:"dark", paddingLeft:3, paddindRight:3,fontSize:14 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos excepturi earum numquam animi eligendi corporis labore rerum expedita adipisci, voluptate quam odio tempora sapiente nisi nesciunt obcaecati aut sed minima.
                    </Typography>

                    <Grid sx={{padding:2,}}> 
                        <Button variant="outlined" sx={{ color:"dark",fontSize:12,justifyContent: "space-between"  }}>
                            Baixar PDF da obra
                        </Button>
                    </Grid>
                    <Stack direction="row" spacing={5} sx={{justifyContent:'center'}}>
                        <Button color="success" variant="contained" >Aprovar</Button>
                        <Button 
                            variant="contained"
                            color="error"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenModal(true);
                            }}
                        >Recusar</Button>
                    </Stack>
                </Grid>

                <BootstrapDialog
                    open={openModal}
                    onClose={handleClose}>

                    <StyledDialogTitle id="customized-dialog-title" sx={{width:500}}>
                        <strong>Descrição de recusa</strong>
                    </StyledDialogTitle>
                    <DialogContent dividers>
                        <TextField
                            fullWidth 
                            label="Insira aqui o motivo pelo qual o Ebook será recusado"
                            multiline>
                        </TextField>
                        <Typography sx={{fontSize:14}}>
                            Essa informação será repassada ao autor.
                        </Typography>
                    </DialogContent>

                    <DialogActions >
                        <Stack  justifyContent="center" gap={2} flexDirection="row" width={1.0} flexWrap="wrap">
                            <Button 
                                color="success"
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenModal(false);
                                }}
                                >Solicitar recusa
                            </Button>                            
                            <Button 
                                color="error"
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenModal(false);
                                }}
                                >Cancelar
                            </Button>
                        </Stack>
                    </DialogActions>

                </BootstrapDialog>

            </Grid>
        </main>

)}

export default adminRevision;
