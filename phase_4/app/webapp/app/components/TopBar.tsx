import LivrumLogo from "./LivrumLogo";

import { Outfit } from "next/font/google";
const outfit = Outfit({ weight: '900', display: 'swap', subsets: ['latin'] })

export default function TopBar() {
    return (
        <div>
            <section className="bg-white">
                <div className="flex justify-between">
                    <div className="flex w-1/3 justify-around">
                        <LivrumLogo scale={0.20} />
                        <p className={outfit.className + ' text-livrum-dark'} style={{ fontSize: 60 }}>
                            LIVRUM
                        </p>
                    </div>
                    <div className="bg-gray-300 text-center self-center w-1/3">Campo de busca</div>
                    <div className="flex justify-evenly text-livrum-dark font-bold w-1/3">
                        <div>Ícone Carrinho</div>
                        <div>Ícone usuário</div>
                    </div>
                </div>
            </section>
            <section className="bg-livrum-primary text-white h-12">
                <div className="flex justify-around h-full items-center">
                    <div>Mais Econômico</div>
                    <div>Super Rápido</div>
                    <div>Sustentável</div>
                </div>
            </section>
        </div>

    );
}