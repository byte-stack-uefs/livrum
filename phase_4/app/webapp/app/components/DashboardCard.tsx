"use client";

import { theme } from "../theme";
import React, { ReactNode } from "react";
import { Card, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function DashboardCard({ header, Icon, month, title, subtitle }: { header: string, Icon: ReactNode, month: string, title: string, subtitle?: string }) {

    return <>
        <Grid xs={4}>
            <Typography sx={{ color: theme.palette.darker.main }}>
                {header}
            </Typography>
            <Card elevation={0} sx={{ borderRadius: 2 }}>
                <Grid container p={2}>
                    <Grid xs={3} textAlign={"center"}>
                        {Icon}
                    </Grid>
                    <Grid xs={9} textAlign={"right"}>
                        <Typography variant="h4" display={"inline-block"} sx={{ color: theme.palette.darker.main }}>
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" display={"inline-block"} sx={{ color: theme.palette.darker.main }}>
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