"use client";
import { useState } from "react";
import EbookCard from "../../components/E-bookCard";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    List,
    ListItem,
    Pagination,
    Slider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Primary } from "@/stories/Button.stories";
import React from "react";
import SortIcon from "@mui/icons-material/Sort";
import Divider from "@/app/components/Divider";

function PageHeader() {
    return (
        <Grid item xs={12} my={2}>
            <Typography variant="h3">Catálogo</Typography>
            <Divider width="10%" />
        </Grid>
    );
}

function SearchBox() {
    return (
        <Grid item xs={8}>
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
        <Grid item xs={4}>
            <Button variant="contained">Buscar</Button>
        </Grid>
    );
}

function GenreSection() {
    return (
        <Grid container  sx={{ fontSize: 10, marginBottom: 0, marginTop: 0 }}>
            <Grid item xs={12} sx={{ marginLeft: 2, marginTop: -2, fontSize: 12 }}>
                <h1>Gênero</h1>
            </Grid>
            <Grid item xs={12} sx={{}}>
                <FormGroup sx={{ marginLeft: 3, marginTop: -3, marginBottom: 0 }}>
                    <FormControlLabel
                        control={
                            <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 }, color: "#000000", "&.Mui-checked": { color: "#000000" } }} />
                        }
                        label="Ação"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 }, color: "#000000", "&.Mui-checked": { color: "#000000" } }} />
                        }
                        label="Comédia"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 }, color: "#000000", "&.Mui-checked": { color: "#000000" } }} />
                        }
                        label="Drama"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 }, color: "#000000", "&.Mui-checked": { color: "#000000" } }} />
                        }
                        label="Romance"
                    />
                </FormGroup>
            </Grid>
        </Grid>
    );
}

function SearchSection() {
    // TODO: testar novamente depois
    return (
        <Grid item xs={12}>
            <Grid container >
                <Grid item xs={8}>
                    <TextField
                        id="outlined-basic"
                        label="Pesquise por nome ou autor"
                        variant="outlined"
                        fullWidth
                        style={{ backgroundColor: "#FFFFFF" }}
                        inputProps={{ style: { fontSize: 10 } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 10 } }} // font size of input label
                    />
                    <Grid item xs={4} sx={{ marginLeft: 32, paddingTop: -3 }}>
                        <Button variant="contained" sx={{ marginTop: 0.5 }}>
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

function LanguageSection() {
    return (
        <Grid container  sx={{ marginTop: 0 }}>
            <Grid item xs={12} sx={{ marginLeft: 2, marginTop: -2, fontSize: 12 }}>
                <h1>Idioma</h1>
            </Grid>
            <Grid item xs={12}>
                <FormGroup sx={{ marginLeft: 3, marginTop: -3 }}>
                    <FormControlLabel
                        control={
                            <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 }, color: "#000000", "&.Mui-checked": { color: "#000000" } }} />
                        }
                        label="Português"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 }, color: "#000000", "&.Mui-checked": { color: "#000000" } }} />
                        }
                        label="Inglês"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 }, color: "#000000", "&.Mui-checked": { color: "#000000" } }} />
                        }
                        label="Espanhol"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 }, color: "#000000", "&.Mui-checked": { color: "#000000" } }} />
                        }
                        label="Francês"
                    />
                </FormGroup>
            </Grid>
        </Grid>
    );
}

function SideBarMenu() {
    return (
        <Grid item xs={4}>
            <Grid container  sx={{ backgroundColor: "#F4F2F2", borderRadius: "16px" }}>
                <>
                    <SearchBox></SearchBox>
                    <SearchButton></SearchButton>
                </>
                <Grid item xs={12}>
                    <Divider width={"15%"} />
                </Grid>
                <GenreSection></GenreSection>
                <Grid item xs={12}>
                    <Divider width={"15%"} />
                </Grid>
                <LanguageSection></LanguageSection>
                <Grid item xs={12}>
                    <Divider width={"15%"} />
                </Grid>
                <PriceSection></PriceSection>
                <Grid item xs={12}>
                    <Divider width={"15%"} />
                </Grid>
                <ReleaseYear></ReleaseYear>
            </Grid>
        </Grid>
    );
}

function PriceSection() {
    return (
        <Grid container >
            <Grid item xs={12} sx={{ marginLeft: 2, marginTop: 0, fontSize: 12 }}>
                <h1>Preço</h1>
            </Grid>
            <Grid item xs={12} sx={{ marginLeft: 5, marginTop: -2 }}>
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
        <Box sx={{ width: 300 }}>
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
        <Box sx={{ width: 300, marginLeft: 4 }}>
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
        <Grid container >
            <Grid item xs={12} sx={{ marginLeft: 2, marginTop: 0, fontSize: 12 }}>
                <h1>Ano de Lançamento</h1>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 2, marginTop: -2 }}>
                <YearSlider></YearSlider>
            </Grid>
        </Grid>
    );
}

function BookSectionHeader() {
    return (
        <Grid container >
            <Grid item xs={8} marginTop={-0.5}>
                Exibindo X resultados de Y
            </Grid>
            <Grid item xs={4} paddingBottom={1} sx={{ marginLeft: -6, textAlign: "right" }}>
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
            releaseDate: "27/11/1880",
            price: 110,
            cover: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSpz_PGgi7jqYjc-QQ554j02VSA6G_TOT6w3FBlk2Zd9YFV64FvyVGkSatjDrBJWlOnRnK-jfRE0ws0BRoq2jLFF83dVRIdo9SlpHQzCUZOEpGTPeIXLFWTkA",
        },
        {
            id: 1,
            author: "Plato",
            price: 220,
            title: "The Republic",
            releaseDate: "27/11/2023",
            cover: "https://m.media-amazon.com/images/I/612q-zfRD9L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id: 1,
            author: "Andrew Hodges",
            price: 20,
            title: "Turing: Um filósofo da natureza",
            releaseDate: "27/11/2023",
            cover: "https://m.media-amazon.com/images/I/819ACs3AuzL._AC_AA360_.jpg",
        },
        {
            id: 0,
            author: "Austin Wright",
            title: "Tony & Susan",
            releaseDate: "27/11/1990",
            price: 50,
            cover: "https://m.media-amazon.com/images/I/71R8HmaGC5L._AC_AA440_.jpg",
        },
        {
            id: 1,
            author: "Plato",
            price: 220,
            title: "The Republic",
            releaseDate: "27/11/2023",
            cover: "https://m.media-amazon.com/images/I/612q-zfRD9L._AC_UF1000,1000_QL80_.jpg",
        },
    ]);

    return (
        <Grid container sx={{}}>
            <List sx={{ width: "100%" }}>
                {books.map((book) => (
                    <ListItem disableGutters>
                        <EbookCard ebook={book}></EbookCard>
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
}

function BookListContainer() {
    return (
        <Grid container xs={12} sx={{ backgroundColor: "#F4F2F2", borderRadius: "16px" }}>
            <BookList></BookList>
            <Grid container  sx={{}}>
                <Stack >
                    <Pagination count={10} color="primary" shape="rounded" />
                </Stack>
            </Grid>
        </Grid>
    );
}

function BookSection() {
    return (
        <Grid item xs={8}>
            <Grid container >
                <BookSectionHeader></BookSectionHeader>
                <BookListContainer></BookListContainer>
            </Grid>
        </Grid>
    );
}

export default function Page() {
    return (
        <Container maxWidth={false}>
            <Grid container>
                <PageHeader></PageHeader>
                <Grid container item xs={12}>
                    <SideBarMenu></SideBarMenu>
                    <BookSection></BookSection>
                </Grid>
            </Grid>
        </Container>
    );
}
