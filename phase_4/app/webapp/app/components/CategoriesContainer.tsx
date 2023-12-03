"use client"

import Image from "next/image";
import Divider from "./Divider";
import Carousel from "./Carousel";
import { theme } from "@/app/theme";
import { Category } from "../interfaces/Category";
import { Box, Container, Typography } from "@mui/material";

function CategoryItem(category: Category) {
    return (<div>
        <div style={{
            width: 150, height: 150, margin: 'auto'
        }}>
            <Image width={150} height={150} style={{ objectFit: "cover", height: "100%", borderRadius: 15 }} alt={category.name} src={category.cover} />
        </div>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {category.name}
        </Typography>
    </div>)
}

export default function CategoriesContainer({ title, categories }: { title: string, categories: any[] }) {
    return (<Box sx={{ textAlign: "center", marginBottom: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.darker.main }}>
            {title}
        </Typography>

        <Divider width="5%" />

        <Container maxWidth='md' sx={{ marginTop: 4, background: 'radial-gradient(rgb(26 70 133 / 58%),#007aff66, #e6e6e6)', padding: 5 }}>
            <Carousel items={categories} Child={CategoryItem} navigation={false} />
        </Container>

    </Box>);
}