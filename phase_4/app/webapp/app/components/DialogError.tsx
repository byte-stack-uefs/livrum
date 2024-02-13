import { Close } from "@mui/icons-material";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
} from "@mui/material";
import { useState } from "react";

export function DialogError({
    open,
    message,
    onClose,
}: {
    open: boolean;
    message: string;
    onClose: () => void;
}) {
    const [show, setShow] = useState<boolean>(open);
    return (
        <Dialog open={open}>
            <DialogTitle>
                <Grid container>
                    <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <IconButton
                            onClick={() => {
                                setShow(false);
                                onClose();
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container sx={{ textAlign: "center" }}>
                    <Grid item xs={12}>
                        <Close color="error" sx={{ fontSize: "3rem" }} />
                    </Grid>
                    <Grid item xs={12}>
                        {message}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
