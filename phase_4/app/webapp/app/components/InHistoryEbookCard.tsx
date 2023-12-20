import { Box, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Ebook from "../interfaces/Ebook";

type InHistoryEbookCardProps = {
    ebook: Ebook;
};

const DisplayBookInfo: React.FC<InHistoryEbookCardProps> = ({ ebook }) => {
    return (
        <Grid container sx={{ color: "dark.main" }}>
            <Grid item xs={8}>
                <Grid item xs={12} sx={{ fontSize: 22, fontWeight: "bold" }}>
                    {ebook.title}
                </Grid>
                <Grid item xs={12}>
                    <Link href="#">{ebook.author}</Link>
                </Grid>
                <Grid item xs={12}>
                    {ebook.releaseYear}
                </Grid>
                <Grid item xs={12}>
                    {ebook.genre}
                </Grid>
            </Grid>
        </Grid>
    );
};

const InHistoryEbookCard: React.FC<InHistoryEbookCardProps> = ({ ebook }) => {
    return (
        <Grid container sx={{ backgroundColor: "#FFF", borderRadius: "16px", p: 2 }}>
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
            </Grid>
            <Grid item xs={10}>
                <DisplayBookInfo ebook={ebook} />
            </Grid>
        </Grid>
    );
};

export default InHistoryEbookCard;