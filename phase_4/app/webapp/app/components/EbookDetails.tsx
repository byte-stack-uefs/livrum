"use client";

import Image from "next/image";
import { theme } from "@/app/theme";
import { useEffect, useState } from "react";
import { AddShoppingCart } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import Ebook from "../interfaces/Ebook";

interface EbookDetailsProps {
    ebook: any;
    onAddCart: (ebook: Ebook) => void,
    shouldDisableAddCart: (ebook: Ebook) => boolean | undefined
}

function ListItem({ title, value }: { title: string; value: string }) {
    return (
        <span>
            <span style={{ color: theme.palette.dark.main, fontWeight: "bold" }}>{title}: </span>
            <span style={{ color: theme.palette.textLight.main, fontWeight: "bold" }}>{value}</span>
        </span>
    );
}

export default function EbookDetails({ ebook, onAddCart, shouldDisableAddCart }: EbookDetailsProps) {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const el = document.querySelector("#ebook-cover-container");
        setWidth(el?.clientWidth ?? 0);
        setHeight(el?.clientHeight ?? 0);
    }, []);

    return <Grid py={2} px={4} container xs={12} sx={{ backgroundColor: "secondary.main", borderRadius: 5, marginY: 6 }}>
        <Grid xs={12} textAlign="center" py={2}>
            <Typography variant="h4" color="dark.main">
                TÍTULO DO EBOOK
            </Typography>
        </Grid>
        <Grid container xs={12} py={2}>
            <Grid xs={5} id="ebook-cover-container" p={2}>
                <Image
                    src="https://cdn.kobo.com/book-images/6750d058-29cb-4626-9c12-a62e816a80cc/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg"
                    width={width}
                    height={height}
                    alt="Ebook cover"
                    style={{ height: "100%", width: "100%", borderRadius: 30, objectFit: "contain" }}
                />
            </Grid>
            <Grid container xs={7} p={2}>
                <Grid xs={12} pt={6}>
                    <Typography variant="h5" color="dark.main">
                        Descrição
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ color: "textLight.main" }}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus recusandae facere eveniet, magni tempora
                        praesentium alias itaque explicabo accusamus asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint
                        consequatur?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus recusandae facere eveniet, magni tempora
                        praesentium alias itaque explicabo accusamus asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint
                        consequatur?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus recusandae facere eveniet, magni tempora
                        praesentium alias itaque explicabo accusamus asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint
                        consequatur?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus recusandae facere eveniet, magni tempora
                        praesentium alias itaque explicabo accusamus asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint
                        consequatur?
                    </p>
                </Grid>
                <Grid xs={12} container justifyContent="center" mt={4}>
                    <Grid container py={3} xs={8} sx={{ backgroundColor: "#c5c5c5", borderRadius: 3 }} textAlign="center" alignSelf="end">
                        <Grid xs={6} alignSelf="center">
                            <Typography variant="h4" textAlign="center" color="dark.main">
                                R$ 39,90
                            </Typography>
                        </Grid>
                        <Grid xs={6} alignSelf="center">
                            <Button
                                variant="contained"
                                startIcon={<AddShoppingCart />}
                                onClick={() => onAddCart(ebook)}
                                disabled={shouldDisableAddCart(ebook)}
                            >
                                Comprar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid container xs={12} px={2}>
            <Grid xs={12}>
                <Typography variant="h5" color="dark.main">
                    Especificações
                </Typography>
            </Grid>
            <Grid xs={12} container>
                <Grid xs={3}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                            <ListItem title="Autor" value="X" />
                        </li>
                        <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                            <ListItem title="Número de Páginas" value="192" />
                        </li>
                        <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                            <ListItem title="Ano de lançamento" value="2023" />
                        </li>
                    </ul>
                </Grid>
                <Grid xs={3}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                            <ListItem title="Idioma" value="Português" />
                        </li>
                        <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                            <ListItem title="Tamanho" value="8592 KB" />
                        </li>
                        <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                            <ListItem title="Formato" value="PDF" />
                        </li>
                    </ul>
                </Grid>
            </Grid>
        </Grid>
    </Grid>;
}