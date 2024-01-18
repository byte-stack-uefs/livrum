"use client";

import LivrumLink from "../LivrumLink";
import React, { useState } from "react";
import { useUser } from "@/app/context";
import { useRouter } from "next/navigation";
import AccountHeader from "../AccountHeader";
import { UserLevel } from "@/app/interfaces/User";
import LivrumButtonMenu from "../LivrumButtonMenu";
import { LivrumButtonMenuItems } from "@/app/interfaces/LivrumButtonMenuProps";
import { Avatar, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Discount, Groups, Home, LibraryBooks, Logout, Person, SubdirectoryArrowRight } from "@mui/icons-material";

export default function InternalLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const router = useRouter();

    const avatarSrc =
        "https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg";
    const [userLevel, setUserLevel] = useState(user.tipo);

    const base = UserLevel.ADMIN ? "/admin" : "/autor";

    const buttons: LivrumButtonMenuItems[] = [
        {
            label: "Minha Conta",
            icon: <Person />,
            visible: true,
            route: `${base}/meus-dados`,
        },
        {
            label: "Painel",
            icon: <Home />,
            visible: true,
            route: base,
        },
        {
            label: "Obras",
            icon: <LibraryBooks />,
            visible: userLevel == UserLevel.ADMIN,
            route: `${base}/obras`,
        },
        {
            label: "Minhas Obras",
            icon: <LibraryBooks />,
            visible: userLevel == UserLevel.AUTHOR,
            route: `${base}/ebooks`,
        },
        {
            label: "Usuários",
            icon: <Groups />,
            visible: userLevel == UserLevel.ADMIN,
            route: `${base}/users`,
        },
        {
            label: "Cupons",
            icon: <Discount />,
            visible: true,
            route: `${base}/cupons`,
        },
        {
            label: "Submeter",
            icon: <SubdirectoryArrowRight />,
            visible: userLevel == UserLevel.AUTHOR,
            route: "/autor/ebook/publicar",
        },
    ];

    function handleLogout() {
        if (userLevel == UserLevel.ADMIN) {
            router.push("/admin/login");
        } else {
            router.push("login");
        }
    }

    return (
        <Container
            maxWidth={false}
            disableGutters={true}
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1E3345",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "90%",
                    height: "85%",
                    borderRadius: 6,
                    overflow: "hidden",
                    backgroundColor: "#F1F1F1",
                }}
            >
                <Grid
                    container
                    sx={{
                        height: "100%",
                    }}
                >
                    <Grid
                        sx={{
                            height: "100%",
                            backgroundColor: "#fff",
                            paddingTop: 2,
                        }}
                        sm={3}
                        item
                    >
                        <Grid container sx={{ height: "100%" }}>
                            <Grid item xs={12}>
                                <LivrumLink
                                    href={userLevel == UserLevel.ADMIN ? "/admin" : "/autor"}
                                    style={{ display: "flex", justifyContent: "space-evenly" }}
                                >
                                    <AccountHeader logoScale={0.15} fontSize={32} />
                                </LivrumLink>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: "center", paddingY: 1.5 }}>
                                <Avatar sx={{ margin: "auto", width: 56, height: 56 }} src={avatarSrc} />
                                <Typography variant="h5" color="darker">
                                    {user.nome}
                                </Typography>
                                <Typography variant="body2" color="darker">
                                    {user.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LivrumButtonMenu buttons={buttons} />
                            </Grid>
                            <Grid item xs={12} sx={{ alignSelf: "flex-end" }}>
                                <Button
                                    size="large"
                                    startIcon={<Logout />}
                                    fullWidth
                                    color="dark"
                                    onClick={(e) => {
                                        handleLogout();
                                    }}
                                >
                                    Sair
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={9} sx={{ overflowY: "scroll", height: "100%" }}>
                        <Container maxWidth={false} sx={{ py: 2 }}>
                            {children}
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
