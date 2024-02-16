import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { LivrumButtonMenuItems } from "../interfaces/LivrumButtonMenuProps";
import LivrumLink from "./LivrumLink";
import { useState } from "react";

export default function LivrumButtonMenu({ buttons }: { buttons: LivrumButtonMenuItems[] }) {
    return (
        <List>
            {buttons.map((e) => {
                return (
                    e.visible &&
                    e.visible === true && (
                        <LivrumLink href={e.route} key={e.label}>
                            <ListItem disablePadding>
                                <ListItemButton selected={false}>
                                    <ListItemIcon>{e.icon}</ListItemIcon>
                                    <ListItemText primary={e.label} />
                                </ListItemButton>
                            </ListItem>
                        </LivrumLink>
                    )
                );
            })}
        </List>
    );
}
