"use client";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface PaletteColorOptions {
        main: string;
        contrastText?: string;
        light?: string;
        dark?: string;
    }
    interface PaletteOptions {
        darker?: PaletteColorOptions;
        primary?: PaletteColorOptions;
        secondary?: PaletteColorOptions;
        info?: PaletteColorOptions;
        error?: PaletteColorOptions;
        success?: PaletteColorOptions;
        dark?: PaletteColorOptions;
        textLight?: PaletteColorOptions;
    }
    interface Theme {
        palette: {
            darker: any;
            primary: any;
            secondary: any;
            info: any;
            error: any;
            success: any;
            dark: any;
            textLight: any;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        palette?: PaletteOptions;
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        dark: true;
    }
}

declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsColorOverrides {
        dark: true;
        darker: true;
    }
}

const dark = "#1E3345";
const darker = "#153C7F";
const primary = "#2665BE";
const secondary = "#E5E2E2";
const royal_blue = "#163760";

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: primary,
        },
        success: {
            main: "#8CD087",
        },
        error: {
            main: "#D95D56",
        },
        darker: {
            main: darker,
            contrastText: "#FFF",
        },
        dark: {
            main: dark,
        },
        secondary: {
            main: secondary,
        },
        textLight: {
            main: "#00000066",
        },
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: secondary,
                        color: primary,
                        transition: "all 0.5s",
                        borderRadius: "20px 20px 0 0",
                    },
                    "&:not(.Mui-selected)": {
                        backgroundColor: darker,
                        color: "#fff",
                        borderRadius: "20px 20px 0 0",
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: dark,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: dark,
                },
            },
        },
    },
});

export default function ThemeRegistry(props: React.PropsWithChildren) {
    const { children } = props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
