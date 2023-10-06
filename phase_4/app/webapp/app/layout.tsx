import "./globals.css";
import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";

const font = Source_Sans_3({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    title: {
        template: "%s | " + process.env.APP_NAME,
        default: process.env.APP_NAME + '',
    },
    description: "Livrum website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={font.className + " min-h-screen"}>{children}</body>
        </html>
    );
}
