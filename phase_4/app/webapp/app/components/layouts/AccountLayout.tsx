import Footer from "../Footer";
import AccountHeader from "../AccountHeader";
import { Container, Grid } from "@mui/material";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Container maxWidth='md' sx={{ marginTop: 8 }}>
                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                    <AccountHeader />
                </Grid>
            </Container>
            <section>{children}</section>
            <Footer />
        </div>
    );
}
