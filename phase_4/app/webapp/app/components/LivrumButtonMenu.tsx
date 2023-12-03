import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function LivrumButtonMenu({
    buttons
}: { buttons: any[] }) {

    return (<List>
        {buttons.map(e => {
            return (<ListItem disablePadding>
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