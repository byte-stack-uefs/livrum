import { Tab, Tabs, styled } from "@mui/material";
import { useState } from "react";

const MTab = styled(Tab)(({ theme }) => ({
    "&.Mui-selected": {
        backgroundColor: "#fff",
    },
}));

export function TabSelector({ items, def, onChange }: { items: Array<string>, def: number, onChange: (value: any) => void }) {

    const [value, setValue] = useState(def);

    return (<Tabs value={value} scrollButtons={false} onChange={(e, value) => {
        setValue(value);
        onChange(value);
    }} TabIndicatorProps={{ style: { display: "none" } }}>

        {items.map((e) => {
            return <MTab
                key={e}
                label={e}
                sx={{
                    borderRadius: "0px 0 0 0",
                }}
            />
        })}

    </Tabs>);
}