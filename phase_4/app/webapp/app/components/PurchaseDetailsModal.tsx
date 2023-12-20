import Divider from "./Divider";
import React, { useEffect } from "react";
import PurchaseItem from "../interfaces/PurchaseItem";
import { Box, Grid, List, ListItem, Modal, Stack } from "@mui/material";
import PurchaseItemCard from "./PurchaseItemCard";
import InHistoryEbookCard from "./InHistoryEbookCard";
import EbookHistoryModalCard from "./EbookHistoryModalCard";

type PurchaseItemProps = {
    purchaseItem: PurchaseItem;
};

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
};

const PurchaseDetailsModalHeader: React.FC<PurchaseItemProps> = ({ purchaseItem }) => {
    return (
        <Box sx={{ boxShadow: 3, backgroundColor: "#F4F2F2", textAlign: "center", fontSize: 22, fontWeight: "bold" }}>
             <Grid container spacing={2}>
                <Grid item xs={8} sx={{}}>Compra:</Grid>
                <Grid item xs={2} sx={{ fontWeight: "normal" }}>{purchaseItem?.id}</Grid>
             </Grid>
        </Box>
    );
};

const DisplayModal: React.FC<PurchaseItemProps> = ({ purchaseItem }) => {
    return <p></p>;
};

type PurchaseDetailsModalProps = {
    show: boolean;
    purchaseItem: PurchaseItem;
    onClose: () => void;
};

const PurchaseDetailsModal: React.FC<PurchaseDetailsModalProps> = ({ show, purchaseItem, onClose }) => {
    const [open, setOpen] = React.useState(show);
    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    useEffect(() => {
        setOpen(show);
    }, [show]);
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Grid container sx={{ backgroundColor: "#FFF" }}>
                    <Grid item xs={12}>
                        <PurchaseDetailsModalHeader purchaseItem={purchaseItem}></PurchaseDetailsModalHeader>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container  sx={{ fontSize: 22, fontWeight: "bold" }}>
                            <Grid item xs={6}>
                                <Stack>
                                    <>Data da compra:</>
                                    <br/>
                                    <>Valor total:</>
                                    <br/>
                                    <>Meio de pagamento:</>
                                    <br/>
                                    <>Quantidade de itens:</>
                                    <br/>
                                    <>Status de pagamento:</>
                                    <br/>
                                </Stack>
                            </Grid>

                            <Grid item xs={6} sx={{fontWeight: "normal" }}>
                                <Stack>
                                    <>{purchaseItem?.date}</>
                                    <br/>
                                    <>{purchaseItem?.price}</>
                                    <br/>
                                    <>{purchaseItem?.paymentMethod}</>
                                    <br/>
                                    <>{purchaseItem?.books.length}</>
                                    <br/>
                                    <>{purchaseItem?.status}</>
                                    <br/>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} justifyContent="center" alignItems="center"> <Divider height={4}  width={"95%"} style={{}} /> </Grid>
                    <Grid item xs={12} fontSize={22} sx={{ fontWeight: "bold" }}>
                        {" "}
                        Ebooks adquiridos:
                    </Grid>
                    <Grid item xs={12}>
                        <List sx={{ width: "100%" }}>
                            {purchaseItem?.books.map((book) => (
                                <ListItem>
                                    <EbookHistoryModalCard ebook={book}></EbookHistoryModalCard>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>                    

                </Grid>
            </Box>
        </Modal>
    );
};

export default PurchaseDetailsModal;

/* <Grid item xs={4}> Data da compra:</Grid>
<Grid item xs={8} sx={{ fontWeight: "normal" }}>
    {purchaseItem?.date}
</Grid>

<Grid item xs={4}> Valor total:</Grid>
<Grid item xs={8} sx={{ fontWeight: "normal" }}>
    {purchaseItem?.price}
</Grid>

<Grid item xs={6}>Meio de pagamento:</Grid>
<Grid item xs={6} sx={{ fontWeight: "normal" }}>
    {purchaseItem?.paymentMethod}
</Grid>

<Grid item xs={6}>Quantidade de itens:</Grid>
<Grid item xs={6} sx={{ fontWeight: "normal" }}>
    {purchaseItem?.books.length}
</Grid>

<Grid item xs={6}> Status de pagamento:</Grid>

<Grid item xs={6} sx={{ fontWeight: "normal" }}>
    {purchaseItem?.status}
</Grid> */