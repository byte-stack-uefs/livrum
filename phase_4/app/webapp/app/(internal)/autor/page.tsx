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
import { DateTime } from "luxon";

export default function Page() {
    const username = "Almir";

    const [faturamento, setfaturamento] = useState<{ total_valor: number }>({ total_valor: 0 });
    const [totalVendidos, settotalVendidos] = useState<{ total_registros: number }>({ total_registros: 0 });
    const [totalObrasCadastradas, settotalObrasCadastradas] = useState<{ total_registros: number }>({ total_registros: 0 });
    const [data, setData] = useState([]);

    const [date, setDate] = useState(DateTime.now());
    const [dateLocalized, setDateLocalized] = useState(date.setLocale("pt-br"));
    const [monthAsStr, setMonthAsStr] = useState<string>(
        dateLocalized.toFormat("LLLL").charAt(0).toUpperCase() + dateLocalized.toFormat("LLLL").slice(1)
    );

    const requester = useRequest();

    useEffect(() => {
        setData(getFakeData());
        getCardsData();
    }, []);

    useEffect(() => {
        setDateLocalized(date.setLocale("pt-br"));
        setMonthAsStr(dateLocalized.toFormat("LLLL").charAt(0).toUpperCase() + dateLocalized.toFormat("LLLL").slice(1));
        getCardsData(dateLocalized.month, dateLocalized.year);
    }, [date]);

    const getCardFaturamento = () => {
        requester
            .get(`/author/faturamento/mensal/${dateLocalized.month}`)
            .then((response) => {
                setfaturamento((prev) => {
                    return response.data.length > 0 ? response.data[0] : { total_valor: 0 };
                });
            })
            .catch((err) => {});
    };

    const getCardUnidades = () => {
        requester
            .get(`/author/vendas/mensal/${dateLocalized.month}`)
            .then((response) => {
                settotalVendidos((prev) => {
                    return response.data.length > 0 ? response.data[0] : { total_registros: 0 };
                });
            })
            .catch((err) => {});
    };

    const getCardObras = () => {
        requester
            .get(`/author/obras/mensal/${dateLocalized.month}`)
            .then((response) => {
                settotalObrasCadastradas((prev) => {
                    return response.data.length > 0 ? response.data[0] : { total_registros: 0 };
                });
            })
            .catch((err) => {});
    };

    const getCardsData = (month: number, year: number) => {
        getCardFaturamento();
        getCardUnidades();
        getCardObras();
    };

    const cards = [
        {
            header: "Faturamento",
            Icon: <MonetizationOn color="darker" fontSize="large" />,
            title: `${faturamento.total_valor.toLocaleString("pt-br", {
                currency: "BRL",
                style: "currency",
            })}`,
            month: monthAsStr,
            subtitle: "",
        },
        {
            header: "Vendidos",
            Icon: <Sell color="darker" fontSize="large" />,
            title: totalVendidos.total_registros,
            subtitle: "unidades",
            month: monthAsStr,
        },
        {
            header: "Obras",
            Icon: <Book color="darker" fontSize="large" />,
            title: totalObrasCadastradas.total_registros,
            subtitle: "títulos",
            month: monthAsStr,
        },
    ];

    const ebooksTableHeaders = ["#", "Nome", "Categoria", "Preço", "Vendidos (und)", "Faturamento"];

    const items: Array<EbookTableItem> = [
        {
            id: 5,
            name: "Teste",
            price: 51.47,
            sold: 557,
            revenue: 557 * 51.47,
            genres: ["Adventure", "Terror", "Comedy"],
        },
        {
            id: 15,
            name: "Teste",
            price: 51.47,
            sold: 557,
            revenue: 557 * 51.47,
            genres: ["Adventure", "Terror", "Comedy"],
        },
    ];

    const categories = [
        {
            value: 4,
            title: "Terror",
        },
    ];

    const mostSold = [
        {
            id: 10,
            name: "Teste Ebook",
            popularity: 85,
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
                <Grid xs={12}>
                    <Typography color="darker.main">Visualizações</Typography>
                </Grid>
                <Grid xs={7}>
                    <VisualizationChart
                        onChange={(val) => {
                            console.log(val);
                            setDate(val);
                        }}
                        data={data}
                    />
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
                                <TableSelect
                                    items={categories}
                                    title="Categorias"
                                    onChange={(e) => {
                                        console.log(e);
                                    }}
                                />
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
