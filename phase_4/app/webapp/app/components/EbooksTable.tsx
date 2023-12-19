import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react';

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
                    <TableRow key={element.id}>
                        <TableCell>{element.id}</TableCell>
                        <TableCell>{element.name}</TableCell>
                        <TableCell>
                            {element.genres.slice(0, 3).map((e) => {
                                return (<Chip key={e} label={e} />)
                            })}
                        </TableCell>
                        <TableCell>{element.price.toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</TableCell>
                        <TableCell>{element.sold}</TableCell>
                        <TableCell>{element.revenue.toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</TableCell>
                    </TableRow>
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
            {getDataOrEmpty()}
        </TableBody>
    </Table>);
}