"use client";

import Image from "next/image";
import { theme } from "@/app/theme";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { DateTime } from "luxon";
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
import useRequest from "@/app/services/requester";

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
    const [ebooks, setEbooks] = useState([]);

    const requester = useRequest();

    useState(() => {
        requester.get(`/ebook/author/${4}`).then((response) => {
            setEbooks(response.data);
        });
    }, []);

    const handleClickOpen = (ebook: AuthorEbook) => {
        setOpenEbook(ebook);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    interface Column {
        id: "cover" | "title" | "createdAt" | "status" | "acao";
        label: string;
        minWidth?: number;
        align?: "right" | "left" | "center";
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: "cover", label: "", minWidth: 20, align: "center" },
        { id: "title", label: "Nome", minWidth: 200, align: "left" },
        {
            id: "createdAt",
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
                    src={ebook.cover}
                />
            </Box>
        );
    }

    function getButtonStatus(ebook: AuthorEbook): any {
        switch (ebook.status) {
            case EnumAuthorEbookStatus.PENDING:
                return <Chip label="Pendente" />;
            case EnumAuthorEbookStatus.ACTIVE:
                return <Chip label="Aprovado" color="success" size="medium" />;
            case EnumAuthorEbookStatus.INACTIVE:
                return <Chip label="Inativo" color="warning" size="medium" />;
            default:
                return <Chip label="Negado" color="error" />;
        }
    }

    function formatDate(ebook) {
        const d = DateTime.fromISO(ebook.createdAt);
        return d.toFormat("dd/LL/yyyy");
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
                                    <strong>Autor:</strong> {openEbook.author}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Quantidade de Páginas:</strong> {openEbook.pages ?? "-"}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Gêneros:</strong> {openEbook.genero ?? "-"}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Preço:</strong> {openEbook?.price?.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Idioma:</strong> {openEbook.languages ?? "-"}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Ano Lançamento:</strong> {openEbook.releaseYear}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogContent sx={{ color: "dark.main" }}>
                        <Typography variant="body2">
                            <strong>Sinopse:</strong>
                        </Typography>
                        <Typography variant="body2">{openEbook.summary}</Typography>
                    </DialogContent>
                    <DialogContent>
                        <Typography variant="body2">
                            <strong style={{ color: theme.palette.dark.main }}>Status: </strong> {getButtonStatus(openEbook)}
                        </Typography>
                    </DialogContent>
                    {openEbook.status === EnumAuthorEbookStatus.INACTIVE && (
                        <DialogContent sx={{ color: "dark.main", backgroundColor: "secondary.main", mx: 2, borderRadius: 3 }}>
                            <Typography variant="body2">
                                <strong>{openEbook.motivo_recusa} </strong>
                            </Typography>
                        </DialogContent>
                    )}
                    <DialogActions style={{ justifyContent: "center" }}>
                        {openEbook.status === EnumAuthorEbookStatus.ACTIVE ? (
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
                            alignItems: "center",
                            display: "flex",
                            textTransform: "uppercase",
                            fontWeight: "medium",
                        }}
                        variant="h1"
                        color="darker.main"
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
                                                            : column.id === "cover"
                                                            ? getImage(tableItem)
                                                            : column.id === "status"
                                                            ? getButtonStatus(tableItem)
                                                            : column.id == "createdAt"
                                                            ? formatDate(tableItem)
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
