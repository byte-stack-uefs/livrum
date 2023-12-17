"use client";

import { DateTime } from "luxon";
import { theme } from "@/app/theme";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DashboardCard from "@/app/components/DashboardCard";
import { Book, MonetizationOn, Sell } from "@mui/icons-material";
import {
    Box,
    Card,
    FormControl,
    InputLabel,
    LinearProgress,
    LinearProgressProps,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { VisualizationChart, getFakeData } from "@/app/components/VisualizationChart";

export default function Page() {
    const username = "Admin";


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
                    Bem-vindo, {username}
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
                <Card elevation={0} sx={{ borderRadius: 2 }}>
                    <Grid container padding={2}>
                        <Grid xs={9}>
                            <Typography variant="h5" color="darker.main">
                                Ranking Autores
                            </Typography>
                        </Grid>
                        <Grid xs={3}>
                            <FormControl fullWidth>
                                <InputLabel size="small" id="autor-select-label">
                                    Autor
                                </InputLabel>
                                <Select
                                    labelId="autor-select-label"
                                    id="autor-select"
                                    value={author}
                                    label="Autor"
                                    onChange={(e) => {
                                        setAuthor(e.target.value);
                                    }}
                                    size="small"
                                    sx={{
                                        borderRadius: 3,
                                        backgroundColor: "secondary.main",
                                        "& > .MuiOutlinedInput-notchedOutline": {
                                            border: "none",
                                        },
                                    }}
                                >
                                    <MenuItem value={10}>X</MenuItem>
                                    <MenuItem value={20}>Y</MenuItem>
                                    <MenuItem value={30}>Z</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="left">Nome</TableCell>
                                <TableCell align="left">Popularidade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {authors.map((e) => {
                                return (
                                    <TableRow>
                                        <TableCell align="center">{e.id}</TableCell>
                                        <TableCell>{e.name}</TableCell>
                                        <TableCell>
                                            <LinearProgressWithLabel value={e.popularity} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Card>
            </Grid>
        </Grid>
    );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress sx={{ height: 8, borderRadius: 5 }} variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="primary.main">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
