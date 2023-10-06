export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="justify-center">
            <div className="bg-blue-300">Esse é o layout base das páginas de cliente. Provavelmente vamos colocar o menu lateral</div>
            <div>{children}</div>
            <div className="bg-green-300">Aqui pode ser o footer u.u</div>
        </div>
    );
}
