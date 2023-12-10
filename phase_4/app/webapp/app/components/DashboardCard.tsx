"use client";

import { theme } from "../theme";
import React, { ReactNode } from "react";
import { Card, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function DashboardCard({ Icon, month, title, subtitle }: { Icon: ReactNode, month: string, title: string, subtitle?: string }) {

    return <>
        <Grid xs={4}>
            <Card elevation={0} sx={{ borderRadius: 2 }}>
                <Grid container p={2}>
                    <Grid xs={4} textAlign={"center"}>
                        {Icon}
                    </Grid>
                    <Grid xs={8} textAlign={"right"}>
                        <Typography variant="h4" display={"inline-block"} sx={{ color: theme.palette.dark.main }}>
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" display={"inline-block"} sx={{ color: theme.palette.dark.main }}>
                            {subtitle}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sx={{ textAlign: 'right', color: theme.palette.textLight.main }}>
                        <Typography variant="subtitle1" display={"inline-block"}>
                            {month}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    </>;

}