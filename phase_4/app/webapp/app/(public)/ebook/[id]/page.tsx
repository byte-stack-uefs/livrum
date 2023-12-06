interface EbookPageParams {
    id: number;
}

export default function Page({ params }: { params: EbookPageParams }) {
    return "Ebook N " + params.id;
}
