/**
 *
 * Esse é o componente utilizado para mostrar as páginas públicas do sistema (página inicial, detalhes
 * ebook e etc)
 *
 * Além disso, ele será utilizado nas páginas do cliente (é o mesmo layout com um menu lateral)
 */

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <section className="bg-livrum-primary">Topbar</section>
            <section>{children}</section>
            <footer className="bg-livrum-primary text-center text-white">
                <p className="p-2">Fale Conosco</p>
                <p className="p-1">{process.env.APP_EMAIL}</p>
                <p className="p-1">
                    By {process.env.COMPANY} &copy; - {new Date().getFullYear()}{" "}
                </p>
            </footer>
        </div>
    );
}
