import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LinearProgressWithLabel } from "./LinearProgressWithLabel";
import { Card, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

interface PopularityItem {
    id: number;
    name: string;
    popularity: number;
}

export function PopularityTable({ items, title, selectTitle }: { items: Array<PopularityItem>, title: string, selectTitle: string }) {

    const [selected, setSelected] = useState('');

    return (<Card elevation={0} sx={{ borderRadius: 2 }}>
        <Grid container padding={2}>
            <Grid xs={9}>
                <Typography variant="h5" color="darker.main">
                    {title}
                </Typography>
            </Grid>
            <Grid xs={3}>
                <FormControl fullWidth>
                    <InputLabel size="small" id="popularity-select-label">
                        {selectTitle}
                    </InputLabel>
                    <Select
                        labelId="popularity-select-label"
                        id="popularity-select"
                        value={selected}
                        label={selectTitle}
                        onChange={(e) => {
                            setSelected(e.target.value);
                        }}
                        size="small"
                        sx={{
                            borderRadius: 3,
                            backgroundColor: "secondary.main",
                            "& > .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                        }}
                    >
                        <MenuItem value={10}>X</MenuItem>
                        <MenuItem value={20}>Y</MenuItem>
                        <MenuItem value={30}>Z</MenuItem>
                    </Select>
                </FormControl>
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
                {items.map((e) => {
                    return (
                        <TableRow>
                            <TableCell align="center">{e.id}</TableCell>
                            <TableCell>{e.name}</TableCell>
                            <TableCell>
                                <LinearProgressWithLabel value={e.popularity} />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </Card>);

}