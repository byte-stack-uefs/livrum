import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { LivrumButtonMenuItems } from "../interfaces/LivrumButtonMenuProps";

export default function LivrumButtonMenu({
    buttons
}: { buttons: LivrumButtonMenuItems[] }) {

    return (<List>
        {buttons.map(e => {
            return (e.visible && e.visible === true) && (<ListItem disablePadding key={e.label}>
                <ListItemButton selected={false}>
                    <ListItemIcon>
                        {e.icon}
                    </ListItemIcon>
                    <ListItemText primary={e.label} />
                </ListItemButton>
            </ListItem>)
        })}
    </List>);
}