"use client";

import Image from "next/image";
import Divider from "./Divider";
import "../styles/image-zoom.css";
import Carousel from "./Carousel";
import Ebook from "../interfaces/Ebook";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ContainerBookCard(book: Ebook) {

    return (
        <div>
            <div
                style={{
                    height: 250,
                    margin: "auto",
                    overflow: "hidden",
                    position: 'relative',
                }}
            >
                <Image className="image-zoom" fill objectFit="cover" alt={book.title} src={book.cover} />
            </div>

            <Typography color="darker.main" sx={{ fontWeight: "bold" }}>{book.title}</Typography>

            <p>{book.author}</p>
            <div>
                <Button variant="contained" startIcon={<AddShoppingCartIcon />} href={`/ebook/${book.id}`}>
                    Comprar
                </Button>
            </div>
        </div>
    );
}

export default function HomePageBooksContainer({ title = "", books = [] }: { title: string; books: Array<any> }) {
    return (
        <Box sx={{ textAlign: "center", marginBottom: 5 }}>
            <Typography variant="h4" color="darker.main" sx={{ fontWeight: "bold" }}>
                {title}
            </Typography>

            <Divider style={{ margin: "auto" }} width="5%" />

            <Grid container sx={{ marginTop: 4 }}>
                <Carousel items={books} Child={ContainerBookCard} />
            </Grid>
        </Box>
    );
}
