import { AppBar } from "@mui/material";
import { TopMain, TopSecond } from "./TopBarContainers";

/**
 * Esse componente é responsável para renderizar a Barra Superior do sistema
 */
export default function TopBar() {
    const pros = ["Mais Econômico", "Super Rápido", "Sustentável"];

    return (
        <div>
            <AppBar sx={{ backgroundColor: "white" }} position="static">
                <TopMain />
                <TopSecond pros={pros} />
            </AppBar>
        </div>
    );
}
