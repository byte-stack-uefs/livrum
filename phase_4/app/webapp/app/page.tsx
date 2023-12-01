import { Metadata } from "next";
import { Container } from "@mui/material";
import PublicLayout from "./components/layouts/PublicLayout";
import HomePageBooksContainer from "./components/HomePageBooksContainer";

const metadata: Metadata = {
    title: "Home | " + process.env.APP_NAME,
};

export default function Home() {
    const containers = [
        {
            title: "Mais Vendidos",
            books: [
                {
                    title: "A",
                    author: "Almir",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
            ],
        },
        {
            title: "Lançamentos",
            books: [
                {
                    title: "Book",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
            ],
        },
        {
            title: "Mais Acessados",
            books: [
                {
                    title: "A",
                    author: "Almir",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
                {
                    title: "B",
                    author: "Neto",
                    releaseDate: "",
                    image: "https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg",
                },
            ],
        },
    ];

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
