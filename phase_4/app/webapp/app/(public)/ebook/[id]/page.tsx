"use client"

import Divider from "@/app/components/Divider";
import { AddShoppingCart } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Container, Typography } from "@mui/material";
import { theme } from "@/app/theme";

interface EbookPageParams {
    id: number;
}

export default function Page({ params }: { params: EbookPageParams }) {
    return (
        <Container maxWidth={false}>

            <Grid container>
                <Grid container xs={12} sx={{ backgroundColor: 'secondary.main' }}>
                    <Grid xs={12}>
                        TÍTULO DO EBOOK
                    </Grid>
                    <Grid container xs={12}>
                        <Grid xs={4}>
                            Capa do livro
                        </Grid>
                        <Grid container xs={8}>
                            <Grid xs={12}>
                                <Typography variant="h5">
                                    Descrição
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus
                                    recusandae facere eveniet, magni tempora praesentium alias itaque explicabo accusamus
                                    asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint consequatur?
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus
                                    recusandae facere eveniet, magni tempora praesentium alias itaque explicabo accusamus
                                    asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint consequatur?
                                </p>
                            </Grid>
                            <Grid xs={12} container>
                                <Grid xs={6}>
                                    R$ 39,90
                                </Grid>
                                <Grid xs={6}>
                                    <Button variant="contained" startIcon={<AddShoppingCart />}>
                                        Comprar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid xs={12}>
                            Especificações
                        </Grid>
                        <Grid xs={12} container>
                            <Grid xs={6}>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li>
                                        <ListItem title="Autor" value="X" />
                                    </li>
                                    <li>
                                        <ListItem title="Número de Páginas" value="192" />
                                    </li>
                                    <li>
                                        <ListItem title="Ano de lançamento" value="2023" />
                                    </li>
                                </ul>
                            </Grid>
                            <Grid xs={6}>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li>
                                        <ListItem title="Idioma" value="Português" />
                                    </li>
                                    <li>
                                        <ListItem title="Tamanho" value="8592 KB" />
                                    </li>
                                    <li>
                                        <ListItem title="Formato" value="PDF" />
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12}>
                    <Typography>
                        Títulos semelhantes
                    </Typography>
                    <Divider width={"35%"} />
                </Grid>
            </Grid>

        </Container>
    );
}


function ListItem({ title, value }: { title: string, value: string }) {
    return (
        <span>
            <span style={{ color: theme.palette.dark.main, fontWeight: 'bold' }}>{title}: </span>
            <span style={{ color: theme.palette.textLight.main, fontWeight: 'bold' }}>{value}</span>
        </span>
    );
}