export type Ebook = {
    id: number;
    author: string;
    title: string;
    releaseYear: string;
    price: number;
    isAvailable: boolean;
    summary: string | JSX.Element;
    cover: string;    

    size?: number;
    genre?: string;
    pages?: number;    
    languages?: string[];
    
}

export type EbookResponse = {
    ebooks: Ebook[];
};  
  export default Ebook;


