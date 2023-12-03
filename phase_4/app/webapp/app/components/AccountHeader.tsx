"use client";

import { theme } from '@/app/theme'
import LivrumLogo from "./LivrumLogo";
import { Outfit } from "next/font/google";
import { Typography } from "@mui/material";
import { useSystem } from "../services/SystemService";
const outfit = Outfit({ weight: "900", display: "swap", subsets: ["latin"] });

export default function AccountHeader({ fontSize = 60, logoScale = 0.2 }: { fontSize?: number, logoScale?: number }) {

    const system = useSystem();
    const title = system.title;

    return (<>
        <LivrumLogo scale={logoScale} />
        <Typography sx={{ fontSize: fontSize, color: theme.palette.darker.main, alignItems: 'center', display: 'flex', textTransform: 'uppercase' }} variant="h1" className={outfit.className}>
            {title}
        </Typography>
    </>)
}