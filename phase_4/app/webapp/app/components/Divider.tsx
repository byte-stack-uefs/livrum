"use client";

import { theme } from "@/app/theme";
import { Divider as MDivider } from "@mui/material";
import { CSSProperties } from "react";

export default function Divider({ width = "25%", style }: { width?: number | string; style?: CSSProperties }) {
    return <MDivider style={{ borderBottom: "3px solid " + theme.palette.primary.main, width: width, ...style }} />;
}
