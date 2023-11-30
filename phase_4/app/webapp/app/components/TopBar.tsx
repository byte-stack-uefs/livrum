import { Person2, ShoppingCart } from "@mui/icons-material";
import LivrumLogo from "./LivrumLogo";

import { Outfit } from "next/font/google";
import { AppBar, Container, Grid, TextField, Toolbar, Typography } from "@mui/material";

const outfit = Outfit({ weight: "900", display: "swap", subsets: ["latin"] });

/**
 * Esse componente é responsável para renderizar a Barra Superior do sistema
 */
export default function TopBar() {
    const pros = ["Mais Econômico", "Super Rápido", "Sustentável"];

    return (
        <div>
            <AppBar sx={{ backgroundColor: "#fff", color: "red" }} position="static">
                <Container maxWidth={false}>
                    <Toolbar sx={{ textTransform: "uppercase" }}>
                        <LivrumLogo scale={0.2} />

                        <Typography color="primary" sx={{ fontSize: 60 }} variant="h1" className={outfit.className}>
                            {process.env.APP_NAME}
                        </Typography>

                        <TextField sx={{ flexGrow: 1 }} />

                        <ShoppingCart fontSize="large" />
                        <Person2 fontSize="large" />
                    </Toolbar>
                </Container>
                <Container sx={{ backgroundColor: "orange", height: "3rem" }} maxWidth={false}>
                    <Grid container xs={12} sx={{ textAlign: "center" }}>
                        {pros.map((e) => {
                            return (
                                <Grid item md={4}>
                                    <p>{e}</p>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </AppBar>
        </div>
    );
}
