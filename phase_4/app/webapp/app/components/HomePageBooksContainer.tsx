"use client";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Button, Grid, Typography } from "@mui/material";

import Image from "next/image";
import Divider from "./Divider";

import { theme } from "@/app/theme";

function ContainerBookCard({ book }: { book: any }) {
    return (
        <div>
            <div
                style={{
                    height: 300,
                    width: 300,
                    margin: "auto",
                }}
            >
                <Image width={300} height={300} style={{ objectFit: "cover", height: "100%" }} alt={book.title} src={book.image} />
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
        <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.darker.main }}>
                {title}
            </Typography>

            <Divider theme={theme} width="5%" />

            <Grid container sx={{ marginTop: 4 }}>
                {books.map((e) => {
                    return (
                        <Grid key={e} item xs={12} md={4}>
                            <ContainerBookCard book={e} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
