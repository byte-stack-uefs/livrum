import React from "react";
import PurchaseItem from "../interfaces/PurchaseItem";
import { Box, Button, Container, Grid, List, ListItem, Modal, Stack } from "@mui/material";
import Link from "next/link";
import Ebook from "../interfaces/Ebook";
import Image from "next/image";
import { AddShoppingCart, CloudDownload, ReportProblem } from "@mui/icons-material";
import PurchaseDetailsModal from "./PurchaseDetailsModal";

type PurchaseItemCardProps = {
    purchaseItem: PurchaseItem;
};

const DisplayHeaderInfo: React.FC<PurchaseItemCardProps> = ({ purchaseItem }) => {
    if (purchaseItem.status == "PENDENTE") {
        return (
            <Grid container height={50} sx={{ width: "110%" }}>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        Tentativa de compra: {purchaseItem.date}
                    </Grid>
                    <Grid item xs={4}>
                        Total: {purchaseItem.price}
                    </Grid>
                    <Grid item xs={4}>
                        <Stack>
                            Compra Nº {purchaseItem.id}
                            <Link href="#">Ver detalhes da compra</Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    return (
        <Grid container height={50}>
            <Grid item xs={4}>
                Compra realizada em {purchaseItem.date}
            </Grid>
            <Grid item xs={4}>
                Total: {purchaseItem.price}
            </Grid>
            <Grid item xs={4}>
                <Link href="#">Ver detalhes da compra</Link>
            </Grid>
        </Grid>
    );
};

const PurchaseItemCardHeader: React.FC<PurchaseItemCardProps> = ({ purchaseItem }) => {
    return (
        <Box sx={{ boxShadow: 3, backgroundColor: "#D9D9D9", borderRadius: "10px 10px 0px 0px" }}>
            <Container>
                <DisplayHeaderInfo purchaseItem={purchaseItem}></DisplayHeaderInfo>
            </Container>
        </Box>
    );
};

type InHistoryEbookCardProps = {
    ebook: Ebook;
};

const DisplayBookInfo: React.FC<InHistoryEbookCardProps> = ({ ebook }) => {
    return (
        <Grid container sx={{ color: "#1E3345" }} height="100%">
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

const PurchaseItemContainer: React.FC<PurchaseItemCardProps> = ({ purchaseItem }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    switch (purchaseItem.status) {
        case "PENDENTE":
            return (
                <Grid container>
                    <List sx={{ width: "100%" }}>
                        {purchaseItem.books.map((book) => (
                            <ListItem>
                                <InHistoryEbookCard ebook={book}></InHistoryEbookCard>
                            </ListItem>
                        ))}
                    </List>

                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item p={2} xs={8} sx={{ textAlign: "left", color: "#D0342C" }}>
                                <ReportProblem sx={{ marginRight: 1 }} />
                                {"Este livro estará disponível para download assim que recebermos a confirmação do seu pagamento!"}
                            </Grid>
                            <Grid item xs={4} textAlign="right" p={2}>
                                <Button variant="contained" onClick={handleOpen}>
                                    {purchaseItem.status}
                                </Button>
                                <PurchaseDetailsModal openheimer={true} purchaseItem={purchaseItem}></PurchaseDetailsModal>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        case "EFETUADA":
            return (
                <Grid container>
                    <List sx={{ width: "100%" }}>
                        {purchaseItem.books.map((book) => (
                            <ListItem>
                                <InHistoryEbookCard ebook={book}></InHistoryEbookCard>
                            </ListItem>
                        ))}
                    </List>

                    <Grid container>
                        <Grid item xs={1}>
                            <Button variant="contained" sx={{ backgroundColor: "#8CD087", textAlign: "right" }} onClick={handleOpen}>
                                {purchaseItem.status}
                            </Button>
                            <PurchaseDetailsModal openheimer={open} purchaseItem={purchaseItem}></PurchaseDetailsModal>
                        </Grid>
                    </Grid>
                </Grid>
            );
        case "RECUSADA":
            return (
                <Grid container>
                    <List sx={{ width: "100%" }}>
                        {purchaseItem.books.map((book) => (
                            <ListItem>
                                <InHistoryEbookCard ebook={book}></InHistoryEbookCard>
                            </ListItem>
                        ))}
                    </List>

                    <Grid container>
                        <Grid item xs={11}>
                            <Button variant="contained" sx={{ backgroundColor: "#D95D56", textAlign: "right" }} onClick={handleOpen}>
                                {purchaseItem.status}
                            </Button>
                            <PurchaseDetailsModal openheimer={open} purchaseItem={purchaseItem}></PurchaseDetailsModal>
                        </Grid>
                    </Grid>
                </Grid>
            );
    }
};

const DisplayBodyInfo: React.FC<PurchaseItemCardProps> = ({ purchaseItem }) => {
    return <PurchaseItemContainer purchaseItem={purchaseItem}></PurchaseItemContainer>;
};

const PurchaseItemCardBody: React.FC<PurchaseItemCardProps> = ({ purchaseItem }) => {
    return (
        <Box sx={{ boxShadow: 3, backgroundColor: "#FFF", borderRadius: "0px 0px 10px 10px" }}>
            <DisplayBodyInfo purchaseItem={purchaseItem}></DisplayBodyInfo>
        </Box>
    );
};

const PurchaseItemCard: React.FC<PurchaseItemCardProps> = ({ purchaseItem }) => {
    return (
        <Stack>
            <PurchaseItemCardHeader purchaseItem={purchaseItem}></PurchaseItemCardHeader>
            <PurchaseItemCardBody purchaseItem={purchaseItem}></PurchaseItemCardBody>
        </Stack>
    );
};

export default PurchaseItemCard;
