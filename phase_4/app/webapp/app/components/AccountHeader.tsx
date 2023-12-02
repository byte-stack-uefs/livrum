"use client"

import { Outfit } from "next/font/google";
import LivrumLogo from "./LivrumLogo";
import { Theme, Typography } from "@mui/material";
const outfit = Outfit({ weight: "900", display: "swap", subsets: ["latin"] });

export default function AccountHeader({ title, theme }: { title?: string, theme: Theme }) {
    return (<>
        <LivrumLogo scale={0.2} />
        <Typography sx={{ fontSize: 60, color: theme.palette.darker.main, alignItems: 'center', display: 'flex', marginX: 4, textTransform: 'uppercase' }} variant="h1" className={outfit.className}>
            {title}
        </Typography>
    </>)
}