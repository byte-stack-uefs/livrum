import Image from "next/image";
import Ebook from "../interfaces/Ebook";
import { AddShoppingCart } from "@mui/icons-material";
import { Box, Button, Grid, Link, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import LivrumLink from "./LivrumLink";

type EbookCardProps = {
    ebook: Ebook;
};

const DisplayBookInfo: React.FC<EbookCardProps> = ({ ebook }) => {
    const router = useRouter();
    return (
        <Grid container sx={{ color: "#1E3345" }} height="100%">
            <Grid item xs={8}>
                <Grid item xs={12}>
                    <LivrumLink style={{ fontSize: 16, fontWeight: "bold", color: "#1E3345" }} href={`/ebook/${ebook.id}`}>
                        {ebook.title}
                    </LivrumLink>
                </Grid>
                <Grid item xs={12}>
                    {ebook.author}
                </Grid>
                <Grid item xs={12}>
                    {ebook.releaseYear}
                </Grid>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Stack direction="column" height="100%" justifyContent="space-between">
                    <div>{ebook.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</div>
                    <div>
                        <Button
                            onClick={() => {
                                router.push(`/ebook/${ebook.id}`);
                            }}
                            variant="contained"
                            startIcon={<AddShoppingCart />}
                        >
                            Comprar
                        </Button>
                    </div>
                </Stack>
            </Grid>
        </Grid>
    );
};

const EbookCard: React.FC<EbookCardProps> = ({ ebook }) => {
    return (
        <Grid container sx={{ boxShadow: 3, backgroundColor: "#FFF", borderRadius: "16px", p: 2 }}>
            <Grid item xs={2}>
                {ebook.cover ? (
                    <Link href={`/ebook/${ebook.id}`}>
                        <Image className="image-zoom" width={100} height={125} style={{ objectFit: "cover", borderRadius: "16px" }} alt={ebook.title} src={ebook.cover} />
                    </Link>
                ) : (
                    <></>
                )}
            </Grid>
            <Grid item xs={10}>
                <DisplayBookInfo ebook={ebook} />
            </Grid>
        </Grid>
    );
};

export default EbookCard;
