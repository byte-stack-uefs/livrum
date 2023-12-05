"use client";
import {
    Box,
    Button,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { theme } from "@/app/theme";
import { Source_Sans_3 } from "next/font/google";
import createUser, { EnumUserStatus, User } from "@/app/User";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface Column {
    id: "id" | "nome" | "status" | "acao1" | "acao2" | "acao3";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 70, align: "center" },
    { id: "nome", label: "Nome", minWidth: 200, align: "left" },
    {
        id: "status",
        label: "Status",
        minWidth: 50,
        align: "center",
    },
    {
        id: "acao1",
        label: "",
        minWidth: 30,
        align: "right",
    },
    {
        id: "acao2",
        label: "",
        minWidth: 30,
        align: "right",
    },
    {
        id: "acao3",
        label: "",
        minWidth: 20,
        align: "right",
    },
];

const admins: Array<User> = [
    createUser("ADmin 1", "IN", EnumUserStatus.CREATED, 3287263),
    createUser("Admin 2", "CN", EnumUserStatus.CREATED, 9596961),
    createUser("Admin 3", "IT", EnumUserStatus.BLOCKED, 301340),
    createUser("United States", "US", EnumUserStatus.CREATED, 9833520),
    createUser("Canada", "CA", EnumUserStatus.CREATED, 9984670),
    createUser("Australia", "AU", EnumUserStatus.BLOCKED, 7692024),
    createUser("Germany", "DE", EnumUserStatus.CREATED, 357578),
    createUser("Ireland", "IE", EnumUserStatus.CREATED, 70273),
    createUser("Mexico", "MX", EnumUserStatus.PENDING, 1972550),
    createUser("Japan", "JP", EnumUserStatus.CREATED, 377973),
    createUser("France", "FR", EnumUserStatus.CREATED, 640679),
    createUser("United Kingdom", "GB", EnumUserStatus.PENDING, 242495),
    createUser("Russia", "RU", EnumUserStatus.CREATED, 17098246),
    createUser("Nigeria", "NG", EnumUserStatus.PENDING, 923768),
    createUser("Brazil", "BR", EnumUserStatus.CREATED, 8515767),
];

const authors: Array<User> = [
    createUser("Autor 1", "IN", EnumUserStatus.CREATED, 3287263),
    createUser("Autor 2", "CN", EnumUserStatus.CREATED, 9596961),
    createUser("Autor 3", "IT", EnumUserStatus.BLOCKED, 301340),
    createUser("United States", "US", EnumUserStatus.CREATED, 9833520),
    createUser("Canada", "CA", EnumUserStatus.CREATED, 9984670),
    createUser("Australia", "AU", EnumUserStatus.BLOCKED, 7692024),
    createUser("Germany", "DE", EnumUserStatus.CREATED, 357578),
    createUser("Ireland", "IE", EnumUserStatus.CREATED, 70273),
    createUser("Mexico", "MX", EnumUserStatus.PENDING, 1972550),
    createUser("Japan", "JP", EnumUserStatus.CREATED, 377973),
    createUser("France", "FR", EnumUserStatus.CREATED, 640679),
    createUser("United Kingdom", "GB", EnumUserStatus.PENDING, 242495),
    createUser("Russia", "RU", EnumUserStatus.CREATED, 17098246),
    createUser("Nigeria", "NG", EnumUserStatus.PENDING, 923768),
    createUser("Brazil", "BR", EnumUserStatus.CREATED, 8515767),
];

const clients: Array<User> = [
    createUser("cliente 1", "IN", EnumUserStatus.CREATED, 3287263),
    createUser("cliente 2", "CN", EnumUserStatus.CREATED, 9596961),
    createUser("cliente 3", "IT", EnumUserStatus.BLOCKED, 301340),
    createUser("United States", "US", EnumUserStatus.CREATED, 9833520),
    createUser("Canada", "CA", EnumUserStatus.CREATED, 9984670),
    createUser("Australia", "AU", EnumUserStatus.BLOCKED, 7692024),
    createUser("Germany", "DE", EnumUserStatus.CREATED, 357578),
    createUser("Ireland", "IE", EnumUserStatus.CREATED, 70273),
    createUser("Mexico", "MX", EnumUserStatus.PENDING, 1972550),
    createUser("Japan", "JP", EnumUserStatus.CREATED, 377973),
    createUser("France", "FR", EnumUserStatus.CREATED, 640679),
    createUser("United Kingdom", "GB", EnumUserStatus.PENDING, 242495),
    createUser("Russia", "RU", EnumUserStatus.CREATED, 17098246),
    createUser("Nigeria", "NG", EnumUserStatus.PENDING, 923768),
    createUser("Brazil", "BR", EnumUserStatus.CREATED, 8515767),
];

//caixa de dialogo
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const sourceSans3 = Source_Sans_3({ style: "normal", weight: "200", preload: false });

const UserManagment = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const [value, setValue] = useState(0);
    const [tableItems, setItems] = useState(admins);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                setItems(admins);
                break;
            case 1:
                setItems(authors);
                break;
            case 2:
                setItems(clients);
                break;
            default:
                setItems(admins);
                break;
        }
        console.log(newValue);
    };
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function getButtonAction(user: User, action: number): any {
        if (action == 3) {
            return <ArrowForwardIosIcon color="action" style={{ cursor: "pointer" }} onClick={handleClickOpen} />;
        }
        switch (user.status) {
            case EnumUserStatus.PENDING:
                /*return <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={8}>
                            <Button variant="contained" color="success">
                                Aprovar
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Button variant="contained" color="error">
                                Recusar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>*/
                return action == 1 ? (
                    <Button variant="contained" color="success">
                        Aprovar
                    </Button>
                ) : (
                    <Button variant="contained" color="error">
                        Recusar
                    </Button>
                );
            case EnumUserStatus.CREATED:
                /*return <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={8}>
                            <Button variant="contained" color="error">
                                Bloquear
                            </Button>
                        </Grid>
                    </Grid>
                </Box>*/
                return action == 1 ? (
                    <></>
                ) : (
                    <Button variant="contained" color="error">
                        Bloquear
                    </Button>
                );
            default:
                return <></>;
            /*<Button variant="contained" color="success">
                    Desbloquear
                </Button>;*/
        }
    }
    return (
        <>
            <React.Fragment>
                <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Modal title
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
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                            risus, porta ac consectetur ac, vestibulum at eros.
                        </Typography>
                        <Typography gutterBottom>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
                            faucibus dolor auctor.
                        </Typography>
                        <Typography gutterBottom>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec
                            sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Save changes
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>
            <Typography
                sx={{
                    fontSize: 32,
                    color: theme.palette.darker.main,
                    alignItems: "center",
                    marginTop: "1%",
                    display: "flex",
                    textTransform: "uppercase",
                }}
                variant="h1"
                className={sourceSans3.className}
            >
                Usuários
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    margin: "0% -10% 0% 4%",
                    maxWidth: "90%",
                    with: "80%",
                    justifyContent: "left",
                    height: "75%",
                    flexGrow: 1,
                }}
            >
                <Tabs value={value} scrollButtons={false} onChange={handleChange} TabIndicatorProps={{ style: { display: "none" } }}>
                    <Tab
                        label="Admin"
                        sx={{
                            borderRadius: "0px 0 0 0", // Ajuste os valores conforme necessário
                        }}
                    />
                    <Tab
                        label="Autores"
                        sx={{
                            borderRadius: "0 0px 0 0", // Ajuste os valores conforme necessário
                        }}
                    />
                    <Tab
                        label="Clientes"
                        sx={{
                            borderRadius: "0px 0 0 0", // Ajuste os valores conforme necessário
                        }}
                    />
                </Tabs>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: "85%" }}>
                        <Table stickyHeader size="small" aria-label="sticky table">
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
                                {tableItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tableItem) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={tableItem.id}>
                                            {columns.map((column) => {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id === "acao1"
                                                            ? getButtonAction(tableItem, 1)
                                                            : column.id === "acao2"
                                                            ? getButtonAction(tableItem, 2)
                                                            : column.id === "acao3"
                                                            ? getButtonAction(tableItem, 3)
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
                        count={admins.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </>
    );
};

export default UserManagment;
