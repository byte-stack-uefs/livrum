import { Outfit } from "next/font/google";
import LivrumLogo from "./LivrumLogo";
import { Theme, Typography } from "@mui/material";
import { useSystem } from "../services/SystemService";
const outfit = Outfit({ weight: "900", display: "swap", subsets: ["latin"] });

import { theme } from '@/app/theme'

export default function AccountHeader({ fontSize = 60, logoScale = 0.2 }: { theme: Theme, fontSize?: number, logoScale?: number }) {

    const system = useSystem();
    const title = system.title;

    return (<>
        <LivrumLogo scale={logoScale} />
        <Typography sx={{ fontSize: fontSize, color: theme.palette.darker.main, alignItems: 'center', display: 'flex', textTransform: 'uppercase' }} variant="h1" className={outfit.className}>
            {title}
        </Typography>
    </>)
}