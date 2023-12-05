"use client";
import { useState } from "react";
import EbookCard from "../../components/EbookCard";
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Slider, TextField } from "@mui/material";
import { Primary } from "@/stories/Button.stories";
import React from "react";

function PageHeader() {
    return (                
        <Grid item xs={12} >
            <Grid container spacing={2}>
                <Grid sx={{marginTop:-5, fontSize:28}} item xs={12}>
                    <h1>Catálogo</h1>       
                </Grid>
                <Grid item xs={12}>
                    <Divider  sx={{width:200, height:4, marginBottom:5, marginTop:-5,   backgroundColor:'#2665BE'}}></Divider>
                </Grid>
            </Grid>
        </Grid>
    );
  }

function SearchBox(){
    return (
        <Grid item xs={8}>
            <TextField id="outlined-basic" label="Pesquise por nome ou autor" 
                variant="outlined" fullWidth 
                sx={{ backgroundColor:'#FFFFFF'}}
                inputProps={{style: {fontSize: 10, } }} // font size of input text
                InputLabelProps={{style: {fontSize: 10}}} // font size of input label
            /> 
        </Grid>
    );
}

function SearchButton(){
    return(
        <Grid item xs={4}>
            <Button variant="contained" sx={{marginTop:0.5}}>Buscar</Button>
        </Grid>
    );
}

function GenreSection(){
    return(
        <Grid container spacing={2} sx={{fontSize:10,marginBottom:0, marginTop:0}}>
            <Grid item xs={12} sx={{marginLeft:2, marginTop:-2, fontSize:12}}><h1>Gênero</h1></Grid>
            <Grid item xs={12} sx={{}}>
                <FormGroup sx={{marginLeft:3, marginTop:-3, marginBottom:0}}>
                    <FormControlLabel control={<Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 15 }, color: '#000000' ,'&.Mui-checked': {color: '#000000'} }}/>} label="Ação"/>
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 }, color: '#000000' ,'&.Mui-checked': {color: '#000000'} }}/>} label="Comédia"/>
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 }, color: '#000000' ,'&.Mui-checked': {color: '#000000'} }}/>} label="Drama" />
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 }, color: '#000000' ,'&.Mui-checked': {color: '#000000'}}}/>} label="Romance" />
                </FormGroup>
            </Grid>
        </Grid>
    );
}


function SearchSection(){ // TODO: testar novamente depois 
    return (
        <Grid item xs={12} >
            <Grid container spacing={2} >
                <Grid item xs={8}>
                    <TextField id="outlined-basic" label="Pesquise por nome ou autor" 
                        variant="outlined" fullWidth 
                        style={{ backgroundColor:'#FFFFFF'}}
                        inputProps={{style: {fontSize: 10}}} // font size of input text
                        InputLabelProps={{style: {fontSize: 10}}} // font size of input label
                    /> 
                    <Grid item xs={4} sx={{marginLeft:32, paddingTop:-3}}>
                        <Button variant="contained" sx={{marginTop:0.5}}>Buscar</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

function LanguageSection(){
    return( 
        <Grid container spacing={2} sx={{marginTop:0}}> 
            <Grid item xs={12} sx={{marginLeft:2, marginTop:-2, fontSize:12}}><h1>Idioma</h1></Grid>
            <Grid item xs={12}>
                <FormGroup sx={{marginLeft:3, marginTop:-3}}>
                    <FormControlLabel control={<Checkbox sx={{'& .MuiSvgIcon-root': { fontSize: 15 }, color: '#000000' ,'&.Mui-checked': {color: '#000000'}}}/>} label="Português" />
                    <FormControlLabel control={<Checkbox sx={{'& .MuiSvgIcon-root': { fontSize: 15 }, color: '#000000' ,'&.Mui-checked': {color: '#000000'}}}/>} label="Inglês"/>
                    <FormControlLabel control={<Checkbox sx={{'& .MuiSvgIcon-root': { fontSize: 15 }, color: '#000000' ,'&.Mui-checked': {color: '#000000'}}}/>} label="Espanhol" />
                    <FormControlLabel control={<Checkbox sx={{'& .MuiSvgIcon-root': { fontSize: 15 }, color: '#000000' ,'&.Mui-checked': {color: '#000000'}}}/>} label="Francês" />
                </FormGroup>
            </Grid>
        </Grid>
    );
}

function SideBarMenu(){
    return(
        <Grid item xs={4}>
            <Grid container spacing={2} sx={{width:400, backgroundColor: '#F4F2F2', borderRadius: '16px'}}>
                <SearchBox></SearchBox>
                <SearchButton></SearchButton>
                <Divider sx={{width:350, height:2, marginLeft:2, marginTop:2, backgroundColor:'#2665BE'}}></Divider>
                <GenreSection></GenreSection>
                <Divider sx={{width:350, height:2, marginLeft:2, marginTop:2, backgroundColor:'#2665BE'}}></Divider>
                <LanguageSection></LanguageSection>
                <Grid item xs={12}><Divider  sx={{marginTop:0,width:350, height:2,  backgroundColor:'#2665BE'}}></Divider></Grid>
                <PriceSection></PriceSection>
                <Grid item xs={12}><Divider sx={{marginTop:0,width:350, height:2,  backgroundColor:'#2665BE'}}></Divider></Grid>
                <ReleaseYear></ReleaseYear>
            </Grid>
        </Grid>
    );
}

function PriceSection(){
    return(
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{marginLeft:2, marginTop:0, fontSize:12}}><h1>Preço</h1></Grid>
            <Grid item xs={12} sx={{marginLeft:5, marginTop:-2}}><PriceSlider></PriceSlider></Grid>
        </Grid>
    );
}

const PriceMarks = [
    {
      value: 15,
      label: 'R$ 15,00',
    },
    {
      value: 315,
      label: 'R$ 315,00',
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
      label: '1880',
    },
    {
      value: 2024,
      label: '2024',
    },
  ];

  function YearSlider() {
    const [value, setValue] = React.useState<number[]>([1940, 2010]);

    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);
    };
    return (
      <Box sx={{ width: 300, marginLeft:4}}>
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

function ReleaseYear(){
    return(
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{marginLeft:2, marginTop:0, fontSize:12}}><h1>Ano de Lançamento</h1></Grid>
            <Grid item xs={12} sx={{marginBottom:2, marginTop:-2}}><YearSlider></YearSlider></Grid>
        </Grid>
    );
}

function BookList(){
    return(
        <Grid item xs={8}>
            <div>xs=8</div>
        </Grid>
    );
}

export default function Page() {

    return ( 
        <Box sx={{m:5}}>
            <Grid container spacing={2}> 
                <PageHeader></PageHeader>
                <SideBarMenu></SideBarMenu>
                <BookList></BookList>
            </Grid>
        </Box>
    );
}
