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
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@/app/components/Divider";
import { flexbox } from '@mui/system';
import { theme } from "@/app/theme";
import Image from 'next/image'
import { blue, grey } from "@mui/material/colors";

export default function Page() {

    
    return (
        <main>
            <Grid container>
                <Grid xs={12}>
                    <Typography /*sx={{ color: theme.palette.dark.main }}*/ variant="h6" paddingTop={2}>
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
                    <Typography sx={{ color:"black", padding:1, paddingTop:2}} variant="h6">
                    Secrets in a Silicon Valley Startup
                    </Typography>

                    <Typography sx={{ color:"#1E3345", padding:1,fontSize:16}} >
                    Autor: Fred Scott <br/>
                    Quantidade de páginas: 564 <br/>
                    Gêneros: Ação, Drama <br/>
                    Preço: R$ 55,00 <br/>
                    Idioma: Português <br/>
                    Ano de Lançamento: 2023 
                    </Typography>   
                    <Typography sx={{ color:"#1E3345", padding:1,fontSize:16}} >
                        Sinopse:
                    </Typography>
                    <Typography sx={{ color:"#1E3345", paddingLeft:3, paddindRight:3,fontSize:14 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos excepturi earum numquam animi eligendi corporis labore rerum expedita adipisci, voluptate quam odio tempora sapiente nisi nesciunt obcaecati aut sed minima.
                    </Typography>

                    <Grid sx={{padding:2,}}> 
                        <Button variant="outlined" sx={{ color:"#1E3345",fontSize:14,justifyContent: "space-between"  }}>
                            Baixar PDF da obra
                        </Button>
                    </Grid>
                    <Button color="success">Aceitar</Button>
                    <Button color="error">Recusar</Button>
                </Grid>
            </Grid>
        </main>
    );
}