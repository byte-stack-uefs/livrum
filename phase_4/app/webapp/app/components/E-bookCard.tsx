import { Box, Button, Grid, Hidden } from "@mui/material";
import Ebook from "../interfaces/Ebook";
import Image from "next/image";

type EbookCardProps = {
    ebook: Ebook;
};

const DisplayBookInfo: React.FC<EbookCardProps> = ({ ebook }) => {
    return (
        <Grid container spacing={2} sx={{marginTop:1, marginLeft:-30, color:'#1E3345'}}>
            <Grid item xs={8} sx={{fontSize:22, marginTop:-0.5, fontWeight: 'bold'}}>
                {ebook.title}
            </Grid>
            <Grid item xs={4} sx={{textAlign:'right'}}>
                R$ {ebook.price},00
            </Grid>
            <Grid item xs={12}>
                {ebook.author}
            </Grid>
            <Grid item xs={8}>
                {ebook.releaseDate}
            </Grid>
            <Grid item xs={4} sx={{textAlign:'right'}}>
                <Button variant="contained" sx={{marginTop:0.5}}>Comprar</Button>
            </Grid>
        </Grid>
    );
}

const EbookCard: React.FC<EbookCardProps> = ({ ebook }) => {
    return (
        <Box sx={{width:1150, height:150, marginLeft:2, marginTop:2, boxShadow: 3,  backgroundColor:"#FFFFFF", borderRadius: '16px'}}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box sx={{ marginLeft:1, marginTop:1}} >
                    <Image className="image-zoom" width={125} height={125} style={{ objectFit: "cover" , borderRadius: '16px'}} alt={ebook.title} src={ebook.cover}/>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <DisplayBookInfo ebook={ebook}></DisplayBookInfo>
                </Grid>
            </Grid>
        </Box>
    );
  };
  
  
  export default EbookCard;