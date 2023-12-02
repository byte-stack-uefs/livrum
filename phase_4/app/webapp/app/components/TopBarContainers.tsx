"use client";

import AccountHeader from "./AccountHeader";
import { Person, ShoppingCart } from "@mui/icons-material";
import { Box, Container, Grid, TextField, Theme, Toolbar } from "@mui/material";

export function TopMain(props: { title?: string; theme: Theme }) {
    const { title, theme } = props;
    return (
        <Container maxWidth={false}>
            <Toolbar sx={{ textTransform: "uppercase" }}>

                <Grid container sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Grid item sm={4} md={3} sx={{ display: 'flex' }}>
                        <AccountHeader title={title} theme={theme} />
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
