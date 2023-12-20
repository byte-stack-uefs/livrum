"use client";
import React from "react";
import { useState } from "react";
import Divider from "@/app/components/Divider";
import SortIcon from "@mui/icons-material/Sort";
import EbookCard from "../../components/E-bookCard";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import {
    Box,
    List,
    Stack,
    Button,
    Slider,
    Checkbox,
    ListItem,
    Container,
    FormGroup,
    TextField,
    Pagination,
    Typography,
    FormControlLabel,
} from "@mui/material";

function PageHeader() {
    return (
        <Grid xs={12} my={2}>
            <Typography variant="h3">Catálogo</Typography>
            <Divider width="10%" />
        </Grid>
    );
}

function SearchBox() {
    return (
        <Grid xs={8}>
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                id="outlined-basic"
                label="Pesquise por nome ou autor"
                sx={{ backgroundColor: "#FFFFFF" }}
            />
        </Grid>
    );
}

function SearchButton() {
    return (
        <Grid xs={4} textAlign="center">
            <Button variant="contained">Buscar</Button>
        </Grid>
    );
}

function GenreSection() {
    return (
        <Grid container sx={{ fontSize: 10 }}>
            <Grid xs={12} sx={{ fontSize: 12 }}>
                <h1>Gênero</h1>
            </Grid>
            <Grid xs={12}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Ação" />
                    <FormControlLabel control={<Checkbox />} label="Comédia" />
                    <FormControlLabel control={<Checkbox />} label="Drama" />
                    <FormControlLabel control={<Checkbox />} label="Romance" />
                </FormGroup>
            </Grid>
        </Grid>
    );
}

function SearchSection() {
    // TODO: testar novamente depois
    return (
        <Grid xs={12}>
            <Grid container>
                <Grid xs={8}>
                    <TextField
                        id="outlined-basic"
                        label="Pesquise por nome ou autor"
                        variant="outlined"
                        fullWidth
                        style={{ backgroundColor: "#FFFFFF" }}
                        inputProps={{ style: { fontSize: 10 } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 10 } }} // font size of input label
                    />
                    <Grid xs={4}>
                        <Button variant="contained">Buscar</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

function LanguageSection() {
    return (
        <Grid container>
            <Grid xs={12} sx={{ fontSize: 12 }}>
                <h1>Idioma</h1>
            </Grid>
            <Grid xs={12}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Português" />
                    <FormControlLabel control={<Checkbox />} label="Inglês" />
                    <FormControlLabel control={<Checkbox />} label="Espanhol" />
                    <FormControlLabel control={<Checkbox />} label="Francês" />
                </FormGroup>
            </Grid>
        </Grid>
    );
}

function SideBarMenu() {
    return (
        <Grid xs={4}>
            <Grid container sx={{ backgroundColor: "#F4F2F2", borderRadius: "16px" }}>
                <Grid xs={12} container>
                    <SearchBox></SearchBox>
                    <SearchButton></SearchButton>
                </Grid>
                <Grid xs={12}>
                    <Divider height={2} width={"90%"} style={{ margin: "auto" }} />
                </Grid>
                <Grid xs={12}>
                    <GenreSection></GenreSection>
                    <Divider height={2} width={"90%"} style={{ margin: "auto" }} />
                </Grid>
                <Grid xs={12}>
                    <LanguageSection></LanguageSection>
                    <Divider height={2} width={"90%"} style={{ margin: "auto" }} />
                </Grid>
                <Grid xs={12}>
                    <PriceSection></PriceSection>
                    <Divider height={2} width={"90%"} style={{ margin: "auto" }} />
                </Grid>
                <Grid xs={12}>
                    <ReleaseYear></ReleaseYear>
                </Grid>
            </Grid>
        </Grid>
    );
}

function PriceSection() {
    return (
        <Grid container>
            <Grid xs={12} sx={{ fontSize: 12 }}>
                <h1>Preço</h1>
            </Grid>
            <Grid xs={12}>
                <PriceSlider></PriceSlider>
            </Grid>
        </Grid>
    );
}

const PriceMarks = [
    {
        value: 15,
        label: "R$ 15,00",
    },
    {
        value: 315,
        label: "R$ 315,00",
    },
];

function valuetext(value: number) {
    return `R$ ${value},00`;
}

function PriceSlider() {
    const [value, setValue] = React.useState<number[]>([50, 200]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <Box>
            <Slider
                aria-label="Always visible"
                value={value}
                min={15}
                max={315}
                getAriaValueText={valuetext}
                onChange={handleChange}
                step={5}
                marks={PriceMarks}
                valueLabelDisplay="off"
            />
        </Box>
    );
}

const YearMarks = [
    {
        value: 1880,
        label: "1880",
    },
    {
        value: 2024,
        label: "2024",
    },
];

function YearSlider() {
    const [value, setValue] = React.useState<number[]>([1940, 2010]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    return (
        <Box>
            <Slider
                aria-label="Always visible"
                defaultValue={1880}
                min={1880}
                max={2024}
                value={value}
                onChange={handleChange}
                getAriaValueText={valuetext}
                step={1}
                marks={YearMarks}
                valueLabelDisplay="off"
            />
        </Box>
    );
}

function ReleaseYear() {
    return (
        <Grid container>
            <Grid xs={12} sx={{ fontSize: 12 }}>
                <h1>Ano de Lançamento</h1>
            </Grid>
            <Grid xs={12}>
                <YearSlider></YearSlider>
            </Grid>
        </Grid>
    );
}

function BookSectionHeader() {
    return (
        <Grid container xs={12}>
            <Grid xs={8}>Exibindo X resultados de Y</Grid>
            <Grid xs={4} sx={{ textAlign: "right" }}>
                <SortIcon></SortIcon>
            </Grid>
        </Grid>
    );
}

function BookList() {
    const [books, setBooks] = useState([
        {
            id: 0,
            author: "Fiodor Dostoievski",
            title: "Os irmãos Karamazov",
            releaseYear: "27/11/1880",
            price: 110,
            isAvailable: true,
            summary: "",
            cover: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSpz_PGgi7jqYjc-QQ554j02VSA6G_TOT6w3FBlk2Zd9YFV64FvyVGkSatjDrBJWlOnRnK-jfRE0ws0BRoq2jLFF83dVRIdo9SlpHQzCUZOEpGTPeIXLFWTkA",
        },
        {
            id: 1,
            author: "Plato",
            price: 220,
            title: "The Republic",
            releaseYear: "27/11/2023",
            isAvailable: true,
            summary: "",
            cover: "https://m.media-amazon.com/images/I/612q-zfRD9L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id: 1,
            author: "Andrew Hodges",
            price: 20,
            title: "Turing: Um filósofo da natureza",
            releaseYear: "27/11/2023",
            isAvailable: true,
            summary: "",
            cover: "https://m.media-amazon.com/images/I/819ACs3AuzL._AC_AA360_.jpg",
        },
        {
            id: 0,
            author: "Austin Wright",
            title: "Tony & Susan",
            releaseYear: "27/11/1990",
            isAvailable: true,
            summary: "",
            price: 50,
            cover: "https://m.media-amazon.com/images/I/71R8HmaGC5L._AC_AA440_.jpg",
        },
        {
            id: 1,
            author: "Plato",
            price: 220,
            title: "The Republic",
            releaseYear: "27/11/2023",
            isAvailable: true,
            summary: "",
            cover: "https://m.media-amazon.com/images/I/612q-zfRD9L._AC_UF1000,1000_QL80_.jpg",
        },
    ]);

    return (
        <Grid xs={12}>
            <List sx={{ width: "100%" }}>
                {books.map((book) => (
                    <ListItem>
                        <EbookCard ebook={book}></EbookCard>
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
}

function BookListContainer() {
    return (
        <>
            <Grid container xs={12} sx={{ backgroundColor: "#F4F2F2", borderRadius: "16px" }}>
                <BookList></BookList>
            </Grid>
            <Grid container mt={2} xs={12} justifyContent="center">
                <Pagination count={10} color="primary" shape="rounded" />
            </Grid>
        </>
    );
}

function BookSection() {
    return (
        <Grid xs={8}>
            <Grid container>
                <BookSectionHeader></BookSectionHeader>
                <BookListContainer></BookListContainer>
            </Grid>
        </Grid>
    );
}

export default function Page() {
    return (
        <Container maxWidth={false}>
            <Grid container spacing={2}>
                <PageHeader></PageHeader>
                <Grid xs={12}>
                    <Grid container>
                        <SideBarMenu></SideBarMenu>
                        <BookSection></BookSection>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
