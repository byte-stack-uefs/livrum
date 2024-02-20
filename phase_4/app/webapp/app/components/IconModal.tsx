import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";

export function IconModal({ show, onClose, children }: { show: boolean; onClose: () => void; children: React.ReactNode[] }) {
    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={show}
            onClose={(ev, reason) => {
                if (reason != "backdropClick") {
                    onClose();
                }
            }}
        >
            <DialogTitle textAlign="right">
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container>{children}</Grid>
            </DialogContent>
        </Dialog>
    );
}

function Icon({ children }) {
    return (
        <Grid xs={12} item textAlign="center">
            {children}
            {/* <CheckCircle sx={{ fontSize: 80 }} color="success" /> */}
        </Grid>
    );
}

function Content({ children }) {
    return (
        <Grid xs={12} item>
            {children}
            {/* <Typography textAlign="center" color="dark.main" variant="h4">
                Pagamento confirmado
            </Typography> */}
        </Grid>
    );
}

IconModal.Icon = Icon;
IconModal.Content = Content;
