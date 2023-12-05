import Footer from "../Footer";
import AccountHeader from "../AccountHeader";
import { Box, Container, Grid } from "@mui/material";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Container maxWidth="md" sx={{ marginTop: 8 }}>
                <Grid sx={{ display: "flex", justifyContent: "center" }}>
                    <AccountHeader />
                </Grid>
            </Container>
            <Box marginY={4}>{children}</Box>
            <Footer />
        </div>
    );
}
