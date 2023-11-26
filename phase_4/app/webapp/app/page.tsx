import PublicLayout from "./components/layouts/PublicLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home | " + process.env.APP_NAME,
};

export default function Home() {

    return (

        <PublicLayout>
            <main className="flex min-h-screen flex-col items-center">
                <section id="most-bought">
                    <h5>
                        Mais Vendidos
                    </h5>

                </section>
                <section id="new">
                    <h5>
                        Mais Vendidos
                    </h5>
                </section>
                <section id="most-accessed">
                    <h5>
                        Mais Vendidos
                    </h5>
                </section>

            </main>
        </PublicLayout>
    );
}
