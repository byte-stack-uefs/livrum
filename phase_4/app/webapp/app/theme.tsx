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
    }
    interface Theme {
        palette: {
            darker: any;
            primary: any;
            secondary: any;
            info: any;
            error: any;
            success: any;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        palette?: PaletteOptions;
    }
}

const darkerColor = '#153C7F';

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: "#2665BE",
        },
        success: {
            main: "#8CD087",
        },
        error: {
            main: "#D95D56",
        },
        darker: {
            main: darkerColor,
        },
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: darkerColor,
                        color: '#fff',
                        transition: 'all 0.5s',
                    }
                }
            }
        }
    }
});

export default function ThemeRegistry(props: React.PropsWithChildren) {
    const { children } = props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
