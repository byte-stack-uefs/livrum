"use client";

import Link from "next/link";
import { SetStateAction, useState } from "react";
import { theme } from '@/app/theme';
import AccountHeader from "./AccountHeader";
import { Person, Search, ShoppingCart } from "@mui/icons-material";
import { Badge, Box, Button, ClickAwayListener, Container, Fade, FormControl, Grid, Grow, IconButton, InputAdornment, Menu, MenuItem, MenuList, OutlinedInput, Paper, Popper, Select, SelectChangeEvent, Toolbar, Typography} from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useCart } from "../(public)/carrinho/useCart";
import React from "react";

export function TopMain() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //const [open, setOpen] = useState<HTMLButtonElement | null>(null);
    // const [open, setOpen] = useState(false);
    // const anchorRef = React.useRef<HTMLButtonElement>(null);

    const [category, setCategory] = useState('all');
    const { cartTotalQnt} = useCart();
    const [numCartItems, setNumCartItems] = useState(0);

    // const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) =>{
    //     setOpen(e.currentTarget);
    // }

    // const handleToggle = () => {
    //     setOpen((prevOpen) => !prevOpen);
    //   };
    
    // const handleClose = (event: Event | React.SyntheticEvent) => {
    // if (
    //     anchorRef.current &&
    //     anchorRef.current.contains(event.target as HTMLElement)
    // ) {
    //     return;
    // }

    // setOpen(false);
    // };

    // function handleListKeyDown(event: React.KeyboardEvent) {
    //     if (event.key === 'Tab') {
    //       event.preventDefault();
    //       setOpen(false);
    //     } else if (event.key === 'Escape') {
    //       setOpen(false);
    //     }
    // }

    // const prevOpen = React.useRef(open);
    // React.useEffect(() => {
    //     if (prevOpen.current === true && open === false) {
    //     anchorRef.current!.focus();
    //     }

    //     prevOpen.current = open;
    // }, [open]);

    function handleChange(event: SelectChangeEvent) {
        setCategory(event.target.value as string);
    }

    const categories = [
        {
            title: 'Todos',
            value: 'all'
        },
        {
            title: 'Aventura',
            value: 'aventura'
        },
        {
            title: "Comédia",
            value: 'comedia'
        }
    ];

    const searchSelect = (<InputAdornment position="start">
        <Select
            size="small"
            value={category}
            onChange={handleChange}
            sx={
                {
                    border: 'none',
                    borderRadius: 8,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderLeft: 0,
                    width: '150px'
                }
            }
        >
            {categories.map((e) => {
                return <MenuItem key={e.value} value={e.value}>
                    {e.title}
                </MenuItem>
            })}
        </Select>
    </InputAdornment>);

    return (
        <Container maxWidth={false}>
            <Toolbar sx={{ textTransform: "uppercase" }}>

                <Grid container sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Grid item sm={3}>
                        <Link href="/" style={{ display: 'flex', justifyContent: 'space-evenly', textDecoration: 'none' }}>
                            <AccountHeader logoScale={0.17} fontSize={42} />
                        </Link>
                    </Grid>
                    <Grid item sm={4} md={7}>
                        <FormControl fullWidth>
                            <OutlinedInput
                                size="small"
                                sx={{ paddingLeft: 0, borderRadius: 8, backgroundColor: '#F4F2F2' }}
                                startAdornment={searchSelect}
                                endAdornment={<InputAdornment position="end">
                                    <Search />
                                </InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={4} md={2} sx={{ display: 'inline', justifyContent: 'space-evenly', px:2 }} >
                        <Link href="/carrinho">
                            <Tooltip title="Ver carrinho" arrow
                            slotProps={{
                                popper: {
                                  sx: {
                                    [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                                      {
                                        marginTop: '0px',
                                      }
                                  },
                                },
                              }}
                              >
                                <Badge anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }} badgeContent={cartTotalQnt} color="primary">
                                    <ShoppingCart sx={{ fontSize: 40 }} color="darker" />
                                </Badge>
                            </Tooltip>
                        </Link>
                        
                        <Button
                            id="fade-button"
                            sx={{ ml: 4 }}
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <Person sx={{ fontSize: 40 }} color="darker" />
                        </Button>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                            'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <Link href={"/carrinho"} underline= "none" sx={{ textDecoration: 'none' }}>
                                <MenuItem onClick={handleClose}>Meus Dados</MenuItem>
                            </Link>
                            <Link href={"/credit-card"}> 
                                <MenuItem onClick={handleClose}>Meus Cartões</MenuItem>
                            </Link>
                            <Link href={"/library"}> 
                                <MenuItem onClick={handleClose}>Biblioteca</MenuItem>
                            </Link>
                            <Link href={"/account/logout"}> 
                                <MenuItem onClick={handleClose}>Sair</MenuItem>
                            </Link>
                        </Menu>
                    </Grid>
                </Grid>

            </Toolbar>
        </Container>
    );
}

export function TopSecond(props: { pros: Array<any>; }) {
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
