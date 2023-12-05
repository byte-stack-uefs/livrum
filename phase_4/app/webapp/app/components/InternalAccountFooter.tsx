"use client";

import { theme } from "../theme";
import { Grid } from "@mui/material";
import { useSystem } from "../services/SystemService";

export default function InternalAccountFooter() {
    const system = useSystem();
    const { company } = system;

    return (
        <Grid container sx={{ textAlign: "center", backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
            <Grid item xs={12} sx={{ paddingY: 2 }}>
                By {company} &copy; - {new Date().getFullYear()}{" "}
            </Grid>
        </Grid>
    );
}
