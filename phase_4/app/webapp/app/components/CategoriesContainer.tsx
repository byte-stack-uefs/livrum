"use client";

import Image from "next/image";
import Divider from "./Divider";
import Carousel from "./Carousel";
import { theme } from "@/app/theme";
import { Category } from "../interfaces/Category";
import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";

function CategoryItem(category: Category) {
    return (
        <div>
            <div
                style={{
                    width: 175,
                    height: 175,
                    margin: "auto",
                    position: "relative",
                    fontSize: "5rem",
                    backgroundColor: "#2665BE",
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    whiteSpace: "break-spaces",
                }}
            >
                {category.name.charAt(0)}
                {/* <Image fill objectFit="cover" style={{ borderRadius: 15 }} alt={category.name} src={category.cover} /> */}
            </div>
            <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
                {category.name}
            </Typography>
        </div>
    );
}

export default function CategoriesContainer({ title, categories }: { title: string; categories: any[] }) {
    const skeletons = [1, 2, 3, 4];

    return (
        <Box sx={{ textAlign: "center", marginBottom: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.darker.main }}>
                {title}
            </Typography>

            <Divider width="5%" style={{ margin: "auto" }} />

            <Container maxWidth="md" sx={{ marginTop: 4, background: "radial-gradient(rgb(26 70 133 / 58%),#007aff66, #e6e6e6)", padding: 5 }}>
                {categories ? (
                    <Carousel items={categories} Child={CategoryItem} navigation={false} />
                ) : (
                    <Grid container sx={{ justifyContent: "space-between" }}>
                        {skeletons.map((el) => {
                            return <Skeleton key={title + el} variant="rounded" width={150} height={150}></Skeleton>;
                        })}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}
