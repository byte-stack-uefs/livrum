"use client";

import DashboardCard from "@/app/components/DashboardCard";
import { theme } from "@/app/theme";
import { Book, MonetizationOn, Sell } from "@mui/icons-material";
import { Typography } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function Page() {
    const username = "Almir";

    const cards = [
        {
            header: "Faturamento",
            Icon: <MonetizationOn color="darker" fontSize="large" />,
            title: "R$ 450,00",
            month: "Julho",
            subtitle: "",
        },
        {
            header: "Vendidos",
            Icon: <Sell color="darker" fontSize="large" />,
            title: "431",
            subtitle: "unidades",
            month: "Julho",
        },
        {
            header: "Obras",
            Icon: <Book color="darker" fontSize="large" />,
            title: "31",
            subtitle: "títulos",
            month: "Julho",
        },
    ];

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <Typography variant="h5" sx={{ color: theme.palette.dark.main }}>
                    Bem-vindo, {username}
                </Typography>
            </Grid>
            <Grid xs={12} container>
                {cards.map((e) => {
                    return <DashboardCard {...e} key={e.header} />;
                })}
            </Grid>
            <Grid xs={12} container>
                <Grid xs={7}>Gráfico</Grid>
                <Grid xs={5}>MAis vendidos</Grid>
            </Grid>
            <Grid xs={12}>ebooks</Grid>
        </Grid>
    );
}
