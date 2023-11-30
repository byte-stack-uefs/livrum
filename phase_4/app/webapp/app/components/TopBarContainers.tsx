"use client";
import { Person2, ShoppingCart } from "@mui/icons-material";
import LivrumLogo from "./LivrumLogo";

import { Container, Divider, Grid, TextField, Theme, Toolbar, Typography } from "@mui/material";
import { Outfit } from "next/font/google";
const outfit = Outfit({ weight: "900", display: "swap", subsets: ["latin"] });

export function TopMain(props: { title?: string; theme: Theme }) {
    const { title, theme } = props;
    return (
        <Container maxWidth={false}>
            <Toolbar sx={{ textTransform: "uppercase" }}>
                <LivrumLogo scale={0.2} />

                <Typography sx={{ fontSize: 60, color: theme.palette.darker.main }} variant="h1" className={outfit.className}>
                    {title}
                </Typography>

                <TextField sx={{ flexGrow: 1 }} />

                <ShoppingCart fontSize="large" color="darker" />
                <Person2 fontSize="large" color="darker" />
            </Toolbar>
        </Container>
    );
}

export function TopSecond(props: { pros: Array<any>; theme: Theme }) {
    const { theme, pros } = props;

    return (
        <Container sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, height: "3rem" }} maxWidth={false}>
            <Grid container xs={12} sx={{ textAlign: "center" }}>
                {pros.map((e) => {
                    return (
                        <Grid key={e} item md={4}>
                            <p>{e}</p>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}