import Divider from "./Divider";
import React, { useEffect } from "react";
import PurchaseItem from "../interfaces/PurchaseItem";
import { Box, Chip, Grid, Stack, Dialog, DialogTitle } from "@mui/material";
import EbookHistoryModalCard from "./EbookHistoryModalCard";

type PurchaseItemProps = {
    purchaseItem: PurchaseItem;
};

const PurchaseDetailsModalHeader: React.FC<PurchaseItemProps> = ({ purchaseItem }) => {
    return (
        <Box sx={{ textAlign: "center", fontSize: 22, fontWeight: "bold" }}>
            <Grid container p={3}>
                <Grid item xs={12}>
                    Compra: <span style={{ fontWeight: "normal" }}>{purchaseItem?.id}</span>
                </Grid>
            </Grid>
        </Box>
    );
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
        <Dialog maxWidth="md" open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <DialogTitle sx={{ backgroundColor: "secondary.main" }}>
                <PurchaseDetailsModalHeader purchaseItem={purchaseItem}></PurchaseDetailsModalHeader>
            </DialogTitle>

            <Grid container>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                    <Grid container sx={{}} p={4}>
                        <Grid item xs={12}>
                            <Stack>
                                <div>
                                    <span style={{ fontWeight: "bold" }}>Data da compra: </span>
                                    <span>{purchaseItem?.date}</span>
                                </div>
                                <div>
                                    <span style={{ fontWeight: "bold" }}>Valor total: </span>
                                    <span>{purchaseItem?.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</span>
                                </div>
                                <div>
                                    <span style={{ fontWeight: "bold" }}>Meio de pagamento: </span>
                                    <span>{purchaseItem?.paymentMethod}</span>
                                </div>
                                <div>
                                    <span style={{ fontWeight: "bold" }}>Quantidade de itens: </span>
                                    <span>{purchaseItem?.books.length}</span>
                                </div>
                                <div>
                                    <span style={{ fontWeight: "bold" }}>Status de pagamento: </span>
                                    <span>
                                        <Chip label={purchaseItem?.status} />
                                    </span>
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} justifyContent="center" alignItems="center">
                    <Divider height={3} width={"90%"} style={{ margin: "auto" }} />
                </Grid>
                <Grid container item xs={12} p={4}>
                    <Grid item xs={12} fontSize={22} sx={{ fontWeight: "bold" }} mb={3}>
                        Ebooks adquiridos:
                    </Grid>
                    <Grid item xs={12}>
                        {purchaseItem?.books.map((book) => (
                            <div style={{ margin: "16px 0" }}>
                                <EbookHistoryModalCard ebook={book}></EbookHistoryModalCard>
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default PurchaseDetailsModal;
