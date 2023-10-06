import PublicLayout from "./PublicLayout";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <PublicLayout>
            <section className="bg-gray-200 p-2">Sidebar</section>
            <section>{children}</section>
        </PublicLayout>
    );
}
