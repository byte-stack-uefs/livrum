"use client"

import { theme } from "../theme";
import { DateTime } from "luxon";
import { Card, Grid } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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


export function getFakeData(): Array<{ x: number, y: number }> {
    const data: Array<{ x: number, y: number }> = [];

    const max = getMaxX();
    const x = getX(1, max);

    for (let i = 1; i <= max; i++) {
        data.push({
            x: x[i - 1],
            y: Math.random() * 50,
        });
    }

    return data;
}

export interface ChartData {
    x: number;
    y: number;
}

export function VisualizationChart({ data }: { data: Array<ChartData> }) {

    const [chartWidth, setChartWidth] = useState(0);

    useEffect(() => {
        setChartWidth(document.getElementById("chart-parent")?.clientWidth ?? 500);
    }, []);

    return (<Card elevation={0} sx={{ borderRadius: 2 }} id="chart-parent">

        <Grid container>
            <Grid xs={12} p={2} textAlign="right">
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DatePicker defaultValue={DateTime.now()} label={'Período'} views={['month', 'year']} />
                </LocalizationProvider>
            </Grid>
            <Grid xs={12}>
                {data && (
                    <LineChart
                        dataset={data}
                        xAxis={[
                            {
                                id: "days-month",
                                dataKey: "x",
                                tickMinStep: 4,
                                tickNumber: 6,
                                tickLabelStyle: {
                                    fill: theme.palette.textLight.main,
                                },
                            },
                        ]}
                        yAxis={[
                            {
                                id: "data-axis",
                                tickLabelStyle: {
                                    fill: theme.palette.textLight.main,
                                },
                            },
                        ]}
                        leftAxis={{
                            axisId: "data-axis",
                            disableLine: true,
                            disableTicks: true,
                        }}
                        bottomAxis={{
                            axisId: "days-month",
                            disableLine: true,
                            disableTicks: true,
                            stroke: "red",
                        }}
                        series={[
                            {
                                curve: "catmullRom",
                                dataKey: "y",
                                showMark: false,
                                color: theme.palette.primary.main,
                            },
                        ]}
                        width={chartWidth}
                        height={300}
                    />
                )}
            </Grid>
        </Grid>


    </Card>);
}