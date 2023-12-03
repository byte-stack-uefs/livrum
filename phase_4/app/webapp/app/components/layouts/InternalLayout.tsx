import React from "react";
import { theme } from '@/app/theme'
import AccountHeader from "../AccountHeader";
import { Avatar, Button, Container, Grid, Paper, Typography } from "@mui/material";
import LivrumButtonMenu from "../LivrumButtonMenu";
import { Discount, Groups, Home, LibraryBooks, Logout, Person, SubdirectoryArrowRight } from "@mui/icons-material";

export default function InternalLayout({ children }: { children: React.ReactNode }) {

    const title = process.env.APP_NAME;
    const name = "Username";
    const email = "email@gmail.com";
    const avatarSrc = 'https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg';

    const buttons: any[] = [
        {
            label: 'Minha conta',
            icon: <Person />
        },
        {
            label: "Painel",
            icon: <Home />
        },
        {
            label: "Obras",
            icon: <LibraryBooks />
        },
        {
            label: "Usuários",
            icon: <Groups />
        },
        {
            label: "Cupons",
            icon: <Discount />
        },
        {
            label: "Submeter",
            icon: <SubdirectoryArrowRight />
        }
    ];

    return (
        <Container maxWidth={false} disableGutters={true} sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1E3345'
        }}>
            <Paper elevation={0} sx={{
                width: '90%',
                height: '85%',
                borderRadius: 6,
                overflow: 'hidden',
                backgroundColor: '#F1F1F1',
            }}>

                <Grid container sx={{
                    height: '100%'
                }}>
                    <Grid sx={{
                        height: '100%',
                        backgroundColor: '#fff',
                        paddingY: 2
                    }} sm={3} item>

                        <Grid container>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <AccountHeader logoScale={0.15} fontSize={32} theme={theme} title={title} />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center', paddingY: 1.5 }}>
                                <Avatar sx={{ margin: 'auto', width: 56, height: 56 }} src={avatarSrc} />
                                <Typography variant="h5" color="darker">{name}</Typography>
                                <Typography variant="body2" color="darker">{email}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LivrumButtonMenu buttons={buttons} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button startIcon={<Logout />} fullWidth color="dark">
                                    Sair
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item sm={9}>
                        {children}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}