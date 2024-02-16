"use client";

import { theme } from "@/app/theme";
import { Card, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DashboardCard from "@/app/components/DashboardCard";
import { Book, MonetizationOn, Sell } from "@mui/icons-material";
import { VisualizationChart, getFakeData } from "@/app/components/VisualizationChart";
import { PopularityTable } from "@/app/components/PopularityTable";
import { EbookTableItem, EbooksTable } from "@/app/components/EbooksTable";
import { TableSelect } from "@/app/components/TableSelect";
import useRequest from "@/app/services/requester";


export default function Page() {
    const username = "Almir";

    const [faturamento, setfaturamento] = useState(null);
    const [totalVendidos, settotalVendidos] = useState(null);
    const [totalObrasCadastradas, settotalObrasCadastradas] = useState(null);
    const [data, setData] = useState([]);
    const requester = useRequest();

    useEffect(() => {
        setData(getFakeData());
    }, []);

    const getCardFaturamento = () => {
        requester
            .get("/author/")
            .then((response) => {
                setfaturamento((prev) => {
                    return response.data;
                });
            })
            .catch((err) => {});
    };
    
    const cards = [
        {
            header: "Faturamento",
            Icon: <MonetizationOn color="darker" fontSize="large" />,
            title: `R$ ${faturamento[data]}`,
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

    const ebooksTableHeaders = [
        '#', 'Nome', 'Categoria', 'Preço', 'Vendidos (und)', "Faturamento"
    ];

    const items: Array<EbookTableItem> = [
        {
            id: 5,
            name: 'Teste',
            price: 51.47,
            sold: 557,
            revenue: 557 * 51.47,
            genres: ['Adventure', 'Terror', 'Comedy']
        }, {
            id: 15,
            name: 'Teste',
            price: 51.47,
            sold: 557,
            revenue: 557 * 51.47,
            genres: ['Adventure', 'Terror', 'Comedy']
        }
    ];

    const categories = [
        {
            value: 4,
            title: 'Terror'
        }
    ];

    const mostSold = [
        {
            id: 10,
            name: 'Teste Ebook',
            popularity: 85
        }
    ]

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
                <Grid xs={12}>
                    <Typography color="darker.main">Visualizações</Typography>
                </Grid>
                <Grid xs={7}>
                    <VisualizationChart data={data} />
                </Grid>
                <Grid xs={5}>
                    <PopularityTable selectItems={[]} selectTitle="Ebook" title="Mais vendidos" items={mostSold} />
                </Grid>
            </Grid>
            <Grid xs={12} container>
                <Grid xs={12}>
                    <Card elevation={0} sx={{ padding: 2 }}>
                        <Grid container xs={12}>
                            <Grid xs={9}>
                                <Typography color="darker.main">eBooks</Typography>
                            </Grid>
                            <Grid xs={3}>
                                <TableSelect items={categories} title="Categorias" onChange={(e) => {
                                    console.log(e)
                                }} />
                            </Grid>
                        </Grid>
                        <Grid xs={12}>
                            <EbooksTable headers={ebooksTableHeaders} items={items} />
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}
