import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LinearProgressWithLabel } from "./LinearProgressWithLabel";
import { Card, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { TableSelect } from "./TableSelect";

interface PopularityItem {
    id: number;
    name: string;
    popularity: number;
}

export function PopularityTable({ items, title, selectTitle, selectItems }: { items: Array<PopularityItem>, title: string, selectTitle: string, selectItems: Array<any> }) {

    const [selected, setSelected] = useState('');

    function getDataOrEmpty() {
        if (items.length > 0) {
            return items.map((e) => {
                return (
                    <TableRow key={e.id}>
                        <TableCell align="center">{e.id}</TableCell>
                        <TableCell>{e.name}</TableCell>
                        <TableCell>
                            <LinearProgressWithLabel value={e.popularity} />
                        </TableCell>
                    </TableRow>
                );
            })
        }
        else {
            return <TableRow>
                <TableCell colSpan={3}>
                    Nenhum item encontrado
                </TableCell>
            </TableRow>
        }
    }

    return (<Card elevation={0} sx={{ borderRadius: 2 }}>
        <Grid container padding={2}>
            <Grid xs={9}>
                <Typography variant="h5" color="darker.main">
                    {title}
                </Typography>
            </Grid>
            <Grid xs={3}>
                <TableSelect title={selectTitle} items={selectItems} onChange={(e) => { }} />
            </Grid>
        </Grid>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center">#</TableCell>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell align="left">Popularidade</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {getDataOrEmpty()}
            </TableBody>
        </Table>
    </Card>);

}