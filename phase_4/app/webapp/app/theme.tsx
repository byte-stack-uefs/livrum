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

const darkerColor = "#153C7F";

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
          "&.Mui-selected": {
            backgroundColor: "#E5E2E2",
            color: "#2665BE",
            transition: "all 0.5s",
            borderRadius: "20px 20px 0 0"
          },
          "&:not(.Mui-selected)": {
            backgroundColor: "#1E3345",
            color: "#fff",
            borderRadius: "20px 20px 0 0"
          },
          
        },
      },
    },
  },
  
});

export default function ThemeRegistry(props: React.PropsWithChildren) {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
