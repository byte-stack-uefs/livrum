"use client"

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./useCart";
import { Box, Button, Grid, List, ListItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useCallback } from "react";
import { CartItemType } from "../ebook/[id]/page";


// interface itemCart{
//     item: any
// }

// type InListEbookCard = {
//     item: itemCart;
// };

// const DisplayBookInfo: React.FC<InListEbookCard> = ({item}) => {
//     return (
//         <Grid container sx={{ color: "dark.main" }} height="100%">
//             <Grid xs={8}>
//                 <Grid xs={12} sx={{ fontSize: 22, fontWeight: "bold" }}>
//                     {item.title}
//                 </Grid>
//                 <Grid xs={12}>
//                     {item.author}
//                 </Grid>
//             </Grid>
//             <Grid xs={4} sx={{ textAlign: "right" }}>
//                 <Stack direction="column" height="100%" justifyContent="space-between">
//                     <div>
//                         <Button>Remover</Button>
//                     </div>
//                 </Stack>
//             </Grid>
//         </Grid>
//     );
// };

// const ListCartItems: React.FC<InListEbookCard> = ({item}) => {
//     return (
//         <Grid container xs={12} sx={{ boxShadow: 3, backgroundColor: "#FFF", borderRadius: "16px", p: 2 }}>
//             <Grid xs={2}>
//                 <Box> 
//                     <Image
//                         className="image-zoom"
//                         width={100}
//                         height={125}
//                         style={{ objectFit: "cover", borderRadius: "16px" }}
//                         alt={item.title}
//                         src={item.cover}
//                     />
//                 </Box>
//             </Grid>
//             <Grid xs={10}>
//                 <DisplayBookInfo item={item}></DisplayBookInfo>
//             </Grid>
//         </Grid>
//     );
// };

// export default function Page() {
//     return (<>
//         <Grid container spacing={2}>
//             <Grid xs={12} sx={{ backgroundColor: 'secondary.main', borderRadius: '16px' }}>
//                 <ClientLibraryBookContainer></ClientLibraryBookContainer>
//             </Grid>
//         </Grid>
//     </>);
// }


// return (
//     <Grid container xs={12}>
//         <List sx={{ width: "100%" }}>
//             {cartItems.map((itm) => (
//                 <ListItem key={itm.id}>
//                     <ListCartItems item={itm}></ListCartItems>
//                 </ListItem>
//             ))}
//         </List>
//     </Grid>
// );
// }

const Cart = () => {
    const {cartItems} = useCart()
    
    if(!cartItems || cartItems.length == 0){
        return(
            <Grid container justifyContent={"center"}>
                <Typography variant="body1" fontSize={20}>Carrinho Vazio</Typography>
                <Grid container justifyContent={"center"}>
                    <Link href={"/"}>
                        <Typography variant="body2">Vamos as Compras</Typography>
                    </Link>
                </Grid>

            </Grid>
        )
    } 
    return(
        <Grid container>
            <Grid xs={12} textAlign="center" py={2}>
                <Typography variant="h4" color="dark.main">Carrinho</Typography>
            </Grid>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                    <Table stickyHeader size="small" aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Capa</TableCell>
                                <TableCell align="right">Nome</TableCell>
                                <TableCell align="right">Autor</TableCell>
                                <TableCell align="right">Preco</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => {
                                return (<TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell align="right">{item.title}</TableCell>
                                    <TableCell align="right">{item.author}</TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
        );
    }

export default Cart; 
