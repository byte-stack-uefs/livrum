import Ebook from "../interfaces/Ebook";
import { Button, Slider } from "@mui/material";

export default function EbookCard({ book }: { book: Ebook }) {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src="https://m.media-amazon.com/images/I/6175IU0qFgL._AC_UF1000,1000_QL80_.jpg" alt={book.title} />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{book.title}</div>
                    <p className="block mt-1 text-lg leading-tight font-medium text-black">{book.author}</p>
                    <p className="mt-2 text-gray-500">{book.releaseYear}</p>

                    <Button variant="contained" color="primary">
                        Comprar
                    </Button>

                    <Slider />
                </div>
            </div>
        </div>
    );
}
