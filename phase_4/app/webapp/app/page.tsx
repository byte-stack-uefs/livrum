import { Metadata } from "next";
import Ebook from "./interfaces/Ebook";
import { Container } from "@mui/material";
import { makeid } from "./helpers/helpers";
import PublicLayout from "./components/layouts/PublicLayout";
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

    return (
        <PublicLayout>
            <main>
                <Container maxWidth={false} sx={{ marginY: 8 }}>
                    {containers.map((e) => {
                        return <HomePageBooksContainer key={e.title} title={e.title} books={e.books} />;
                    })}
                </Container>
            </main>
        </PublicLayout>
    );
}
