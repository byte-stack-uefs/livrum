"use client";

import { useState } from "react";
import AccountHeader from "./AccountHeader";
import { Person, Search, ShoppingCart } from "@mui/icons-material";
import { Box, Container, FormControl, Grid, InputAdornment, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, Toolbar } from "@mui/material";

export function TopMain(props: { title?: string; theme: Theme }) {

    const { title, theme } = props;
    const [category, setCategory] = useState('all');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const categories = [
        {
            title: 'Todos',
            value: 'all'
        },
        {
            title: 'Aventura',
            value: 'aventura'
        },
        {
            title: "Comédia",
            value: 'comedia'
        }
    ];

    const searchSelect = (<InputAdornment position="start">
        <Select
            size="small"
            value={category}
            onChange={handleChange}
            sx={
                {
                    border: 'none',
                    borderRadius: 8,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderLeft: 0,
                    width: '150px'
                }
            }
        >
            {categories.map((e) => {
                return <MenuItem value={e.value}>
                    {e.title}
                </MenuItem>
            })}
        </Select>
    </InputAdornment>);

    return (
        <Container maxWidth={false}>
            <Toolbar sx={{ textTransform: "uppercase" }}>

                <Grid container sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Grid item sm={3} md={3} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <AccountHeader logoScale={0.17} fontSize={42} theme={theme} />
                    </Grid>
                    <Grid item sm={4} md={7}>
                        <FormControl fullWidth>
                            <OutlinedInput
                                size="small"
                                sx={{ paddingLeft: 0, borderRadius: 8, backgroundColor: '#F4F2F2' }}
                                startAdornment={searchSelect}
                                endAdornment={<InputAdornment position="end">
                                    <Search />
                                </InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={4} md={2} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <ShoppingCart sx={{ fontSize: 40 }} color="darker" />
                        <Person sx={{ fontSize: 40 }} color="darker" />
                    </Grid>
                </Grid>

            </Toolbar>
        </Container>
    );
}

export function TopSecond(props: { pros: Array<any>; theme: Theme }) {
    const { theme, pros } = props;

    return (
        <Container sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, height: "3rem" }} maxWidth={false}>
            <Grid container sx={{ textAlign: "center", height: "100%" }}>
                {pros.map((e, idx) => {
                    return (
                        <Grid key={e} item xs={4} sx={{ paddingY: 1, alignSelf: "center" }}>
                            <Box sx={{ borderRight: idx != 2 ? "1px solid white" : "", height: "100%" }}>
                                <span>{e}</span>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}
