import { Box, CircularProgress, Stack } from "@mui/material";
import Image from "next/image";

import logo from '@/public/livrum.png'

export default function Loading() {
    return (
        <Box sx={{ height: '100vh', width: '100vw', backgroundColor: '#fff' }}>
            <Stack alignItems="center" justifyContent="center" height="100%">
                <Image width={200} height={300} src={logo} alt="Logo" />
                <CircularProgress color="primary" />
            </Stack>
        </Box>
    );
}