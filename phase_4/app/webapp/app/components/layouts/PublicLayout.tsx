/**
 *
 * Esse é o componente utilizado para mostrar as páginas públicas do sistema (página inicial, detalhes
 * ebook e etc)
 *
 * Além disso, ele será utilizado nas páginas do cliente (é o mesmo layout com um menu lateral)
 */

import TopBar from "../TopBar";
import Footer from "../Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <TopBar />
            <section style={{ minHeight: '100vh' }}>{children}</section>
            <Footer />
        </div>
    );
}
