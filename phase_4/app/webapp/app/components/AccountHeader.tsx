"use client"

import { Outfit } from "next/font/google";
import LivrumLogo from "./LivrumLogo";
import { Theme, Typography } from "@mui/material";
const outfit = Outfit({ weight: "900", display: "swap", subsets: ["latin"] });

export default function AccountHeader({ title, theme, fontSize = 60, logoScale = 0.2 }: { title?: string, theme: Theme, fontSize?: number, logoScale?: number }) {
    return (<>
        <LivrumLogo scale={logoScale} />
        <Typography sx={{ fontSize: fontSize, color: theme.palette.darker.main, alignItems: 'center', display: 'flex', textTransform: 'uppercase' }} variant="h1" className={outfit.className}>
            {title}
        </Typography>
    </>)
}