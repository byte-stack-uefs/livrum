import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, Divider, Grid } from "@mui/material";

import Image from "next/image";

function ContainerBookCard({ book }: { book: any }) {
    return (
        <div className="text-center p-4">
            <div
                style={{
                    height: 300,
                    width: 300,
                }}
            >
                <Image width={300} height={300} style={{ objectFit: "cover", height: "100%" }} alt={book.title} src={book.image} />
            </div>
            <p className="font-bold">{book.title}</p>
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
        <div className="text-center">
            <h3 className="text-livrum-dark text-4xl font-bold">{title}</h3>
            <Divider className="border-livrum-primary-500" style={{ height: 5, borderColor: "blue" }} />

            <Grid container>
                {books.map((e) => {
                    return (
                        <Grid item xs={12} md={4}>
                            <ContainerBookCard book={e} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
