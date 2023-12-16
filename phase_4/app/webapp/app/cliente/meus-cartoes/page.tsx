"use client";

import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function Page() {
    const [open, setOpen] = useState(false);

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <Grid container>
                <Button
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Test
                </Button>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign="center" sx={{ backgroundColor: "secondary.main", p: 1 }}>
                    Cadastro novo cartão
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField label={"Nome no Cartão *"} fullWidth size="small" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={"Numero do Cartão *"} fullWidth size="small" />
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs={6}>
                                <TextField type="date" label={"Data de Nascimento *"} fullWidth size="small" />
                            </Grid>
                            <Grid item xs={6} pl={2}>
                                <TextField label={"CVV *"} fullWidth size="small" />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button color="success" variant="contained" onClick={handleClose}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
