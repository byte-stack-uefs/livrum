import { Divider as MDivider, Theme } from "@mui/material";

export default function Divider({ theme, width = "25%" }: { theme: Theme; width?: number | string }) {
    return <MDivider style={{ borderBottom: "3px solid " + theme.palette.primary.main, margin: "auto", width: width }} />;
}
