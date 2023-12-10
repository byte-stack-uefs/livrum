"use client"

import { DateTime } from "luxon";
import { theme } from "@/app/theme";
import { LineChart } from "@mui/x-charts";
import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DashboardCard from "@/app/components/DashboardCard";
import { Book, MonetizationOn, Sell } from '@mui/icons-material';


export default function Page() {
    const username = "Admin";

    const [chartWidth, setChartWidth] = useState(0);
    const [data, setData] = useState(null);

    useEffect(() => {
        setChartWidth(document.getElementById('chart-parent')?.clientWidth ?? 500);
        setData(getData())
    }, []);

    function getMaxX() {
        const today = DateTime.now();
        const days = today.daysInMonth;
        return days;
    }

    function getX(min: number, max: number, increment: number = 1) {
        const data = [];
        for (let i = min; i <= max; i = i + increment) {
            data.push(i);
        }
        return data;
    }

    function getData(): any[] {
        const data: any[] = []

        const max = getMaxX();
        const x = getX(1, max);

        for (let i = 1; i <= max; i++) {
            data.push({
                x: x[i - 1],
                y: Math.random() * 2000
            })

        }

        return data;
    }

    const cards = [
        {
            header: 'Faturamento',
            Icon: <MonetizationOn color="darker" fontSize="large" />,
            title: 'R$ 450,00',
            month: 'Julho',
            subtitle: ''
        },
        {
            header: 'Vendidos',
            Icon: <Sell color="darker" fontSize="large" />,
            title: '431',
            subtitle: 'unidades',
            month: 'Julho'
        },
        {
            header: 'Obras',
            Icon: <Book color="darker" fontSize="large" />,
            title: '31',
            subtitle: 'títulos',
            month: 'Julho'
        }
    ]

    return (
        <Grid container spacing={2} my={2}>
            <Grid xs={12}>
                <Typography variant="h5" sx={{ color: theme.palette.dark.main }}>
                    Bem-vindo, {username}
                </Typography>
            </Grid>
            <Grid xs={12} container>
                {cards.map(e => {
                    return <DashboardCard {...e} key={e.header} />
                })}
            </Grid>
            <Grid xs={12} id="chart-parent">
                <Typography sx={{ color: theme.palette.darker.main }}>
                    Visualizações
                </Typography>
                <Card elevation={0} sx={{ borderRadius: 2 }}>
                    {data && <LineChart
                        dataset={data}
                        xAxis={[{
                            dataKey: 'x',
                            tickNumber: 5,
                            tickLabelStyle: {
                                fill: theme.palette.textLight.main,
                            },
                            disableLine: true
                        }]}
                        yAxis={[{
                            tickLabelStyle: {
                                fill: theme.palette.textLight.main,
                            },
                        }
                        ]}

                        series={[
                            {
                                curve: 'catmullRom',
                                dataKey: 'y',
                                showMark: false,
                                color: theme.palette.primary.main,

                            },
                        ]}
                        width={chartWidth}
                        height={300}
                    />}
                </Card>
            </Grid>
            <Grid xs={12}>

            </Grid>
        </Grid>
    );
}