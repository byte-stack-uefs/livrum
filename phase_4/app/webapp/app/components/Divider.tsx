"use client";

import { theme } from "@/app/theme";
import { Divider as MDivider } from "@mui/material";
import { CSSProperties } from "react";

export default function Divider({ height = 3, width = "25%", style }: { width?: number | string; style?: CSSProperties; height?: number }) {
    return <MDivider style={{ borderBottom: `${height}px solid ` + theme.palette.primary.main, width: width, ...style }} />;
}
