import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ThemeRegistry from "./theme";

const font = Roboto({ subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
    title: {
        template: "%s | " + process.env.APP_NAME,
        default: process.env.APP_NAME + "",
    },
    description: "Livrum website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={font.className}>
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
