import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export interface EbookTableItem {
    id: number;
    name: string;
    genres: Array<string>;
    price: number;
    sold: number;
    revenue: number;
}

export function EbooksTable({ headers, items }: { headers: Array<string>, items: Array<EbookTableItem> }) {

    function getDataOrEmpty() {
        if (items.length > 0) {
            return items.map((element: EbookTableItem) => {
                return (
                    <>
                        <TableCell>{element.id}</TableCell>
                        <TableCell>{element.name}</TableCell>
                        <TableCell>
                            {element.genres.slice(0, 3).map((e) => {
                                return (<Chip label={e} />)
                            })}
                        </TableCell>
                        <TableCell>{element.price.toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</TableCell>
                        <TableCell>{element.sold}</TableCell>
                        <TableCell>{element.revenue.toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</TableCell>
                    </>
                );
            })
        } else {
            return <TableCell colSpan={headers.length}>
                Nenhum item encontrado
            </TableCell>
        }
    }

    return (<Table>
        <TableHead>
            <TableRow>
                {headers.map((e) => {
                    return <TableCell key={e}>{e}</TableCell>
                })}
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                {getDataOrEmpty()}
            </TableRow>
        </TableBody>
    </Table>);
}