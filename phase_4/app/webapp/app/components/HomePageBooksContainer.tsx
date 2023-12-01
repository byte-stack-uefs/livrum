"use client";

import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import Divider from "./Divider";
import { theme } from "@/app/theme";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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
        <Box sx={{ textAlign: "center", marginBottom: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.darker.main }}>
                {title}
            </Typography>

            <Divider theme={theme} width="5%" />

            <Grid container sx={{ marginTop: 4 }}>
                <Swiper loop={true} slidesPerView={4} spaceBetween={20} navigation={true} modules={[Navigation]}>
                    {books.map((e) => {
                        return (
                            <SwiperSlide key={e}>
                                <ContainerBookCard book={e} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Grid>
        </Box>
    );
}
