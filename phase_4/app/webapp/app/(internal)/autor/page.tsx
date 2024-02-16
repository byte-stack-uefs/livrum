"use client";

import { theme } from "@/app/theme";
import { Card, Select, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DashboardCard from "@/app/components/DashboardCard";
import { Book, MonetizationOn, Sell } from "@mui/icons-material";
import { VisualizationChart, getFakeData } from "@/app/components/VisualizationChart";
import { PopularityTable } from "@/app/components/PopularityTable";
import { EbookTableItem, EbooksTable } from "@/app/components/EbooksTable";
import { TableSelect } from "@/app/components/TableSelect";
import useRequest from "@/app/services/requester";
import { useUser } from "@/app/context";

export default function Page() {
    const username = "Almir";
    const { user, updateUser } = useUser();

    const [data, setData] = useState([]);
    const [items, setItems] = useState([] as Array<EbookTableItem>)
    const [itemsWithoutSearch, setItemsWithoutSearch] = useState([] as Array<EbookTableItem>)
    const [categories, setCategories] = useState([]);

    const requester = useRequest();

    useEffect(() => {
        setData(getFakeData());
        requester.get("/ebook/private/best-sellers")
            .then((response: { data: SetStateAction<EbookTableItem[]>; }) => {
                let aux = response.data as EbookTableItem[];
                setItems(response.data);
                setItemsWithoutSearch(response.data);
                let cat = [...new Set(aux.flatMap(item => item.genres)) as any].map(genre => ({ title: genre, value: genre }));;
                setCategories(cat as any);
            })
            .catch((err) => {console.log(err)});
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

    const ebooksTableHeaders = [
        '#', 'Nome', 'Categoria', 'Preço', 'Vendidos (und)', "Faturamento"
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
                    Bem-vindo, {user.nome}
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
                                    
                                    let itemsFiltered = itemsWithoutSearch.filter((item) => item.genres.includes(e as any));
                                    
                                    setItems(itemsFiltered);
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
