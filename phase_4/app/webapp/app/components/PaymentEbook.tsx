import Image from "next/image";
import Divider from "./Divider";
import { Alert, Grid, Typography } from "@mui/material";

export interface PaymentEbook {
    id: number;
    title: string;
    price: number;
    cover: string;
    authors?: string;
    author: string;
    discount?: number;
    isAvailable: boolean;
}

export function PaymentEbook({ ebook }: { ebook: PaymentEbook }) {
    return (
        <Grid container py={2}>
            <Grid item xs={3} position="relative" minHeight={200}>
                {ebook.cover ? (
                    <Image
                        src={ebook.cover}
                        fill
                        alt="Book cover"
                        objectFit="contain"
                    />
                ) : (
                    <></>
                )}
            </Grid>
            <Grid item xs={9} container alignContent={"center"}>
                <Grid item xs={12}>
                    <Typography
                        variant="h6"
                        color="dark.main"
                        fontWeight="bold"
                    >
                        {ebook.title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" color="dark.main">
                        por {ebook.author}{" "}
                        {ebook.authors ? ", " + ebook.authors : ""}
                    </Typography>
                    <Divider width="80%" height={2} />
                </Grid>
                <Grid item xs={12}>
                    {ebook.isAvailable ? (
                        <Typography
                            variant="body1"
                            color="dark.main"
                            fontWeight="bold"
                        >
                            {ebook.price.toLocaleString("pt-br", {
                                currency: "BRL",
                                style: "currency",
                            })}
                        </Typography>
                    ) : (
                        <Alert sx={{ mt: 1 }} severity="error" variant="filled">
                            Ebook indisponível para compra
                        </Alert>
                    )}
                </Grid>
                {ebook.discount ? (
                    <Grid item xs={12}>
                        <Typography variant="body1" color="error">
                            Desconto:{" "}
                            {ebook.discount.toLocaleString("pt-br", {
                                currency: "BRL",
                                style: "currency",
                            })}
                        </Typography>
                    </Grid>
                ) : (
                    <></>
                )}
            </Grid>
        </Grid>
    );
}
