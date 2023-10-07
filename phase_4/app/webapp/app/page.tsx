import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home | " + process.env.APP_NAME,
};

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <p style={{ fontSize: 100, fontWeight: 'bold', textTransform: 'uppercase' }}>
                {process.env.APP_NAME}
            </p>
        </main>
    );
}
