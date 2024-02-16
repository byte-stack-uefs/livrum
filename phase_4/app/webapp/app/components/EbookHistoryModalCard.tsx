import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Ebook from "../interfaces/Ebook";
import { CloudDownload } from "@mui/icons-material";

type EbookHistoryCardModalProps = {
    ebook: Ebook;
};

const DisplayBookInfo: React.FC<EbookHistoryCardModalProps> = ({ ebook }) => {
    return (
        <Box>
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
        </Box>
    );
};

const EbookHistoryCardModal: React.FC<EbookHistoryCardModalProps> = ({ ebook }) => {
    return (
        <Grid container sx={{ boxShadow: 3, backgroundColor: "#FFF", borderRadius: "16px", p: 2 }}>
            <Grid item xs={2}>
                <Box>{ebook.cover ? <Image className="image-zoom" width={100} height={125} style={{ objectFit: "cover", borderRadius: "16px" }} alt={ebook.title} src={ebook.cover} /> : <></>}</Box>
            </Grid>
            <Grid item xs={8}>
                <DisplayBookInfo ebook={ebook} />
            </Grid>
            <Grid item xs={2}>
                <DynamicDownloadButton isAvailable={ebook.isAvailable}></DynamicDownloadButton>
            </Grid>
        </Grid>
    );
};

type DynamicDownloadButtonProps = {
    isAvailable: boolean;
};

const DynamicDownloadButton: React.FC<DynamicDownloadButtonProps> = ({ isAvailable }) => {
    if (isAvailable) {
        return (
            <Button variant="contained" startIcon={<CloudDownload />}>
                Baixar
            </Button>
        );
    } else {
        return (
            <Button variant="contained" sx={{ backgroundColor: "#B5BDC8" }} startIcon={<CloudDownload />}>
                Baixar
            </Button>
        );
    }
};

export default EbookHistoryCardModal;
