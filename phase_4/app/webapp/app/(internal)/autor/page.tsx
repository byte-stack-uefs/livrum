"use client";

import { theme } from "@/app/theme";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DashboardCard from "@/app/components/DashboardCard";
import { Book, MonetizationOn, Sell } from "@mui/icons-material";
import { VisualizationChart, getFakeData } from "@/app/components/VisualizationChart";
import { PopularityTable } from "@/app/components/PopularityTable";

export default function Page() {
    const username = "Almir";

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getFakeData());
    }, []);

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
                <Grid xs={8}>
                    <Typography color="darker.main">Visualizações</Typography>
                    <VisualizationChart data={data} />
                </Grid>
                <Grid xs={4}>
                    <PopularityTable selectTitle="Ebook" title="Mais vendidos" items={[]} />
                </Grid>
            </Grid>
            <Grid xs={12}>ebooks</Grid>
        </Grid>
    );
}
