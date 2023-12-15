import Divider from "./Divider";
import React, { useEffect } from "react";
import PurchaseItem from "../interfaces/PurchaseItem";
import { Box, Grid, Modal, Stack } from "@mui/material";

type PurchaseItemProps = {
    purchaseItem: PurchaseItem;
};

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
};

const PurchaseDetailsModalHeader: React.FC<PurchaseItemProps> = ({ purchaseItem }) => {
    return (
        <Box sx={{ boxShadow: 3, backgroundColor: "#F4F2F2", textAlign: "center", fontSize: 22, fontWeight: "bold" }}>
            Compra: <Grid item sx={{ fontWeight: "normal" }}></Grid>
            {purchaseItem?.id}
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
                        <Stack sx={{ fontSize: 22, fontWeight: "bold" }}>
                            <Grid item xs={12} sx={{ fontWeight: "normal" }}>
                                {purchaseItem?.date}
                            </Grid>
                            <Grid item xs={12} sx={{ fontWeight: "normal" }}>
                                {purchaseItem?.price}
                            </Grid>
                            <Grid item xs={12} sx={{ fontWeight: "normal" }}>
                                {purchaseItem?.paymentMethod}
                            </Grid>
                            <Grid item xs={12} sx={{ fontWeight: "normal" }}>
                                {purchaseItem?.books.length}
                            </Grid>
                            <Grid item xs={12} sx={{ fontWeight: "normal" }}>
                                {purchaseItem?.status}
                            </Grid>
                        </Stack>
                    </Grid>
                    <Divider height={4} width={"100%"} style={{}} />
                    <Grid item sx={{ fontWeight: "bold" }}>
                        {" "}
                        Ebooks adquiridos
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default PurchaseDetailsModal;
