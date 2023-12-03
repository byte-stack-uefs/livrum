"use client";

import Link from "next/link";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import AccountHeader from "../AccountHeader";
import { UserLevel } from "@/app/interfaces/User";
import LivrumButtonMenu from "../LivrumButtonMenu";
import { LivrumButtonMenuItems } from "@/app/interfaces/LivrumButtonMenuProps";
import { Avatar, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Discount, Groups, Home, LibraryBooks, Logout, Person, SubdirectoryArrowRight } from "@mui/icons-material";

export default function InternalLayout({ children }: { children: React.ReactNode }) {

    const name = "Username";
    const email = "email@gmail.com";
    const avatarSrc = 'https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg';
    const [userLevel, setUserLevel] = useState(UserLevel.ADMIN);

    const buttons: LivrumButtonMenuItems[] = [
        {
            label: 'Minha Conta',
            icon: <Person />,
            visible: true
        },
        {
            label: "Painel",
            icon: <Home />,
            visible: true
        },
        {
            label: "Obras",
            icon: <LibraryBooks />,
            visible: userLevel == UserLevel.ADMIN
        },
        {
            label: "Minhas Obras",
            icon: <LibraryBooks />,
            visible: userLevel == UserLevel.AUTHOR
        },
        {
            label: "Usuários",
            icon: <Groups />,
            visible: userLevel == UserLevel.ADMIN
        },
        {
            label: "Cupons",
            icon: <Discount />,
            visible: true
        },
        {
            label: "Submeter",
            icon: <SubdirectoryArrowRight />,
            visible: userLevel == UserLevel.AUTHOR
        }
    ];

    function handleLogout() {
        window.location.replace('/login')
    }

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
                        paddingTop: 2
                    }} sm={3} item>

                        <Grid container sx={{ height: '100%' }}>
                            <Grid item xs={12} >
                                <Link href={userLevel == UserLevel.ADMIN ? '/admin' : '/autor'} style={{ display: 'flex', justifyContent: 'space-evenly', textDecoration: 'none' }}>
                                    <AccountHeader logoScale={0.15} fontSize={32} />
                                </Link>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center', paddingY: 1.5 }}>
                                <Avatar sx={{ margin: 'auto', width: 56, height: 56 }} src={avatarSrc} />
                                <Typography variant="h5" color="darker">{name}</Typography>
                                <Typography variant="body2" color="darker">{email}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LivrumButtonMenu buttons={buttons} />
                            </Grid>
                            <Grid item xs={12} sx={{ alignSelf: 'flex-end' }}>
                                <Button size="large" startIcon={<Logout />} fullWidth color="dark" onClick={(e) => { handleLogout() }}>
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