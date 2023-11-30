import { Person2, ShoppingCart } from "@mui/icons-material";
import LivrumLogo from "./LivrumLogo";

import { Outfit } from "next/font/google";
import { AppBar, Container, TextField, Toolbar, Typography } from "@mui/material";

const outfit = Outfit({ weight: "900", display: "swap", subsets: ["latin"] });

/**
 * Esse componente é responsável para renderizar a Barra Superior do sistema
 */
export default function TopBar() {
    return (
        <div>
            <AppBar sx={{ backgroundColor: "#fff", color: "red" }}>
                <Container maxWidth={false}>
                    <Toolbar sx={{ textTransform: "uppercase" }}>
                        <LivrumLogo scale={0.2} />

                        <Typography color="primary" sx={{ fontSize: 60 }} variant="h1" className={outfit.className}>
                            {process.env.APP_NAME}
                        </Typography>

                        <TextField sx={{ flexGrow: 1 }} />

                        <ShoppingCart />
                        <Person2 />
                    </Toolbar>
                </Container>
            </AppBar>
            <section className="bg-white">
                <div className="flex justify-between">
                    <div className="flex w-1/3 justify-around">
                        <p className={outfit.className + " text-livrum-dark"} style={{ fontSize: 60, textTransform: "uppercase" }}>
                            {process.env.APP_NAME}
                        </p>
                    </div>
                    <div className="bg-gray-300 text-center self-center w-1/3">Campo de busca</div>
                    <div className="flex justify-evenly text-livrum-dark font-bold w-1/3 items-center">
                        <ShoppingCart />
                        <Person2 />
                    </div>
                </div>
            </section>
            <section className="bg-livrum-primary text-white h-12">
                <div className="flex justify-around h-full items-center divide-x">
                    <div className="w-1/3 text-center">Mais Econômico</div>
                    <div className="w-1/3 text-center">Super Rápido</div>
                    <div className="w-1/3 text-center">Sustentável</div>
                </div>
            </section>
        </div>
    );
}
