/**
 * Esse componente é responsável por renderizar o Rodapé da área pública do sistema
 */
export default function PublicFooter() {
    return (
        <footer className="bg-livrum-primary text-center text-white">
            <p className="p-2">Fale Conosco</p>
            <p className="p-1">{process.env.APP_EMAIL}</p>
            <p className="p-1">
                By {process.env.COMPANY} &copy; - {new Date().getFullYear()}{" "}
            </p>
        </footer>
    );
}
