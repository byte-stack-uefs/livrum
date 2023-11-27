import PublicLayout from "../components/layouts/PublicLayout";

export default function Page() {
    return (
        <PublicLayout>
            <h5>Catálogo</h5>

            <div>
                <div>
                    <input type="text" />
                    <button>Buscar</button>
                    <br />
                    Gênero
                    <br />
                    Idioma
                </div>
                <div>Exibindo resultados</div>
            </div>
        </PublicLayout>
    );
}
