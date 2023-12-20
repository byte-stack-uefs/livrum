import { Grid } from "@mui/material";
import Image from "next/image";
import qrcode from '@/app/assets/qrcode.png'

export function PixContainer() {
    return (
        <Grid container>
            <Grid xs={12} textAlign="center">
                <Image width={400} height={400} src={qrcode} alt="PaymentQrCode" />
            </Grid>
            <Grid xs={3}></Grid>
            <Grid xs={12} md={6}>
                <p style={{ textAlign: 'center' }}>Escaneie o QRCode e realize o pagamento no aplicativo do banco</p>
            </Grid>
        </Grid>
    );
}