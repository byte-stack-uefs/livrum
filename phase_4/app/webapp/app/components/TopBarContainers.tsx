"use client";

import Link from "next/link";
import { useState } from "react";
import { theme } from "@/app/theme";
import AccountHeader from "./AccountHeader";
import { Person, Search, ShoppingCart } from "@mui/icons-material";
import {
    Badge,
    Box,
    Button,
    Container,
    Fade,
    FormControl,
    Grid,
    InputAdornment,
    Menu,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Toolbar,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useCart } from "../(public)/carrinho/useCart";
import React from "react";
import LivrumLink from "./LivrumLink";
import { useUser } from "../context";
import Divider from "./Divider";
import { useRouter } from "next/navigation";

export function TopMain() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [category, setCategory] = useState("all");
    const { cartTotalQnt } = useCart();
    const [numCartItems, setNumCartItems] = useState(0);

    function handleChange(event: SelectChangeEvent) {
        setCategory(event.target.value as string);
    }

    const handleLogout = () => {};

    const categories = [
        {
            title: "Todos",
            value: "all",
        },
        {
            title: "Aventura",
            value: "aventura",
        },
        {
            title: "Comédia",
            value: "comedia",
        },
    ];

    const { user } = useUser();
    const router = useRouter();

    const searchSelect = (
        <InputAdornment position="start">
            <Select
                size="small"
                value={category}
                onChange={handleChange}
                sx={{
                    border: "none",
                    borderRadius: 8,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderLeft: 0,
                    width: "150px",
                }}
            >
                {categories.map((e) => {
                    return (
                        <MenuItem key={e.value} value={e.value}>
                            {e.title}
                        </MenuItem>
                    );
                })}
            </Select>
        </InputAdornment>
    );

    return (
        <Container maxWidth={false}>
            <Toolbar sx={{ textTransform: "uppercase" }}>
                <Grid container sx={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    <Grid item sm={3}>
                        <Link href="/" style={{ display: "flex", justifyContent: "space-evenly", textDecoration: "none" }}>
                            <AccountHeader logoScale={0.17} fontSize={42} />
                        </Link>
                    </Grid>
                    <Grid item sm={4} md={7}>
                        <FormControl fullWidth>
                            <OutlinedInput
                                size="small"
                                sx={{ paddingLeft: 0, borderRadius: 8, backgroundColor: "#F4F2F2" }}
                                startAdornment={searchSelect}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={4} md={2} sx={{ display: "inline", justifyContent: "space-evenly", px: 2 }}>
                        <Link href="/carrinho">
                            <Tooltip
                                title="Ver carrinho"
                                arrow
                                slotProps={{
                                    popper: {
                                        sx: {
                                            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
                                                marginTop: "0px",
                                            },
                                        },
                                    },
                                }}
                            >
                                <Badge
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    badgeContent={cartTotalQnt}
                                    color="primary"
                                >
                                    <ShoppingCart sx={{ fontSize: 40 }} color="darker" />
                                </Badge>
                            </Tooltip>
                        </Link>

                        {user.status == "" ? (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    router.push("/login");
                                }}
                            >
                                Fazer Login
                            </Button>
                        ) : (
                            <>
                                <Button
                                    id="fade-button"
                                    sx={{ ml: 4 }}
                                    aria-controls={open ? "fade-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                >
                                    <Person sx={{ fontSize: 40 }} color="darker" />
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "fade-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <div style={{ padding: "0.5rem", textAlign: "center" }}>{user.nome}</div>
                                    <Divider width="100%" height={0.1} />
                                    <MenuItem>
                                        <LivrumLink style={{ color: "black" }} href="/cliente/meus-dados">
                                            Meus Dados
                                        </LivrumLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <LivrumLink style={{ color: "black" }} href="/cliente/meus-cartoes">
                                            Meus Cartões
                                        </LivrumLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <LivrumLink style={{ color: "black" }} href="/cliente/biblioteca">
                                            Biblioteca
                                        </LivrumLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>Sair</MenuItem>
                                </Menu>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </Container>
    );
}

export function TopSecond(props: { pros: Array<any> }) {
    const { pros } = props;

    return (
        <Container sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, height: "3rem" }} maxWidth={false}>
            <Grid container sx={{ textAlign: "center", height: "100%" }}>
                {pros.map((e, idx) => {
                    return (
                        <Grid key={e} item xs={4} sx={{ paddingY: 1, alignSelf: "center" }}>
                            <Box sx={{ borderRight: idx != 2 ? "1px solid white" : "", height: "100%" }}>
                                <span>{e}</span>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}
