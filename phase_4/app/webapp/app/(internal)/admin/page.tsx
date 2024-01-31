"use client";

import { theme } from "@/app/theme";
import { useUser } from "@/app/context";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DashboardCard from "@/app/components/DashboardCard";
import { Book, MonetizationOn, Sell } from "@mui/icons-material";
import { PopularityTable } from "@/app/components/PopularityTable";
import { VisualizationChart, getFakeData } from "@/app/components/VisualizationChart";

export default function Page() {
    const { user } = useUser();

    const [data, setData] = useState([]);
    const [author, setAuthor] = useState(null);

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

    const authors = [
        {
            id: 5,
            name: "Fernando Pessoa",
            popularity: 40,
        },
        {
            id: 10,
            name: "Almir Neto",
            popularity: 20,
        },
    ];

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <Typography variant="h5" sx={{ color: theme.palette.dark.main }}>
                    Bem-vindo, {user.nome}
                </Typography>
            </Grid>
            <Grid xs={12} container>
                {cards.map((e) => {
                    return <DashboardCard {...e} key={e.header} />;
                })}
            </Grid>
            <Grid xs={12}>
                <Typography color="darker.main">Visualizações</Typography>
                <VisualizationChart data={data} />
            </Grid>
            <Grid xs={12}>
                <PopularityTable selectItems={[]} selectTitle="Autor" title="Ranking Autores" items={authors} />
            </Grid>
        </Grid>
    );
}
