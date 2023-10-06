import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "livrum-primary": "#2665BE",
                "livrum-dark": "#1E3345",
                "livrum-danger": "#D95D56",
                "livrum-success": "#8CD087",
                "livrum-gray": "#D9D9D9",
                "livrum-darker": "#153C7F",
            },
        },
    },
    plugins: [],
};
export default config;
