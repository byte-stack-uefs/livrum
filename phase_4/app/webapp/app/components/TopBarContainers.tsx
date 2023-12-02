"use client";
import { Person, ShoppingCart } from "@mui/icons-material";
import LivrumLogo from "./LivrumLogo";

import { Box, Container, Divider, Grid, TextField, Theme, Toolbar, Typography } from "@mui/material";
import { Outfit } from "next/font/google";
const outfit = Outfit({ weight: "900", display: "swap", subsets: ["latin"] });

export function TopMain(props: { title?: string; theme: Theme }) {
    const { title, theme } = props;
    return (
        <Container maxWidth={false}>
            <Toolbar sx={{ textTransform: "uppercase" }}>

                <Grid container sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Grid item sm={4} md={3} sx={{ display: 'flex' }}>
                        <LivrumLogo scale={0.2} />
                        <Typography sx={{ fontSize: 60, color: theme.palette.darker.main, alignItems: 'center', display: 'flex', marginX: 4 }} variant="h1" className={outfit.className}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item sm={4} md={6}>
                        <TextField sx={{ width: "75%" }} />
                    </Grid>
                    <Grid item sm={4} md={3} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <ShoppingCart sx={{ fontSize: 48 }} color="darker" />
                        <Person sx={{ fontSize: 48 }} color="darker" />
                    </Grid>
                </Grid>

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
                        <Grid key={e} item xs={4} sx={{ paddingY: 1, alignSelf: "center" }}>
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
