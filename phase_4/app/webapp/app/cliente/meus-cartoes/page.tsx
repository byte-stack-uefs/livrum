"use client";

import { DateTime } from "luxon";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import Divider from "@/app/components/Divider";
import TextField from "@mui/material/TextField";
import useRequest from "@/app/services/requester";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormProvider, useForm } from "react-hook-form";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Alert, Box, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Stack, Typography } from "@mui/material";

export default function Page() {
    const [open, setOpen] = useState(false);
    const [cvv, setCVV] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");

    const [cardExpiration, setCardExpiration] = React.useState<DateTime | null>(null);
    const [cardToken, setCardToken] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [cardCreatedSuccessfully, setCardCreatedSuccessfully] = useState(false);

    const [creationError, setCreationError] = useState("");
    const [hasCreationFailed, setHasCreationFailed] = useState(false);

    const [creditCards, setCreditCards] = useState([
        {
            id: 0,
            num: "**** **** **** 1234",
            expiryDate: "11/2030",
            cvc: 110,
            name: "Alguem da Silva",
        },
        {
            id: 1,
            num: "**** **** **** 4321",
            expiryDate: "11/2040",
            cvc: 852,
            name: "Alguem dos Santos",
        },
        {
            id: 2,
            num: "**** **** **** 4567",
            expiryDate: "11/2035",
            cvc: 951,
            name: "Alguem de Jesus",
        },
    ]);

    const methods = useForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const requester = useRequest();

    const handleSave = handleSubmit(async (data) => {
        setIsLoading(true);
        setHasCreationFailed(false);
        setCreationError("");

        console.log(data);
        const token = await tokenizeCard();

        if (!token) {
            return;
        }

        setCardToken(token);

        requester
            .post("/credit-card", {
                cvv: cvv,
                token: cardToken,
                namePrinted: cardHolder,
                cardNumber: cardNumber.slice(12),
                expiryDate: cardExpiration?.toFormat("yyyy-LL"),
            })
            .then((response) => {
                setCardCreatedSuccessfully(true);
                setOpen(false);
                setCVV("");
                setCardHolder("");
                setCardNumber("");
                setCardToken("");
                setCardExpiration(null);

                setHasCreationFailed(false);
                setCreationError("");
            })
            .catch((err) => {
                setHasCreationFailed(true);
                setCreationError(err.response.data.detail);
            })
            .finally(() => {
                setIsLoading(false);
            });
    });

    const getBrand = () => {
        return new Promise((resolve, reject) => {
            try {
                EfiJs.CreditCard.setCardNumber(cardNumber)
                    .verifyCardBrand()
                    .then((brand) => {
                        if (brand !== "undefined") {
                            resolve(brand);
                        } else {
                            reject("Não foi possível identificar a bandeira do cartão");
                        }
                    })
                    .catch((err) => {
                        reject(err.error_description);
                    });
            } catch (error) {
                reject(error.error_description);
            }
        });
    };

    const tokenizeCard = async () => {
        const expirationMonth = cardExpiration?.month;
        const expirationYear = cardExpiration?.year;

        const month = expirationMonth < 10 ? "0" + expirationMonth : expirationMonth;

        const brand = await getBrand()
            .then((response) => {
                return response;
            })
            .catch((err) => {
                // Tratar o erro aqui dentro
                return false;
            });

        if (!brand) {
            return false;
        }

        try {
            return EfiJs.CreditCard.setAccount("49c8fb5b596a53f8a7da4f02b1a18bc5")
                .setEnvironment("sandbox") // 'production' or 'sandbox'
                .setCreditCardData({
                    brand: brand,
                    number: cardNumber,
                    cvv: cvv,
                    expirationMonth: month,
                    expirationYear: expirationYear + "",
                    reuse: true,
                })
                .getPaymentToken()
                .then((data) => {
                    return data.payment_token;
                })
                .catch((err) => {
                    return false;
                });
        } catch (error) {
            return false;
        }
    };

    const handleInputCardNumberChange: any = (event: { target: { value: string } }) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        setCardNumber(inputValue);
    };
    const handleInputCVVChange: any = (event: { target: { value: string } }) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        setCVV(inputValue);
    };

    const handleInputCardHolderChange: any = (event: { target: { value: string } }) => {
        setCardHolder(event.target.value);
    };

    function handleClose() {
        setOpen(false);
    }

    return (
        <Box sx={{ backgroundColor: "secondary.main", borderRadius: 5 }}>
            <Snackbar
                open={cardCreatedSuccessfully}
                autoHideDuration={5000}
                onClose={() => {
                    setCardCreatedSuccessfully(false);
                }}
            >
                <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
                    Cartão cadastrado com sucesso
                </Alert>
            </Snackbar>
            <Grid container>
                <Grid xs={12} p={2}>
                    <Typography variant="h4" fontWeight="bold" color="dark.main">
                        Meus Cartões
                    </Typography>
                    <Divider width="15%" />
                </Grid>
                <Grid xs={12} p={2}>
                    <Box sx={{ backgroundColor: "#FFF", borderRadius: 5 }}>
                        <Grid container p={2}>
                            <Grid xs={12} textAlign="right">
                                <Button
                                    startIcon={<Add />}
                                    variant="contained"
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                >
                                    Adicionar
                                </Button>
                            </Grid>

                            <Grid xs={12} container mt={2}>
                                <Stack direction="column" width="100%" divider={<Divider width="85%" height={2} style={{ margin: "auto" }} />}>
                                    {creditCards.map((creditcard) => (
                                        <Grid key={creditcard.id} xs={12} sx={{ backgroundColor: "white" }} py={2}>
                                            <Grid container>
                                                <Grid xs={4} textAlign="center">
                                                    <CreditCardIcon color="dark" sx={{ fontSize: 80 }} />
                                                </Grid>
                                                <Grid xs={4}>
                                                    <Typography variant="body1">{creditcard.name}</Typography>
                                                    <Typography variant="body2">Válido até {creditcard.expiryDate}</Typography>
                                                    <Typography>{creditcard.num}</Typography>
                                                </Grid>
                                                <Grid xs={4} textAlign="right">
                                                    <Button variant="contained" color="error">
                                                        Excluir
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign="center" sx={{ backgroundColor: "secondary.main", p: 1 }}>
                    Cadastro novo cartão
                </DialogTitle>
                <DialogContent>
                    <FormProvider {...methods}>
                        <form onSubmit={(e) => e.preventDefault()} noValidate autoComplete="false">
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid xs={12}>
                                    <TextField
                                        {...register("cardHolder", {
                                            required: {
                                                value: true,
                                                message: "O nome no cartão é obrigatório",
                                            },
                                        })}
                                        value={cardHolder}
                                        onChange={handleInputCardHolderChange}
                                        label={"Nome no Cartão *"}
                                        fullWidth
                                        size="small"
                                        error={errors.cardHolder ? true : false}
                                        helperText={errors.cardHolder ? errors.cardHolder.message : ""}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        label={"Número do Cartão *"}
                                        fullWidth
                                        size="small"
                                        value={cardNumber}
                                        inputProps={{
                                            inputMode: "numeric",
                                            maxLength: 16,
                                        }}
                                        {...register("cardNumber", {
                                            required: {
                                                value: true,
                                                message: "O número do cartão é obrigatório",
                                            },
                                            minLength: {
                                                value: 16,
                                                message: "O número do cartão deve ter 16 números",
                                            },
                                            maxLength: {
                                                value: 16,
                                                message: "O número do cartão deve ter 16 números",
                                            },
                                        })}
                                        onChange={handleInputCardNumberChange}
                                        error={errors.cardNumber ? true : false}
                                        helperText={errors.cardNumber ? errors.cardNumber.message : ""}
                                    />
                                </Grid>
                                <Grid xs={12} container>
                                    <Grid xs={6}>
                                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                                            <DatePicker
                                                label={"Vencimento"}
                                                views={["month", "year"]}
                                                slotProps={{ textField: { size: "small" } }}
                                                value={cardExpiration}
                                                disablePast
                                                onChange={(value) => {
                                                    setCardExpiration(value);
                                                }}
                                            />
                                        </LocalizationProvider>
                                        {/* <Typography variant="caption" color="error">
                                    {errors.cardExpiration ? errors.cardExpiration.message : ""}
                                </Typography> */}
                                    </Grid>
                                    <Grid xs={6} pl={2}>
                                        <TextField
                                            label={"CVV *"}
                                            fullWidth
                                            size="small"
                                            value={cvv}
                                            inputProps={{
                                                inputMode: "numeric",
                                                maxLength: 3,
                                            }}
                                            {...register("cvv", {
                                                required: {
                                                    value: true,
                                                    message: "O código de segurança do cartão é obrigatório",
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: "O código de segurança deve ter 3 números",
                                                },
                                                maxLength: {
                                                    value: 3,
                                                    message: "O código de segurança deve ter 3 números",
                                                },
                                            })}
                                            onChange={handleInputCVVChange}
                                            error={errors.cvv ? true : false}
                                            helperText={errors.cvv ? errors.cvv?.message : ""}
                                        />
                                    </Grid>
                                </Grid>
                                {hasCreationFailed && (
                                    <Grid xs={12}>
                                        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                                            {creationError}
                                        </Alert>
                                    </Grid>
                                )}
                            </Grid>
                        </form>
                    </FormProvider>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading} color="error" variant="contained" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button disabled={isLoading} type="submit" color="success" variant="contained" onClick={handleSave}>
                        {isLoading ? "Carregando" : "Salvar"}
                    </Button>
                </DialogActions>
            </Dialog>
            <script src="https://cdn.jsdelivr.net/gh/efipay/js-payment-token-efi/dist/payment-token-efi.min.js"></script>
        </Box>
    );
}
