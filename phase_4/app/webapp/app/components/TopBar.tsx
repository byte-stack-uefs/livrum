import Image from "next/image";

const imagePath = "/livrum-lateral.png";


export default function TopBar() {
    return (<section className="bg-white">
        <div className="flex justify-between">
            <div>
                <Image alt="Livrum TopBar Logo" src={imagePath} width={300} height={120} />
            </div>
            <div className="bg-gray-300">Campo de busca</div>
            <div className="flex justify-evenly  text-livrum-dark font-bold">
                <div>Ícone Carrinho</div>
                <div>Ícone usuário</div>
            </div>
        </div>
    </section>);
}