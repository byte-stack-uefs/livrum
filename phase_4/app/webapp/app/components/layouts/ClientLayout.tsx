import PublicLayout from "./PublicLayout";
import LivrumButtonMenu from "../LivrumButtonMenu";
import { Container, Grid, Paper } from "@mui/material";
import { LivrumButtonMenuItems } from "@/app/interfaces/LivrumButtonMenuProps";
import { AccountBox, CreditCard, LibraryBooks, Person, ReceiptLong } from "@mui/icons-material";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    const buttons: LivrumButtonMenuItems[] = [
        {
            icon: <AccountBox />,
            label: 'Meus Dados',
            visible: true,
            route: '/cliente/meus-dados'
        },
        {
            icon: <CreditCard />,
            label: 'Meus Cartões',
            visible: true,
            route: '/cliente/meus-cartoes'
        },
        {
            icon: <LibraryBooks />,
            label: 'Minha Biblioteca',
            visible: true,
            route: '/cliente/biblioteca'
        },
        {
            icon: <ReceiptLong />,
            label: 'Histórico de Compras',
            visible: true,
            route: '/cliente/historico'
        },
    ];

    return (
        <PublicLayout>
            <Container maxWidth={false} sx={{ marginY: 8 }} disableGutters={true}>
                <Grid container>
                    <Grid item xs={3}>
                        <Paper sx={{ overflow: 'hidden' }}>
                            <Grid container>
                                <Grid item xs={12} sx={{ textAlign: 'center', paddingY: 2, backgroundColor: 'secondary.main' }}>
                                    <Person sx={{ fontSize: 48 }} color="dark" />
                                </Grid>
                                <Grid item xs={12}>
                                    <LivrumButtonMenu buttons={buttons} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Container maxWidth={false}>
                            {children}
                        </Container>
                    </Grid>
                </Grid>

            </Container>

        </PublicLayout>
    );
}
