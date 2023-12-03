import PublicLayout from "./PublicLayout";
import { AccountBox, CreditCard, LibraryBooks, Person, ReceiptLong } from "@mui/icons-material";
import { Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    const buttons = [
        {
            icon: <AccountBox />,
            label: 'Meus dados',
            route: ''
        },
        {
            icon: <CreditCard />,
            label: 'Meus cartões',
            route: '',
        },
        {
            icon: <LibraryBooks />,
            label: 'Minha biblioteca',
            route: ''
        },
        {
            icon: <ReceiptLong />,
            label: 'Histórico de compras',
            route: ''
        },
    ];

    return (
        <PublicLayout>
            <Container maxWidth={false} sx={{ marginY: 8 }}>
                <Grid container>
                    <Grid item xs={3}>
                        <Paper sx={{ overflow: 'hidden' }}>
                            <Grid container>
                                <Grid item xs={12} sx={{ textAlign: 'center', paddingY: 2, backgroundColor: '#F4F2F2' }}>
                                    <Person sx={{ fontSize: 48 }} color="dark" />
                                </Grid>
                                <Grid item xs={12}>
                                    <List>
                                        {buttons.map(e => {
                                            return (<ListItem disablePadding>
                                                <ListItemButton selected={false}>
                                                    <ListItemIcon>
                                                        {e.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={e.label} />
                                                </ListItemButton>
                                            </ListItem>)
                                        })}
                                    </List>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        {children}
                    </Grid>
                </Grid>

            </Container>

        </PublicLayout>
    );
}
