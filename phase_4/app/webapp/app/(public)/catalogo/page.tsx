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

interface SearchButtonProps {   
    price_min: Number;
    price_max: Number;
    minYear: Number;
    maxYear: Number;
    language: String;
    setBooks: React.Dispatch<React.SetStateAction<Ebook[]>>;
}

function SearchButton({price_min,price_max,minYear,maxYear,language, setBooks}: SearchButtonProps) {
    const requester = useRequest()
    console.log("Release Year:", maxYear);
    console.log("Min Price:", price_min);
    console.log("Max Price:", price_max);
    const handleClick = async () => {
        const { data } = await requester.get<EbookResponse>(
            "/catalog/search", 
            {
                params: {release_year: maxYear,price_min: price_min,price_max: price_max}
            }
        );
        
        console.log("BOOKS", data.ebooks);
        setBooks(data.ebooks);        
    };
    return (
        <Grid xs={4} textAlign="center">
            <Button onClick={handleClick} variant="contained">Buscar</Button>
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


interface LanguageSectionProps {
    setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
}

function LanguageSection({setSelectedLanguage}: LanguageSectionProps) {
    const handleLabelChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <Grid container>
            <Grid xs={12} sx={{ fontSize: 12 }}>
                <h1>Idioma</h1>
            </Grid>
            <Grid xs={12}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleLabelChange}/>} label="Português" value={"pt-br"}/>
                    <FormControlLabel control={<Checkbox onChange={handleLabelChange}/>} label="Inglês" value={"en-us"}/>
                    <FormControlLabel control={<Checkbox onChange={handleLabelChange}/>} label="Espanhol" value={"esp"}/>
                    <FormControlLabel control={<Checkbox onChange={handleLabelChange}/>}  label="Francês" value={"fra"}/>
                </FormGroup>
            </Grid>
        </Grid>
    );
}

/*  The interface below allows a book list (previously drawn from the server)
    to be changed upon a request sent from a search button interaction. That is,
    searching allows to apply certain filters to the list of displayed ebooks.

    Therefore, the interface allows us to set the book list displayed on the
    catalog's component from the response made by a request down in the (child)
    <SearchButton> component.  
*/
interface SettingFilteredBooksProps {
    books : Ebook[];
    setBooks: React.Dispatch<React.SetStateAction<Ebook[]>>;
    fetched: boolean;
}

function SideBarMenu({books, setBooks, fetched}: SettingFilteredBooksProps) {
    const [price_min, setPriceMin] = useState(Number);
    const [price_max, setPriceMax] = useState(Number);
    const [minYear, setMinYear] = useState(Number);
    const [maxYear, setMaxYear] = useState(Number);
    const [language, setLanguage] = useState(String);
    if(fetched){
        return (
            <Grid xs={4}>
                <Grid container sx={{ backgroundColor: "#F4F2F2", borderRadius: "16px" }}>
                    <Grid xs={12} container>
                        <SearchBox></SearchBox>
                        <SearchButton price_min={price_min} price_max={price_max} minYear={minYear} maxYear={maxYear} language={language} setBooks={setBooks}></SearchButton>
                    </Grid>
                    <Grid xs={12}>
                        <Divider height={2} width={"90%"} style={{ margin: "auto" }} />
                    </Grid>
                    <Grid xs={12}>
                        <GenreSection></GenreSection>
                        <Divider height={2} width={"90%"} style={{ margin: "auto" }} />
                    </Grid>
                    <Grid xs={12}>
                        <LanguageSection setSelectedLanguage={setLanguage} ></LanguageSection>
                        <Divider height={2} width={"90%"} style={{ margin: "auto" }} />
                    </Grid>
                    <Grid xs={12}>
                        <PriceSection setPriceMin={setPriceMin} setPriceMax={setPriceMax} ></PriceSection>
                        <Divider height={2} width={"90%"} style={{ margin: "auto" }} />
                    </Grid>
                    <Grid xs={12}>
                        <ReleaseYear books={books} setMinYear={setMinYear} setMaxYear={setMaxYear} fetched={fetched}></ReleaseYear>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

interface PriceSectionProps {
    setPriceMin : React.Dispatch<React.SetStateAction<number>>;
    setPriceMax : React.Dispatch<React.SetStateAction<number>>;
}

function PriceSection({setPriceMin, setPriceMax}: PriceSectionProps) {
    return (
        <Grid container>
            <Grid xs={12} sx={{ fontSize: 12 }}>
                <h1>Preço</h1>
            </Grid>
            <Grid xs={12}>
                <PriceSlider setPriceMin={setPriceMin} setPriceMax={setPriceMax}></PriceSlider>
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

function PriceSlider({setPriceMin, setPriceMax}: PriceSectionProps) {
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
        setPriceMin(value[0]);
        setPriceMax(value[1]);
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

function getYearRange(books: Ebook[]) : number[] {
    var minYear;
    var maxYear;
    
    var yearValues: number[] = [];
    books.forEach(function(book){yearValues.push(parseInt(book.releaseYear))});
    var min = yearValues.reduce((iMax, x, i, arr) => x < arr[iMax] ? i : iMax, 0);
    var max = yearValues.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);        
    minYear = parseInt(books[min].releaseYear);
    maxYear = parseInt(books[max].releaseYear);
    return [minYear, maxYear];
}

function YearSlider({books, setMinYear, setMaxYear}: YearSectionProps) {
    var yearRange: number[] = getYearRange(books); // Get years range from books
    var minYear = yearRange[0];
    var maxYear = yearRange[1];

    const [value, setValue] = React.useState<number[]>([minYear, maxYear]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        setMinYear(value[0]);
        setMaxYear(value[1]);
    };

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
    
    return (
        <Box>
            <Slider
                aria-label="Always visible"
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

interface YearSectionProps {
    books: Ebook[];
    setMinYear: React.Dispatch<React.SetStateAction<number>>;
    setMaxYear: React.Dispatch<React.SetStateAction<number>>;
    fetched: boolean;
}

function ReleaseYear({books, setMinYear, setMaxYear, fetched}: YearSectionProps) {    
    return (
        <Grid container>
            <Grid xs={12} sx={{ fontSize: 12 }}>
                <h1>Ano de Lançamento</h1>
            </Grid>
            <Grid xs={12}>
                <YearSlider books={books} setMinYear={setMinYear} setMaxYear={setMaxYear} fetched={fetched}></YearSlider>
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


interface BookListProps {

    books : Ebook[];
    setBooks : React.Dispatch<React.SetStateAction<Ebook[]>>;
    
    fetched: boolean;
    setFetched: React.Dispatch<React.SetStateAction<boolean>>;
}  

function BookList({books, setBooks, fetched, setFetched}: BookListProps) {    
    const fetchEbooks = async () => {
        const requester = useRequest()
        const { data } = await requester.get<EbookResponse>(
          "/catalog/list",
        );
        setBooks(data.ebooks);
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

function BookListContainer({books, setBooks, fetched, setFetched}: BookListProps) {
    return (
        <>
            <Grid container xs={12} sx={{ backgroundColor: "#F4F2F2", borderRadius: "16px" }}>
                <BookList books={books} setBooks={setBooks} fetched={fetched} setFetched={setFetched} ></BookList>
            </Grid>
            <Grid container mt={2} xs={12} justifyContent="center">
                <Pagination count={10} color="primary" shape="rounded" />
            </Grid>
        </>
    );
}

function BookSection({books, setBooks, fetched, setFetched}: BookListProps) {
    return (
        <Grid xs={8}>
            <Grid container>
                <BookListContainer books={books} setBooks={setBooks} fetched={fetched} setFetched={setFetched}></BookListContainer>
            </Grid>
        </Grid>
    );
}

export default function Page() {
    const [books, setBooks] = useState<(Ebook)[]>([]);
    const [fetched, setFetched] = useState(false);

        return (
            <Container maxWidth={false}>
                <Grid container spacing={2}>
                    <PageHeader></PageHeader>
                    <Grid xs={12}>
                        <Grid container>
                            <SideBarMenu books={books} setBooks={setBooks} fetched={fetched}></SideBarMenu>
                            <BookSection books={books} setBooks={setBooks} fetched={fetched} setFetched={setFetched} ></BookSection>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        );
}
