import { Box, LinearProgress, LinearProgressProps, Typography } from "@mui/material";

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress sx={{ height: 8, borderRadius: 5 }} variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="primary.main">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}