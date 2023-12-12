"use client"

import Typography from "@mui/material/Typography";
import { theme } from "@/app/theme";
import { Source_Sans_3 } from "next/font/google";
import { alpha, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, useMediaQuery } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import createAuthorEbook, { AuthorEbook, EnumAuthorEbookStatus } from "@/app/interfaces/AuthorEbook";
import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";


const sourceSans3 = Source_Sans_3({ style: "normal", weight: "200", preload: false });

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '100px 100px 100px 100px',
    border: `1px solid ${theme.palette.darker.main}`,
    backgroundColor: alpha(theme.palette.darker.contrastText, 0.25),
    '&:hover': {
        backgroundColor: alpha(theme.palette.mintCream.main, 0.25),
    },
    marginLeft: "50%",
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '14ch',
            '&:focus': {
                width: '90%',
            },
        },
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
            label: "data",
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


    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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



    const ebooks: Array<AuthorEbook> = [
        createAuthorEbook(1, "ADmin 1", "20/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.APPROVED),
        createAuthorEbook(2, "Admin 2", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.APPROVED),
        createAuthorEbook(3, "Admin 3", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.BLOCKED),
        createAuthorEbook(4, "United States", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.APPROVED),
        createAuthorEbook(5, "Canada", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.APPROVED),
        createAuthorEbook(6, "Australia", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.BLOCKED),
        createAuthorEbook(7, "Germany", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.APPROVED),
        createAuthorEbook(8, "Ireland", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.APPROVED),
        createAuthorEbook(9, "Mexico", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.PENDING),
        createAuthorEbook(10, "Japan", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.APPROVED),
        createAuthorEbook(11, "France", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.APPROVED),
        createAuthorEbook(12, "United Kingdom", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.PENDING),
        createAuthorEbook(13, "Russia", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.APPROVED),
        createAuthorEbook(14, "Nigeria", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.PENDING),
        createAuthorEbook(15, "Brazil", "0/02/2012", "https://l1nq.com/GpmPU", EnumAuthorEbookStatus.APPROVED),
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
        return <Box>
            <Image
                className="image-zoom"
                width={100}
                height={125}
                style={{ objectFit: "cover", borderRadius: "16px" }}
                alt=""
                src={ebook.link_foto}
            />
        </Box>;
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
    return <>

        <React.Fragment>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-D" open={openDialog}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {openEbook.nome}
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
                <DialogContent>
                    <DialogContentText>
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Fechar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>

        <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(1, 1fr)', marginTop: "10px", marginBottom: "10px" }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', justifyContent: "space-between" }}>
                <Typography
                    sx={{
                        fontSize: 32,
                        color: theme.palette.darker.main,
                        alignItems: "center",
                        marginTop: "1%",
                        display: "flex",
                        textTransform: "uppercase",
                        fontWeight: 'medium'
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
                    <StyledInputBase
                        placeholder="Buscar por nome"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Box>
            <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
                <TableContainer sx={{ maxHeight: '100%' }}>
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
                                                    {column.id === "acao" ?
                                                        getButtonAction(tableItem)
                                                        : column.id === "link_foto" ?
                                                            getImage(tableItem)
                                                            : column.id === "status" ?
                                                                getButtonStatus(tableItem)
                                                                : tableItem[column.id]
                                                    }
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
    </>;
}