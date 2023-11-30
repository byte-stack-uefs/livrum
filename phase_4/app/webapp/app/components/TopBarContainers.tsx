"use client";
import { Person2, ShoppingCart } from "@mui/icons-material";
import LivrumLogo from "./LivrumLogo";

import { Box, Container, Divider, Grid, TextField, Theme, Toolbar, Typography } from "@mui/material";
import { Outfit } from "next/font/google";
const outfit = Outfit({ weight: "900", display: "swap", subsets: ["latin"] });

export function TopMain(props: { title?: string; theme: Theme }) {
    const { title, theme } = props;
    return (
        <Container maxWidth={false}>
            <Toolbar sx={{ textTransform: "uppercase" }}>
                <LivrumLogo scale={0.2} />

                <Typography sx={{ fontSize: 60, color: theme.palette.darker.main, marginX: 4 }} variant="h1" className={outfit.className}>
                    {title}
                </Typography>

                <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                    <TextField sx={{ width: "50%" }} />
                </Box>

                <Box sx={{ marginX: 4 }}>
                    <ShoppingCart fontSize="large" color="darker" />
                    <Person2 fontSize="large" color="darker" />
                </Box>
            </Toolbar>
        </Container>
    );
}

export function TopSecond(props: { pros: Array<any>; theme: Theme }) {
    const { theme, pros } = props;

    return (
        <Container sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, height: "3rem" }} maxWidth={false}>
            <Grid container sx={{ textAlign: "center", height: "100%" }}>
                {pros.map((e, idx) => {
                    return (
                        <Grid key={e} item md={4} sx={{ paddingY: 1, alignSelf: "center" }}>
                            <Box sx={{ borderRight: idx != 2 ? "1px solid white" : "", height: "100%" }}>
                                <span>{e}</span>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}
