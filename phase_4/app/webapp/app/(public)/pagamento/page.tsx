"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Divider from "@/app/components/Divider";
import { TabSelector } from "@/app/components/TabSelector";
import { PixContainer } from "@/app/components/PixContainer";
import { CheckCircle, CreditCard, Pix } from "@mui/icons-material";
import { PaymentCreditCardContainer } from "@/app/components/PaymentCreditCardContainer";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogContent,
    Grid,
    TextField,
    Typography,
    CircularProgress,
    Skeleton,
    Alert,
} from "@mui/material";
import { useUser } from "@/app/context";
import Ebook from "@/app/interfaces/Ebook";
import useRequest from "@/app/services/requester";
import { Coupon } from "@/app/interfaces/Coupon";

export interface PaymentEbook {
    id: number;
    title: string;
    price: number;
    cover: string;
    authors?: string;
    author: string;
    discount?: number;
}

function PaymentEbook({ ebook }: { ebook: PaymentEbook }) {
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

export default function Page() {
    const router = useRouter();
    const requester = useRequest();
    const [tab, setTab] = useState(0);
    const [total, setTotal] = useState<number | null>(null);
    const [coupon, setCoupon] = useState<string>("");
    const [books, setBooks] = useState<null | Ebook[]>(null);
    const [loading, setLoading] = useState(false);
    const [discount, setDiscount] = useState<number | null>(0);
    const [subtotal, setSubtotal] = useState<number | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [couponObject, setCouponObject] = useState<Coupon | null>(null);

    const [errors, setErrors] = useState<{ coupon?: string }>({});

    const { user } = useUser();

    useEffect(() => {
        const calculate = subtotal - discount;
        setTotal(calculate < 0 ? 0 : calculate);
    }, [subtotal, discount]);

    useEffect(() => {
        requester
            .get("/cart")
            .then((response) => {
                setBooks(response.data);
            })
            .catch((err) => {});
    }, []);

    useEffect(() => {
        if (books) {
            let sub = 0;
            let d = 0;

            let discountPercentage = 0;

            if (couponObject != null) {
                discountPercentage = couponObject.percentage / 100;
            }

            for (let b of books) {
                if (b.isAvailable) {
                    sub += b.price;

                    if (couponObject && couponObject.idAuthor == b.idAuthor) {
                        b.discount = b.price * discountPercentage;
                        d += b.discount;
                    }
                }
            }

            setSubtotal(sub);
            setDiscount(d);
        }
    }, [books, couponObject]);

    const tabItems = [
        {
            title: "Cartão",
            icon: <CreditCard />,
        },
        {
            title: "Pix",
            icon: <Pix />,
        },
    ];

    const getBooksLists = () => {
        if (books === null) {
            return <CircularProgress sx={{ mt: 1 }} />;
        }

        return books.map((e) => {
            return <PaymentEbook key={e.id} ebook={e} />;
        });
    };

    const checkCoupon = () => {
        delete errors.coupon;

        if (coupon != "") {
            setLoading(true);
            requester
                .get(`/coupon/${coupon}`)
                .then((response) => {
                    setCouponObject(response.data);
                    setCoupon("");
                })
                .catch((err) => {
                    setErrors((prev) => {
                        prev.coupon = err.response.data.detail;
                        return prev;
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 3 }}>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={showSuccessModal}
                onClose={(ev, reason) => {
                    setShowSuccessModal(false);
                }}
            >
                <DialogContent>
                    <Grid container>
                        <Grid xs={12} item textAlign="center">
                            <CheckCircle
                                sx={{ fontSize: 80 }}
                                color="success"
                            />
                        </Grid>
                        <Grid xs={12} item mb={2}>
                            <Typography
                                textAlign="center"
                                color="dark.main"
                                variant="h4"
                            >
                                Pagamento confirmado
                            </Typography>
                        </Grid>
                        <Grid xs={12} item textAlign="center">
                            <Button
                                variant="contained"
                                onClick={() => {
                                    router.push("/cliente/biblioteca");
                                }}
                            >
                                Ir para a biblioteca
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Grid container>
                <Grid item xs={12}>
                    <Typography color="dark.main" variant="h4">
                        Revisar itens do pedido
                    </Typography>
                    <Divider width={"25%"} />
                </Grid>
                <Grid item xs={12}>
                    {getBooksLists()}
                </Grid>
            </Grid>
            <Grid container>
                <Divider width="100%" height={2} style={{ margin: "16px 0" }} />
                <Grid xs={4} item container>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            color="dark.main"
                            fontWeight="bold"
                        >
                            Subtotal:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="dark.main" variant="body1">
                            {subtotal !== null ? (
                                subtotal.toLocaleString("pt-br", {
                                    currency: "BRL",
                                    style: "currency",
                                })
                            ) : (
                                <Skeleton variant="text" />
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            color="dark.main"
                            fontWeight="bold"
                        >
                            Desconto:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="dark.main" variant="body1">
                            {discount !== null ? (
                                discount.toLocaleString("pt-br", {
                                    currency: "BRL",
                                    style: "currency",
                                })
                            ) : (
                                <Skeleton variant="text" />
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            color="dark.main"
                            fontWeight="bold"
                        >
                            Total:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="dark.main" variant="body1">
                            {total !== null ? (
                                total.toLocaleString("pt-br", {
                                    currency: "BRL",
                                    style: "currency",
                                })
                            ) : (
                                <Skeleton variant="text" />
                            )}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={8}
                    textAlign="right"
                    justifyContent="end"
                >
                    <Grid item xs={6}>
                        <TextField
                            value={coupon}
                            onChange={(e) => {
                                delete errors.coupon;
                                setCoupon(e.target.value.toUpperCase());
                            }}
                            fullWidth
                            placeholder="Possui cupom? Digite-o aqui"
                            size="small"
                            disabled={loading}
                            error={errors.coupon ? true : false}
                            helperText={errors.coupon ? errors.coupon : null}
                        ></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            disabled={loading}
                            color="primary"
                            onClick={() => {
                                checkCoupon();
                            }}
                        >
                            {loading ? (
                                <CircularProgress size="1.5rem" />
                            ) : (
                                "Aplicar"
                            )}
                        </Button>
                    </Grid>
                    {couponObject != null ? (
                        <Grid item xs={9} mt={1}>
                            <Alert variant="filled" severity="success">
                                Cupom aplicado: {couponObject.name}
                            </Alert>
                        </Grid>
                    ) : (
                        <></>
                    )}
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Grid item xs={12}>
                    <Typography color="dark.main" variant="h4">
                        Informações de pagamento
                    </Typography>
                    <Divider width={"25%"} />
                </Grid>
                <Grid item xs={12} my={2} container>
                    <Grid item xs={12}>
                        <TabSelector
                            items={tabItems}
                            def={0}
                            onChange={(e) => {
                                setTab(e);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{ border: "1px solid #e5e5e5" }}
                            p={2}
                            borderRadius={2}
                        >
                            <Box sx={{ display: tab == 0 ? "block" : "none" }}>
                                <PaymentCreditCardContainer
                                    onConfirm={() => {
                                        setShowSuccessModal(true);
                                    }}
                                    total={total}
                                    userId={user.idUsuario}
                                />
                            </Box>

                            <Box sx={{ display: tab == 1 ? "block" : "none" }}>
                                <PixContainer
                                    total={total}
                                    userId={user.idUsuario}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
