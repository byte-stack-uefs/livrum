"use client";

import Image from "next/image";
import { theme } from "@/app/theme";
import InputBase from "@mui/material/InputBase";
import { Source_Sans_3 } from "next/font/google";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import createAuthorEbook, { AuthorEbook, EnumAuthorEbookStatus, EnumIdioma } from "@/app/interfaces/AuthorEbook";
import {
    alpha,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    useMediaQuery,
} from "@mui/material";

const sourceSans3 = Source_Sans_3({ style: "normal", weight: "200", preload: false });

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "100px 100px 100px 100px",
    border: `1px solid ${theme.palette.darker.main}`,
    backgroundColor: alpha(theme.palette.darker.contrastText, 0.25),
    "&:hover": {
        backgroundColor: alpha(theme.palette.mintCream.main, 0.25),
    },
    marginLeft: "50%",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "14ch",
            "&:focus": {
                width: "90%",
            },
        },
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

export default function ListagemEbooks() {
    const [openDialog, setOpenDialog] = useState(false);
    const [openEbook, setOpenEbook] = useState({} as AuthorEbook);

    const handleClickOpen = (ebook: AuthorEbook) => {
        setOpenEbook(ebook);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    interface Column {
        id: "link_foto" | "nome" | "data" | "status" | "acao";
        label: string;
        minWidth?: number;
        align?: "right" | "left" | "center";
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: "link_foto", label: "#", minWidth: 20, align: "center" },
        { id: "nome", label: "Nome", minWidth: 200, align: "left" },
        {
            id: "data",
            label: "Data",
            minWidth: 50,
            align: "center",
        },
        {
            id: "status",
            label: "Status",
            minWidth: 30,
            align: "center",
        },
        {
            id: "acao",
            label: "",
            minWidth: 30,
            align: "right",
        },
    ];

    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    //caixa de dialogo
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        "& .MuiDialogContent-root": {
            fullScreen,
            padding: theme.spacing(2),
        },
        "& .MuiDialogActions-root": {
            fullScreen,
            padding: theme.spacing(1),
        },
    }));

    const link_image: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlhg46xOr5GuE9K0S-8AZqXVatyw4c0jKLCA&usqp=CAU;";

    const ebooks: Array<AuthorEbook> = [
        createAuthorEbook(
            1,
            "A Sutil Arte de Ligar o F*da-se",
            "220/02/2012",
            link_image,
            EnumAuthorEbookStatus.APPROVED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            2,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.APPROVED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            3,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.BLOCKED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            "Se diz ser um livro de auto ajuda, entretanto leva muito ao pé da letra, pois não ajuda em nada, completamente inutil."
        ),
        createAuthorEbook(
            4,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.APPROVED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            5,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.APPROVED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            6,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.BLOCKED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            "Se diz ser um livro de auto ajuda, entretanto leva muito ao pé da letra, pois não ajuda em nada, completamente inutil."
        ),
        createAuthorEbook(
            7,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.APPROVED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            8,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.APPROVED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            9,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.PENDING,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            10,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.APPROVED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            11,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.APPROVED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            12,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.PENDING,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            13,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.APPROVED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            14,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.PENDING,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
        createAuthorEbook(
            15,
            "A Sutil Arte de Ligar o F*da-se",
            "20/02/2012",
            link_image,
            EnumAuthorEbookStatus.APPROVED,
            320,
            "Mark Manson",
            "Livro de autoajuda",
            35.34,
            EnumIdioma.PORTUGUES,
            2016,
            "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo. Chega de se sentir inferior por não ver o lado bom de estar no fundo do poço.",
            ""
        ),
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function getButtonAction(ebook: AuthorEbook): any {
        return <ArrowForwardIosIcon color="action" style={{ cursor: "pointer" }} onClick={() => handleClickOpen(ebook)} />;
    }

    function getImage(ebook: AuthorEbook): any {
        return (
            <Box>
                <Image
                    className="image-zoom"
                    width={100}
                    height={125}
                    style={{ objectFit: "cover", borderRadius: "16px" }}
                    alt=""
                    src={ebook.link_foto}
                />
            </Box>
        );
    }

    function getButtonStatus(ebook: AuthorEbook): any {
        switch (ebook.status) {
            case EnumAuthorEbookStatus.PENDING:
                return <Chip label="Pendente" />;
            case EnumAuthorEbookStatus.APPROVED:
                return <Chip label="Aprovado" color="success" size="medium" />;
            default:
                return <Chip label="Negado" color="error" />;
        }
    }
    return (
        <>
            <React.Fragment>
                <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-D" fullWidth={true} open={openDialog}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <Typography style={{ textAlign: "center" }}>
                            {" "}
                            <strong>{openEbook.nome}</strong>
                        </Typography>
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.dark[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent sx={{ color: "dark.main" }}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="body2" color={theme.palette.darker}>
                                    <strong>Autor:</strong> {openEbook.nome_autor}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Quantidade de Páginas:</strong> {openEbook.qtd_pag}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Gêneros:</strong> {openEbook.genero}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Preço:</strong> {openEbook?.preco?.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Idioma:</strong> {openEbook.idioma}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Ano Lançamento:</strong> {openEbook.ano_lancamento}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogContent sx={{ color: "dark.main" }}>
                        <Typography variant="body2">
                            <strong>Sinopse:</strong>
                        </Typography>
                        <Typography variant="body2">{openEbook.sinopse}</Typography>
                    </DialogContent>
                    <DialogContent>
                        <Typography variant="body2">
                            <strong style={{ color: theme.palette.dark.main }}>Status: </strong> {getButtonStatus(openEbook)}
                        </Typography>
                    </DialogContent>
                    {openEbook.status === EnumAuthorEbookStatus.BLOCKED && (
                        <DialogContent sx={{ color: "dark.main", backgroundColor: "secondary.main", mx: 2, borderRadius: 3 }}>
                            <Typography variant="body2">
                                <strong>{openEbook.motivo_recusa} </strong>
                            </Typography>
                        </DialogContent>
                    )}
                    <DialogActions style={{ justifyContent: "center" }}>
                        {openEbook.status === EnumAuthorEbookStatus.APPROVED ? (
                            <DialogActions>
                                <Button variant="contained" color="error" autoFocus onClick={handleClose}>
                                    Inativar EBook
                                </Button>
                            </DialogActions>
                        ) : null}
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>

            <Box sx={{ display: "grid", gridTemplateRows: "repeat(1, 1fr)" }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", justifyContent: "space-between" }}>
                    <Typography
                        sx={{
                            fontSize: 32,
                            color: theme.palette.darker.main,
                            alignItems: "center",
                            display: "flex",
                            textTransform: "uppercase",
                            fontWeight: "medium",
                        }}
                        variant="h1"
                        className={sourceSans3.className}
                    >
                        Minhas Obras
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Buscar por nome" inputProps={{ "aria-label": "search" }} />
                    </Search>
                </Box>
                <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
                    <TableContainer sx={{ maxHeight: "100%" }}>
                        <Table stickyHeader size="medium" aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ebooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tableItem) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={tableItem.id}>
                                            {columns.map((column) => {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id === "acao"
                                                            ? getButtonAction(tableItem)
                                                            : column.id === "link_foto"
                                                            ? getImage(tableItem)
                                                            : column.id === "status"
                                                            ? getButtonStatus(tableItem)
                                                            : tableItem[column.id]}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={ebooks.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </>
    );
}
