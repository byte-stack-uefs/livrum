"use client";

import Image from "next/image";
import Divider from "./Divider";
import Carousel from "./Carousel";
import { theme } from "@/app/theme";
import Ebook from "../interfaces/Ebook";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ContainerBookCard(book: Ebook) {
    return (
        <div>
            <div
                style={{
                    height: 300,
                    width: 300,
                    margin: "auto",
                }}
            >
                <Image width={300} height={300} style={{ objectFit: "cover", height: "100%" }} alt={book.title} src={book.cover} />
            </div>

            <Typography sx={{ color: theme.palette.darker.main, fontWeight: "bold" }}>{book.title}</Typography>

            <p>{book.author}</p>
            <div>
                <Button variant="contained" startIcon={<AddShoppingCartIcon />}>
                    Comprar
                </Button>
            </div>
        </div>
    );
}

export default function HomePageBooksContainer({ title = "", books = [] }: { title: string; books: Array<any> }) {
    return (
        <Box sx={{ textAlign: "center", marginBottom: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.darker.main }}>
                {title}
            </Typography>

            <Divider theme={theme} width="5%" />

            <Grid container sx={{ marginTop: 4 }}>
                <Carousel items={books} Child={ContainerBookCard} />
            </Grid>
        </Box>
    );
}
