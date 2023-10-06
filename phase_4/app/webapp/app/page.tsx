import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home | " + process.env.APP_NAME,
};

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className="text-emerald-500">Welcome to {process.env.APP_NAME}.</p>
            <p className="bg-red-400 p-2 rounded-lg">{process.env.APP_NAME} PBL</p>
        </main>
    );
}
