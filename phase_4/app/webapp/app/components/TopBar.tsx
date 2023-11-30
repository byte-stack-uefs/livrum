import { AppBar, Container, Grid, TextField, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { theme } from "@/app/theme";
import { TopMain, TopSecond } from "./TopBarContainers";

/**
 * Esse componente é responsável para renderizar a Barra Superior do sistema
 */
export default function TopBar() {
    const pros = ["Mais Econômico", "Super Rápido", "Sustentável"];

    return (
        <div>
            <AppBar sx={{ backgroundColor: "white" }} position="static">
                <TopMain title={process.env.APP_NAME} theme={theme} />
                <TopSecond pros={pros} theme={theme} />
            </AppBar>
        </div>
    );
}
