"use client";

import { useState } from "react";
import EbookCard from "../../components/EbookCard";

export default function Page() {
    const [name, setName] = useState("LIVRUM");

    const [books, setBooks] = useState([
        {
            author: "Almir Neto",
            title: "A sutil arte de ligar o foda-se",
            releaseDate: "27/11/2023",
        },
        {
            author: "Almir Neto",
            title: "A sutil arte de ligar o foda-se",
            releaseDate: "27/11/2023",
        },
        {
            author: "Almir Neto",
            title: "A sutil arte de ligar o foda-se",
            releaseDate: "27/11/2023",
        },
        {
            author: "Almir Neto",
            title: "A sutil arte de lgar o foda-se",
            releaseDate: "Livro do meio aleatório",
        },
        {
            author: "Almir Neto",
            title: "A sutil arte de ligar o foda-se",
            releaseDate: "27/11/2023",
        },
        {
            author: "Almir Neto",
            title: "A sutil arte de ligar o foda-se",
            releaseDate: "27/11/2023",
        },
    ]);

    return (
        <div>
            <h5>Catálogo</h5>

            <div>
                <div>
                    <input type="text" value={name} className="bg-red-300" onChange={(e) => setName(e.target.value)} />
                    <button
                        onClick={() => {
                            let b = Array.from(books);

                            b.push({ title: "teste", author: "", releaseDate: "" });

                            setBooks(b);
                        }}
                    >
                        Buscar
                    </button>
                    <br />
                    Gênero
                    <br />
                    Idioma
                </div>
                <div>Exibindo resultados</div>

                <br />

                <div>
                    {books
                        .filter((e) => {
                            return e.title == name;
                        })
                        .map((e) => {
                            return <EbookCard book={e} />;
                        })}
                </div>
            </div>
        </div>
    );
}
