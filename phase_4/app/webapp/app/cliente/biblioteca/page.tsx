"use client";
import Divider from "@/app/components/Divider";
import Ebook from "@/app/interfaces/Ebook";
import { AddShoppingCart, CloudDownload ,CheckCircle, Book, ReportProblem} from "@mui/icons-material";
import { Box, Button, Grid, List, ListItem, Pagination, Stack } from "@mui/material";
import Image from "next/image";
import { useState } from "react";


type DynamicDownloadButtonProps = {
    isAvailable: boolean;
};


const DynamicDownloadButton: React.FC<DynamicDownloadButtonProps> = ({isAvailable}) =>{
    if (isAvailable){
        return(
            <Button variant="contained" startIcon={<CloudDownload/>}>
                Baixar
            </Button>                        
        );
    }else{
        return (
            <Button variant="contained" sx={{backgroundColor: "#B5BDC8"}} startIcon={<CloudDownload/>}>
                Baixar
            </Button>
        );
    }
}

function ClientLibraryContainerHeader(){
    return(
        <Grid item xs={12}> 
            <Stack>
                <Grid item xs={12} sx={{ fontSize: 28 }}>
                    <h1>Minha Biblioteca</h1>
                </Grid>
                <Divider height={4} width={"10%"} style={{}} />
            </Stack>
        </Grid>
    );
}

function ClientLibraryBookContainer(){
    const [books, setBooks] = useState([
        {
            id: 0,
            author: "Fiodor Dostoievski",
            title: "Os irmãos Karamazov",
            releaseYear: "1880",
            price: 110,
            summary: "Lorem ipsum",
            genre: "",
            isAvailable: false,
            cover: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSpz_PGgi7jqYjc-QQ554j02VSA6G_TOT6w3FBlk2Zd9YFV64FvyVGkSatjDrBJWlOnRnK-jfRE0ws0BRoq2jLFF83dVRIdo9SlpHQzCUZOEpGTPeIXLFWTkA",
        },
        {
            id: 1,
            author: "Plato",
            price: 220,
            title: "The Republic",
            releaseYear: "2023",
            summary: "Lorem ipsum",
            genre: "",
            isAvailable: true,
            cover: "https://m.media-amazon.com/images/I/612q-zfRD9L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id: 1,
            author: "Andrew Hodges",
            price: 20,
            title: "Turing: Um filósofo da natureza",
            releaseYear: "2023",
            summary: "Lorem ipsum",
            genre: "",
            isAvailable: true,
            cover: "https://m.media-amazon.com/images/I/819ACs3AuzL._AC_AA360_.jpg",
        },
        {
            id: 0,
            author: "Austin Wright",
            title: "Tony & Susan",
            releaseYear: "1990",
            price: 50,
            summary: "Lorem ipsum",
            isAvailable: true,
            cover: "https://m.media-amazon.com/images/I/71R8HmaGC5L._AC_AA440_.jpg",
        },
        {
            id: 0,
            author: "Austin Wright",
            title: "Tony & Susan",
            releaseYear: "1990",
            price: 50,
            summary: "Lorem ipsum",
            genre: "",
            isAvailable: true,
            cover: "https://m.media-amazon.com/images/I/71R8HmaGC5L._AC_AA440_.jpg",
        },
    ]);    
    return(
        <Grid item xs={12}>
            <List sx={{ width: "100%" }}>
                {books.map((book) => (
                        <ListItem>
                            <InLibraryEbookCard ebook={book}></InLibraryEbookCard>
                        </ListItem>
                    ))}
            </List>
        </Grid>
    );
}

type InLibraryEbookCardProps = {
    ebook: Ebook;
};

const DisplayBookInfo: React.FC<InLibraryEbookCardProps> = ({ ebook }) => {
    if(ebook.isAvailable){
        return(
            <Grid container sx={{ color: "#1E3345" }} height="100%">
                <Grid item xs={8} width="100%">
                    <Grid item xs={12} sx={{ fontSize: 22, fontWeight: "bold" }}>
                        {ebook.title}
                    </Grid>
                    <Grid item xs={12}>
                        {ebook.author}
                    </Grid>
                    <Grid item xs={12}>
                        {ebook.releaseYear}
                    </Grid>
                    <Grid item xs={12}>
                        Sinopse: {ebook.summary}
                    </Grid> 
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Stack direction="column" height="100%" justifyContent="space-between">
                        <div>
                            <DynamicDownloadButton isAvailable={ebook.isAvailable}></DynamicDownloadButton>
                        </div>
                        <div>
                        <Button  startIcon={<CheckCircle/>}>
                        </Button>
                        </div>
                    </Stack>
                </Grid>                
            </Grid>
        );
    }else {
        return (
            <Grid container sx={{ color: "#1E3345" }} height="100%">
                <Grid item xs={8} width="100%">
                    <Grid item xs={12} sx={{ fontSize: 22, fontWeight: "bold" }}>
                        {ebook.title}
                    </Grid>
                    <Grid item xs={12}>
                        {ebook.author}
                    </Grid>
                    <Grid item xs={12}>
                        {ebook.releaseYear}
                    </Grid>
                    <Grid item xs={12} sx={{ color: "#D0342C" }} >
                        <Button sx={{color:"#D0342C"}} startIcon={<ReportProblem/>}></Button>
                        {"Este livro estará disponível para download assim que recebermos a confirmação do seu pagamento!"}
                    </Grid>
                    <Grid item xs={12}>
                       Sinopse: {ebook.summary}
                    </Grid> 
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Stack direction="column" height="100%" justifyContent="space-between">
                        <div>
                            <DynamicDownloadButton isAvailable={ebook.isAvailable}></DynamicDownloadButton>
                        </div>
                        <div>
                        <Button  startIcon={<CheckCircle/>}>
                        </Button>
                        </div>
                    </Stack>
                </Grid>
            </Grid>
        );
    }  
};


const InLibraryEbookCard: React.FC<InLibraryEbookCardProps> = ({ ebook }) => {
    return (
        <Grid container sx={{ boxShadow: 3, backgroundColor: "#FFF", borderRadius: "16px", p: 2 }}>
            <Grid item xs={2}>
                <Box>
                    <Image
                        className="image-zoom"
                        width={100}
                        height={125}
                        style={{ objectFit: "cover", borderRadius: "16px" }}
                        alt={ebook.title}
                        src={ebook.cover}
                    />
                </Box>
                <Grid item xs={10}>
                    <DisplayBookInfo ebook={ebook} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default function Page() {
    return (
        <Box>
        <Box sx={{backgroundColor:'#F4F2F2', borderRadius:'16px'}}>
            <Grid container spacing={2}>
                <ClientLibraryContainerHeader></ClientLibraryContainerHeader>
                <ClientLibraryBookContainer></ClientLibraryBookContainer>
            </Grid>
        </Box>
        <Grid container xs={12} justifyContent="center">
                <Pagination count={10} color="primary" shape="rounded" />
            </Grid>
        </Box>
    );
}