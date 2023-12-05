import Footer from "../Footer";
import { Stack } from "@mui/material";
import AccountHeader from "../AccountHeader";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <Stack direction="column" justifyContent="space-between" minHeight="100vh">
            <Grid xs={12} sx={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
                <AccountHeader />
            </Grid>
            <Grid xs={12} py={4}>{children}</Grid>
            <Grid xs={12}>
                <Footer />
            </Grid>
        </Stack>
    );
}
