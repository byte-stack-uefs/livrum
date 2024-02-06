"use client";
import Ebook from "../interfaces/Ebook";
import EbookDetails from "./EbookDetails";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function PreviewDialog({ ebook, open = false, onClose }: { ebook: Ebook, open: boolean, onClose?: () => void }) {

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        if (typeof onClose == 'function') {
            onClose();
        }
    }

    useEffect(() => {
        setIsOpen(open);
    }, [open])

    return <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={isOpen}
        onClose={handleClose}
    >
        <DialogTitle>Preview Ebook</DialogTitle>
        <DialogContent>
            <EbookDetails ebook={ebook} onAddCart={() => { }} shouldDisableAddCart={() => { return true }} />
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={handleClose}>Fechar</Button>
        </DialogActions>
    </Dialog>;
}