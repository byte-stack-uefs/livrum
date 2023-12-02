import React from "react";
import { Container, Grid, Paper } from "@mui/material";

import { theme } from '@/app/theme'
import AccountHeader from "../AccountHeader";


export default function InternalLayout({ children }: { children: React.ReactNode }) {
    const title = process.env.APP_NAME;

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
                    }} sm={3} item>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <AccountHeader logoScale={0.15} fontSize={32} theme={theme} title={title} />
                        </div>
                    </Grid>
                    <Grid item sm={9}>
                        {children}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}