/**
 *
 * Esse é o componente utilizado para mostrar as páginas públicas do sistema (página inicial, detalhes
 * ebook e etc)
 *
 * Além disso, ele será utilizado nas páginas do cliente (é o mesmo layout com um menu lateral)
 */

import Image from "next/image";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <section className="bg-white">
                <div className="flex justify-between">
                    <div>
                        <Image alt="Livrum TopBar Logo" src="/livrum-lateral.png" width={300} height={120} />
                    </div>
                    <div className="bg-gray-300">Campo de busca</div>
                    <div className="flex justify-evenly">
                        <div className="text-livrum-dark bold">Ícone Carrinho</div>
                        <div>Ícone usuário</div>
                    </div>
                </div>
            </section>
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
