"use client";

import { theme } from '@/app/theme';
import { Divider as MDivider, Theme } from "@mui/material";

export default function Divider({ width = "25%" }: { width?: number | string }) {
    return <MDivider style={{ borderBottom: "3px solid " + theme.palette.primary.main, margin: "auto", width: width }} />;
}
