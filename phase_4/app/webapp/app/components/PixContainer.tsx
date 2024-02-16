"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import useRequest from "../services/requester";
import { Alert, CircularProgress, Grid } from "@mui/material";

export function PixContainer({ total, userId }: { total: Number; userId: number }) {
    const requester = useRequest();

    const [txid, setTxid] = useState<string | null>(null);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [timer, setTimer] = useState(null);

    const checkPix = async () => {
        if (txid != null) {
            await requester
                .get(`/payment/pix/isPaid/${txid}`, {})
                .then((response) => {
                    if (response.data) {
                        console.log("Pix Pago");
                    }
                })
                .catch((err) => {
                    setError(err.response.data.detail);
                    clearInterval(timer);
                });
        }
    };

    const getPix = () => {
        if (timer != null) {
            clearInterval(timer);
        }

        requester
            .post("/payment/pix", {})
            .then(({ data }) => {
                const { txid, qrcode } = data;
                setTxid(txid);
                setQrCode(qrcode);

                const t = setInterval(checkPix, 5000);
                setTimer(t);
            })
            .catch((err) => {
                setError(err.response.data.detail);
            });
    };

    useEffect(() => {
        setError(null);
        setTxid(null);
        setQrCode(null);
        getPix();
    }, [total]);

    useEffect(() => {
        getPix();
    }, []);

    const getContent = () => {
        if (error !== null) {
            return (
                <Alert severity="error" variant="filled">
                    {error}
                </Alert>
            );
        }

        return qrCode == null ? <CircularProgress /> : <Image width={400} height={400} src={qrCode} alt="PaymentQrCode" />;
    };

    return (
        <Grid container>
            <Grid item xs={12} textAlign="center">
                {getContent()}
            </Grid>
            <Grid item xs={3}></Grid>
            {!error && (
                <Grid item xs={12} md={6}>
                    <p style={{ textAlign: "center" }}>Escaneie o QRCode e realize o pagamento no aplicativo do banco</p>
                </Grid>
            )}
        </Grid>
    );
}
