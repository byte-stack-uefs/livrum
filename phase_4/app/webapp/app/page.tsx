import { Metadata } from "next";
import Ebook from "./interfaces/Ebook";
import { Container } from "@mui/material";
import { makeid } from "./helpers/helpers";
import { Category } from "./interfaces/Category";
import PublicLayout from "./components/layouts/PublicLayout";
import CategoriesContainer from "./components/CategoriesContainer";
import HomePageBooksContainer from "./components/HomePageBooksContainer";

export const metadata: Metadata = {
    title: "Home | " + process.env.APP_NAME,
};

export default function Home() {
    const image = "https://m.media-amazon.com/images/I/61zBhzjS4LL._AC_UF1000,1000_QL80_.jpg";

    const containers: Array<{ title: string; books: Array<Ebook> }> = [
        { title: "Mais Vendidos", books: [] },
        { title: "Lançamentos", books: [] },
        { title: "Mais Acessados", books: [] },
    ];

    // Example
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 10; j++) {
            containers[i].books.push({
                title: makeid(10),
                author: makeid(6),
                releaseDate: "01/11/2023",
                cover: image,
            });
        }
    }

    const categories: Category[] = [
        {
            name: "Ação",
            cover: image
        },
        {
            name: "Comédia",
            cover: image
        },
        {
            name: "Terror",
            cover: image
        },
        {
            name: "Aventura",
            cover: image
        },
        {
            name: "Romance",
            cover: image
        }
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
