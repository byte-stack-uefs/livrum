"use client";

import Image from "next/image";
import Alert from "@mui/material/Alert";
import Ebook from "@/app/interfaces/Ebook";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Divider from "@/app/components/Divider";
import Carousel from "@/app/components/Carousel";
import { useCart } from "../../carrinho/useCart";
import useRequest from "@/app/services/requester";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Container, Skeleton, Typography } from "@mui/material";
import EbookDetails from "@/app/components/EbookDetails";
import "../../../styles/image-zoom.css";

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
    const [fetched, setFetched] = useState(false);
    const [ebook, setEbook] = useState<Ebook>();
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const { id } = params;
    const [similar, setSimilar] = useState(null);

    const requester = useRequest();

    const getEbookByID = async () => {
        const { data } = await requester.get<Ebook>(`/ebook/${id}`);
        setEbook(data);
        setFetched(true);
    };

    if (!fetched) {
        getEbookByID();
    }

    if (!similar) {
        requester.get(`/ebook/similar/${id}`).then((response) => {
            const { data } = response;
            setSimilar(data);
        });
    }

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

    function handleClickAddCart(item: CartItemType) {
        handleAddEbookToCart(item);
        setIsAlertVisible(true);
    }

    const handleClose = (event: any, reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsAlertVisible(false);
    };

    const skeletons = [1, 2, 3, 4];

    return (
        <Container maxWidth={false}>
            <Grid container>
                {ebook ? (
                    <EbookDetails ebook={ebook} onAddCart={handleClickAddCart} shouldDisableAddCart={checkIsProductInCart} />
                ) : (
                    <Grid xs={12} justifyContent={"center"} mt={2}>
                        <Skeleton sx={{ margin: "auto" }} variant="rounded" height={500} width={"75%"}></Skeleton>
                    </Grid>
                )}
                <Snackbar open={isAlertVisible} autoHideDuration={5000} onClose={handleClose}>
                    <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
                        Ebook adicionado ao carrinho
                    </Alert>
                </Snackbar>
                <Grid xs={12} container>
                    <Grid xs={12} textAlign="center">
                        <Typography variant="h4" color="dark.main">
                            Títulos semelhantes
                        </Typography>
                        <Divider width={"15%"} style={{ margin: "auto" }} />
                    </Grid>
                    <Grid xs={12} my={3}>
                        {similar ? (
                            <Carousel items={similar} Child={SimilarEbooks} />
                        ) : (
                            <Grid container xs={12} sx={{ justifyContent: "space-between" }}>
                                {skeletons.map((e) => {
                                    return <Skeleton key={"similar-" + e} variant="rounded" width={"20%"} height={350}></Skeleton>;
                                })}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

function SimilarEbooks(ebook: Ebook) {
    return (
        <div style={{ textAlign: "center", padding: 8 }}>
            <div
                style={{
                    height: 250,
                    margin: "auto",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Image className="image-zoom" fill objectFit="cover" src={ebook.cover} alt="book cover" />
            </div>
            <Typography fontWeight="bold" color="dark.main">
                {ebook.title}
            </Typography>
            <Typography color="dark.main">{ebook.author}</Typography>
        </div>
    );
}
