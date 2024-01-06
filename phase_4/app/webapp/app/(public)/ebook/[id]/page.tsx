"use client";

import Image from "next/image";
import Ebook from "@/app/interfaces/Ebook";
import Divider from "@/app/components/Divider";
import Carousel from "@/app/components/Carousel";
import { useCart } from "../../carrinho/useCart";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Container, Typography } from "@mui/material";
import EbookDetails from "@/app/components/EbookDetails";

interface EbookPageParams {
    id: number;
}

export type CartItemType = {
    id: number;
    title: string;
    cover: string;
    author: string;
    price: number;
};

export default function Page({ params }: { params: EbookPageParams }) {
    const { id } = params;

    const similars = [
        {
            title: "AAA",
            author: "Almir",
            cover: "https://cdn.kobo.com/book-images/6750d058-29cb-4626-9c12-a62e816a80cc/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
        },
        {
            title: "AAA",
            author: "Almir",
            cover: "https://cdn.kobo.com/book-images/6750d058-29cb-4626-9c12-a62e816a80cc/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
        },
        {
            title: "AAA",
            author: "Almir",
            cover: "https://cdn.kobo.com/book-images/6750d058-29cb-4626-9c12-a62e816a80cc/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
        },
        {
            title: "AAA",
            author: "Almir",
            cover: "https://cdn.kobo.com/book-images/6750d058-29cb-4626-9c12-a62e816a80cc/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
        },
        {
            title: "AAA",
            author: "Almir",
            cover: "https://cdn.kobo.com/book-images/6750d058-29cb-4626-9c12-a62e816a80cc/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
        },
    ];

    const ebook: Ebook = {
        id: id,
        title: "Os irmãos Karamazov",
        cover: "https://cdn.kobo.com/book-images/6750d058-29cb-4626-9c12-a62e816a80cc/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
        author: "Fiodor Dostoievsk",
        price: 110,
        releaseYear: '2012',
        summary: `<p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus recusandae facere eveniet, magni tempora
            praesentium alias itaque explicabo accusamus asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint
            consequatur?
        </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus recusandae facere eveniet, magni tempora
                praesentium alias itaque explicabo accusamus asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint
                consequatur?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus recusandae facere eveniet, magni tempora
                praesentium alias itaque explicabo accusamus asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint
                consequatur?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus recusandae facere eveniet, magni tempora
                praesentium alias itaque explicabo accusamus asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint
                consequatur?
            </p>`,
        isAvailable: true,
        languages: ['Português'],
        size: 8952

    };
    const { handleAddEbookToCart } = useCart();

    function checkIsProductInCart(item: CartItemType) {
        if (useCart().cartItems) {
            const existingIndex = useCart().cartItems.findIndex((product) => product.id == item.id);

            if (existingIndex > -1) {
                return true;
            } else {
                return false;
            }
        }
    }

    function mensagemClick() {
        <span>Produto adicionado ao carrinho</span>;
    }
    function handleClickAddCart(item: CartItemType) {
        handleAddEbookToCart(item);
        mensagemClick();
    }

    return (
        <Container maxWidth={false}>
            <Grid container>

                <EbookDetails ebook={ebook} onAddCart={handleClickAddCart} shouldDisableAddCart={checkIsProductInCart} />

                <Grid xs={12} container>
                    <Grid xs={12} textAlign="center">
                        <Typography variant="h4" color="dark.main">
                            Títulos semelhantes
                        </Typography>
                        <Divider width={"15%"} style={{ margin: "auto" }} />
                    </Grid>
                    <Grid xs={12} my={3}>
                        <Carousel items={similars} Child={SimilarEbooks} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

function SimilarEbooks(ebook: any) {
    return (
        <div style={{ textAlign: "center", padding: 8 }}>
            <Image src={ebook.cover} width={3000} height={3000} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="book cover" />
            <Typography fontWeight="bold" color="dark.main">
                {ebook.title}
            </Typography>
            <Typography color="dark.main">{ebook.author}</Typography>
        </div>
    );
}


