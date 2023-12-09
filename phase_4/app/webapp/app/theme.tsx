"use client";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/system';


declare module "@mui/material/styles" {
    interface PaletteColorOptions {
        main: string;
        contrastText?: string;
        light?: string;
        dark?: string;
        mode?: string;
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
const secondary = "#F4F2F2";

  
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
            main: dark,
        },
        secondary: {
            main: secondary,
        },
    },
    components: {
        '&.form-control': {
            width: '100%', // ou ajuste conforme necessário
            padding: '0.375rem 0.75rem',
            fontSize: '1rem',
            lineHeight: '1.5',
            color: '#495057',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box',
            border: '1px solid #ced4da',
            borderRadius: '0.25rem',
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
            
          },
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
          },
        MuiTab: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "#E5E2E2",
                        color: "#2665BE",
                        transition: "all 0.5s",
                        borderRadius: "20px 20px 0 0",
                    },
                    "&:not(.Mui-selected)": {
                        backgroundColor: "#1E3345",
                        color: "#fff",
                        borderRadius: "20px 20px 0 0",
                    },
                },
                '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
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
