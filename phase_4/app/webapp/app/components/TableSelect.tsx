import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export function TableSelect({ title, onChange, items }: { title: string, items: Array<{ value: string | number, title: string }>, onChange: (value: string | number) => void }) {

    const [selected, setSelected] = useState("");

    return (<FormControl fullWidth>
        <InputLabel size="small" id={"table-" + title + "-select-label"}>
            {title}
        </InputLabel>
        <Select
            labelId={"table-" + title + "-select-label"}
            id={"table-" + title + "-select"}
            value={selected}
            label={title}
            onChange={(e) => {
                onChange(e.target.value);
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
            {items.map((e) => {
                return <MenuItem key={e.value} value={e.value}>{e.title}</MenuItem>
            })}
        </Select>
    </FormControl>);
}