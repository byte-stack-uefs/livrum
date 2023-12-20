export default interface Ebook {
    id: number;
    title: string;
    cover: string;
    author: string;
    genre ?: string;
    releaseYear: string;
    isAvailable: boolean;
    price: number;
    summary: string;
}
