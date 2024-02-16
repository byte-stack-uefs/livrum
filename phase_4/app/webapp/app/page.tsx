"use client";

import { useState } from "react";
import Ebook from "./interfaces/Ebook";
import { Container } from "@mui/material";
import useRequest from "./services/requester";
import { Category } from "./interfaces/Category";
import PublicLayout from "./components/layouts/PublicLayout";
import CategoriesContainer from "./components/CategoriesContainer";
import HomePageBooksContainer from "./components/HomePageBooksContainer";

export default function Home() {
    const image = "https://m.media-amazon.com/images/I/61zBhzjS4LL._AC_UF1000,1000_QL80_.jpg";

    const [newer, setNewer] = useState<Ebook[] | null>(null);
    const [mostBuyed, setMostBuyed] = useState<Ebook[] | null>(null);
    const [mostViewed, setMostViewed] = useState<Ebook[] | null>(null);

    const requester = useRequest();

    if (!mostViewed) {
        requester.get("/ebook/most-viewed").then((response) => {
            const { data } = response;
            setMostViewed(data);
        });
    }

    if (!newer) {
        requester.get("/ebook/newer").then((response) => {
            const { data } = response;
            setNewer(data);
        });
    }

    if (!mostBuyed) {
        requester.get("/ebook/most-buyed").then((response) => {
            const { data } = response;
            setMostBuyed(data);
        });
    }

    const containers: Array<{ title: string; books: Array<Ebook> | null }> = [
        { title: "Mais Vendidos", books: mostBuyed },
        { title: "Lançamentos", books: newer },
        { title: "Mais Acessados", books: mostViewed },
    ];

    const categories: Category[] = [
        {
            name: "Ação",
            cover: image,
        },
        {
            name: "Comédia",
            cover: image,
        },
        {
            name: "Terror",
            cover: image,
        },
        {
            name: "Aventura",
            cover: image,
        },
        {
            name: "Romance",
            cover: image,
        },
    ];

    return (
        <PublicLayout>
            <main>
                <Container maxWidth={false} sx={{ marginY: 8 }}>
                    <div>
                        {containers.map((e) => {
                            return <HomePageBooksContainer key={e.title} title={e.title} books={e.books} />;
                        })}
                    </div>
                    <div>
                        <CategoriesContainer title="Categorias" categories={categories}></CategoriesContainer>
                    </div>
                </Container>
            </main>
        </PublicLayout>
    );
}
