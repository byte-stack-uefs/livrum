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
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        palette?: PaletteOptions;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        dark: true;
    }
}

declare module '@mui/material/SvgIcon' {
    interface SvgIconPropsColorOverrides {
        dark: true;
        darker: true;
    }
}

const dark = "#1E3345";
const darker = "#153C7F";
const primary = "#2665BE";
const secondary = "#F4F2F2"

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
        },
        dark: {
            main: dark
        },
        secondary: {
            main: secondary
        }
    },
    components: {
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: dark
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: dark
                }
            }
        }
    }
});

export default function ThemeRegistry(props: React.PropsWithChildren) {
    const { children } = props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
