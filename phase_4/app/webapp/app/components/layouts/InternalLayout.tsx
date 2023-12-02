"use client";

import React from "react";
import { Container, Grid, Paper } from "@mui/material";

import { theme } from '@/app/theme'

export default function InternalLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth={false} disableGutters={true} sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.dark.main,
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
                        backgroundColor: 'blue',
                    }} >
                        AQUI VAI FICAR O SIDEBAR, IGNOREM
                    </Grid>
                    <Grid sm={8}>
                        {children}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}