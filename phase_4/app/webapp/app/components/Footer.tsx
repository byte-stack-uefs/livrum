"use client";
import { Email } from "@mui/icons-material";
import { Grid, Theme } from "@mui/material";

/**
 * Esse componente é responsável por renderizar o Rodapé da área pública do sistema
 */
export default function PublicFooter({ email, company, theme }: { theme: Theme; email?: string; company?: string }) {
    return (
        <Grid container sx={{ textAlign: "center", backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
            <Grid item xs={12} sx={{ paddingY: 2 }}>
                Fale Conosco
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 1, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Email sx={{ marginRight: 1 }} />
                {email}
            </Grid>
            <Grid item xs={12} sx={{ paddingBottom: 2 }}>
                By {company} &copy; - {new Date().getFullYear()}{" "}
            </Grid>
        </Grid>
    );
}
