"use client";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { theme } from "@/app/theme";
import createUser, { EnumUserStatus, User } from "@/app/User";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TabSelector } from "@/app/components/TabSelector";
import { CreditCard } from "@mui/icons-material";
import useRequest from "@/app/services/requester";

interface Column {
    id: "name" | "status" | "acao1" | "acao2" | "acao3";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: "name", label: "Nome", minWidth: 200, align: "left" },
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
const requester = useRequest();

//caixa de dialogo
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {},
    "& .MuiDialogActions-root": {},
}));

const UserManagment = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openUser, setOpenUser] = useState({});

    const [admins, setAdmins] = useState(null);
    const [authors, setAuthors] = useState(null);
    const [clients, setClients] = useState(null);
    const [tableItems, setItems] = useState(admins);
    const [tab, setTab] = useState(0);

    const getAllAdmins = () => {
        return requester.get("/user/admins").then((response) => {
            setAdmins(response.data);
            setItems(response.data);
        });
    };

    const getAllAuthors = () => {
        return requester.get("/user/authors").then((response) => {
            setAuthors(response.data);
            setItems(response.data);
        });
    };

    const getAllClients = () => {
        return requester.get("/user/customers").then((response) => {
            setClients(response.data);
            setItems(response.data);
        });
    };

    const getAllUsers = async () => {
        await getAllClients();
        await getAllAuthors();
        await getAllAdmins();
    };

    if (!admins || !authors || !clients) {
        getAllUsers();
    }

    const handleClickOpen = (user: any) => {
        setOpenDialog(true);
        setOpenUser(user);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleChange = (event: any, newValue: number) => {
        setTab(newValue);
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

    const updateUser = (user, body) => {
        requester
            .patch(`/user/${user.idUsuario}`, body)
            .then((response) => {
                switch (tab) {
                    case 0:
                        getAllAdmins();
                        break;
                    case 1:
                        getAllAuthors();
                        break;
                    case 2:
                        getAllClients();
                        break;
                    default:
                        getAllUsers();
                }
            })
            .catch((err) => {})
            .finally(() => {});
    };

    const approveUser = (user) => {
        updateUser(user, {
            status: "active",
        });
    };
    const refuseUser = (user) => {
        updateUser(user, {
            status: "inactive",
        });
    };
    const blockUser = (user) => {
        updateUser(user, {
            status: "blocked",
        });
    };
    const reactiveUser = (user) => {
        updateUser(user, {
            status: "active",
        });
    };

    function getButtonAction(user: User, action: number): any {
        if (user.super) {
            return <></>;
        }
        //setOpenUser(user);
        if (action == 3) {
            return <ArrowForwardIosIcon color="action" style={{ cursor: "pointer" }} onClick={() => handleClickOpen(user)} />;
        }
        switch (user.status) {
            case EnumUserStatus.PENDING:
                return action == 1 ? (
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={() => {
                            approveUser(user);
                        }}
                    >
                        Aprovar
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => {
                            refuseUser(user);
                        }}
                    >
                        Recusar
                    </Button>
                );
            case EnumUserStatus.ACTIVE:
                return action == 1 ? (
                    <></>
                ) : (
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => {
                            blockUser(user);
                        }}
                    >
                        Bloquear
                    </Button>
                );
            case EnumUserStatus.BLOCKED:
                return action == 2 ? (
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={() => {
                            reactiveUser(user);
                        }}
                    >
                        Reativar
                    </Button>
                ) : (
                    <></>
                );
            default:
                return <></>;
        }
    }

    const tabOptions = [
        {
            title: "Admin",
        },
        {
            title: "Autores",
        },
        {
            title: "Clientes",
        },
    ];

    return (
        <>
            <React.Fragment>
                <BootstrapDialog maxWidth="sm" fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ fontSize: 20, textAlign: "left" }}>
                        Informações Detalhadas
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
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="dark.main">
                                    <strong>Nome:</strong> {openUser.name}
                                </Typography>
                                <Typography variant="body2" color="dark.main">
                                    <strong>Email:</strong> {openUser.email}
                                </Typography>
                                {openUser.type == "CLIENTE" || openUser.type == "AUTOR" ? (
                                    <Typography variant="body2" color="dark.main">
                                        <strong>Data de Nascimento:</strong> {"dataNascimento"}
                                    </Typography>
                                ) : (
                                    <></>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                {openUser.type == "CLIENTE" ? (
                                    <Typography variant="body2" color="dark.main">
                                        <strong>Telefone:</strong> {openUser.phone}
                                    </Typography>
                                ) : (
                                    <></>
                                )}
                                {openUser.type == "CLIENTE" || openUser.type == "AUTOR" ? (
                                    <Typography variant="body2" color="dark.main">
                                        <strong>CPF:</strong> {openUser.cpf}
                                    </Typography>
                                ) : (
                                    <></>
                                )}

                                {openUser.type == "CLIENTE" || openUser.type == "AUTOR" ? (
                                    <Typography variant="body2" color="dark.main">
                                        <strong>Endereço:</strong> {openUser.address}
                                    </Typography>
                                ) : (
                                    <></>
                                )}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} sx={{ backgroundColor: "#D95D56", color: "black" }}>
                            Fechar
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>
            <Typography
                sx={{
                    fontSize: 32,
                    alignItems: "center",
                    marginTop: "1%",
                    display: "flex",
                    textTransform: "uppercase",
                }}
                color="darker.main"
                variant="h1"
            >
                Usuários
            </Typography>
            <Box>
                <TabSelector
                    items={tabOptions}
                    def={0}
                    onChange={(e) => {
                        handleChange(null, e);
                    }}
                />
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: "100%" }}>
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
                                {tableItems ? (
                                    tableItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tableItem) => {
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
                                    })
                                ) : (
                                    <TableRow style={{ textAlign: "center" }}>
                                        <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                                            <CircularProgress />
                                            <div>Por favor, aguarde</div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={tableItems ? tableItems.length : 0}
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
