import Divider from "@/app/components/Divider";
import { AddShoppingCart } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Container, List, ListItem, ListItemText, Typography } from "@mui/material";

interface EbookPageParams {
    id: number;
}

export default function Page({ params }: { params: EbookPageParams }) {
    return (
        <Container maxWidth={false}>
            <Grid container >

                <Grid container xs={12} sx={{ backgroundColor: 'secondary.main' }}>
                    <Grid xs={12}>
                        TÍTULO DO EBOOK
                    </Grid>
                    <Grid container xs={12}>
                        <Grid xs={4}>
                            Capa do livro
                        </Grid>
                        <Grid container xs={8}>
                            <Grid xs={12}>
                                <Typography variant="h5">
                                    Descrição
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus
                                    recusandae facere eveniet, magni tempora praesentium alias itaque explicabo accusamus
                                    asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint consequatur?
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At temporibus
                                    recusandae facere eveniet, magni tempora praesentium alias itaque explicabo accusamus
                                    asperiores officiis blanditiis. Natus, tempore esse! Porro alias sint consequatur?
                                </p>
                            </Grid>
                            <Grid xs={12} container>
                                <Grid xs={6}>
                                    R$ 39,90
                                </Grid>
                                <Grid xs={6}>
                                    <Button variant="contained" startIcon={<AddShoppingCart />}>
                                        Comprar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid xs={12}>
                            Especificações
                        </Grid>
                        <Grid xs={12} container>
                            <Grid xs={6}>
                                <List disablePadding>
                                    <ListItem>
                                        <ListItemText>
                                            Autor
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            Autor
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            Autor
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid xs={6}>
                                <ListItem>
                                    <ListItemText>
                                        Autor
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        Autor
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        Autor
                                    </ListItemText>
                                </ListItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid xs={12}>
                    <Typography>
                        Títulos semelhantes
                    </Typography>
                    <Divider width={"35%"} />
                </Grid>


            </Grid>
        </Container>
    );
}
