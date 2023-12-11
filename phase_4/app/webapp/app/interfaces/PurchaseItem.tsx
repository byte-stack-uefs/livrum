import Ebook from "../interfaces/Ebook";

export default interface PurchaseItem {
    id: string;
    date: string;
    status: string;
    books : Ebook[];
    paymentMethod: string;
    price: number;
}