import { theme } from "@/app/theme";
import PublicFooter from "../Footer";
import AccountHeader from "../AccountHeader";
import { Container, Grid } from "@mui/material";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Container maxWidth='md' sx={{ marginTop: 8 }}>
                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                    <AccountHeader theme={theme} />
                </Grid>
            </Container>
            <section>{children}</section>
            <PublicFooter theme={theme} email={process.env.APP_EMAIL} company={process.env.COMPANY} />
        </div>
    );
}
