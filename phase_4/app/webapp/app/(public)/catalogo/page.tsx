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
import axios from "axios";
import Ebook, { EbookResponse } from "@/app/interfaces/Ebook";
import useRequest from "@/app/services/requester";

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


function valuetext(value: number) {
    return `R$ ${value},00`;
}


function getPriceRange() : number[] {
    
    const [books, setBooks] = useState<(Ebook)[]>([]);
    const [fetched, setFetched] = useState(Boolean);
    const [minPrice, setMinPrice] = useState(Number);
    const [maxPrice, setMaxPrice] = useState(Number);
    
    const fetchEbooks = async () => {
        const requester = useRequest()
        
        const { data } = await requester.get<EbookResponse>("/catalog/list");
        setBooks(data.ebooks);
        setFetched(true);     
        var priceValues: number[] = [];
        data.ebooks.forEach(function(book){priceValues.push(book.price)});
        var min = priceValues.reduce((iMax, x, i, arr) => x < arr[iMax] ? i : iMax, 0);
        var max = priceValues.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);        
        setMaxPrice(data.ebooks[max].price);
        setMinPrice(data.ebooks[min].price);
        return [minPrice, maxPrice];          
    };
    if (!(fetched)){
        fetchEbooks();
    }
    return [minPrice, maxPrice];
}

function PriceSlider() {
    var priceRange: number[] = getPriceRange();
    var minPrice = priceRange[0];
    var maxPrice = priceRange[1];

    const PriceMarks = [
        {
            value: minPrice,
            label: "R$" + minPrice.toString(),
        },
        {
            value: maxPrice,
            label: "R$" + maxPrice.toString(),
        },
    ];    

    const [value, setValue] = React.useState<number[]>([minPrice, maxPrice]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <Box>
            <Slider
                aria-label="Always visible"
                value={value}
                min={minPrice}
                max={maxPrice}
                getAriaValueText={valuetext}
                onChange={handleChange}
                step={5}
                marks={PriceMarks}
                valueLabelDisplay="auto"
            />
        </Box>
    );
}

function getYearRange() : number[] {
    const [books, setBooks] = useState<(Ebook)[]>([]);
    const [fetched, setFetched] = useState(Boolean);
    const [minYear, setMinYear] = useState(Number);
    const [maxYear, setMaxYear] = useState(Number);
    
    const fetchEbooks = async () => {
        const requester = useRequest()
        
        const { data } = await requester.get<EbookResponse>("/catalog/list");
        setBooks(data.ebooks);
        setFetched(true);     
        var yearValues: number[] = [];
        data.ebooks.forEach(function(book){yearValues.push(parseInt(book.releaseYear))});
        var min = yearValues.reduce((iMax, x, i, arr) => x < arr[iMax] ? i : iMax, 0);
        var max = yearValues.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);        
        setMaxYear(parseInt(data.ebooks[max].releaseYear));
        setMinYear(parseInt(data.ebooks[min].releaseYear));
        return [minYear, maxYear];          
    };
    if (!(fetched)){
        fetchEbooks();
    }
    return [minYear, maxYear];
}

function YearSlider() {
    var yearRange: number[] = getYearRange();
    var minYear = yearRange[0];
    var maxYear = yearRange[1];

    const YearMarks = [
        {
            value: minYear,
            label: minYear.toString(),
        },
        {
            value: maxYear,
            label: maxYear.toString(),
        },
    ];
    
    const [value, setValue] = React.useState<number[]>([minYear, maxYear]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    return (
        <Box>
            <Slider
                aria-label="Always visible"
                defaultValue={1880}
                min={minYear}
                max={maxYear}
                value={value}
                onChange={handleChange}
                getAriaValueText={valuetext}
                step={1}
                marks={YearMarks}
                valueLabelDisplay="auto"
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
            <Grid xs={8}> </Grid>
            <Grid xs={4} sx={{ textAlign: "right" }}>
                <SortIcon></SortIcon>
            </Grid>
        </Grid>
    );
}

function listComprehension<T>(list: T[], callback: (item: T) => boolean): T[] {
    return list.filter(callback).map((item) => item)
  }

function BookList() {

    const [books, setBooks] = useState<(Ebook)[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Ebook[]>([]);
    const [fetched, setFetched] = useState(Boolean);
    
    const fetchEbooks = async () => {
        const requester = useRequest()
        
        const { data } = await requester.get<EbookResponse>(
          "/catalog/list",
        );
        setBooks(data.ebooks);
        setFilteredBooks(data.ebooks);
        setFetched(true);
      
      };
      if (!(fetched)){
        fetchEbooks();
      }

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
