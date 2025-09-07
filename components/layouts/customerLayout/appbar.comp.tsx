'use client'
import * as React from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Avatar, Badge, Button, CircularProgress, Container, Divider, Drawer, Icon, Menu, MenuItem, TextField, Tooltip } from '@mui/material';
import { BuildingStorefrontIcon, PowerIcon, UserIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { HomeIcon, ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { HomeIcon as SoildHomeIcon, ShoppingBagIcon as SoildShoppingBagIcon, ShoppingCartIcon as SoildSoildShoppingBagIcon } from "@heroicons/react/24/solid";

import { usePathname, useRouter } from 'next/navigation';
import { ButtonBase } from '@/components/button/button-base.comp';
import { brand } from '@/base/ui/themePrimitive';
import { Bars3Icon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from '@/base/store';
import { getUserSessionThunk } from '@/base/store/thunks/user.thunk';
import { ButtonIconText } from '@/components/button/buton-iconText.comp';
import { useMutation } from '@tanstack/react-query';
import { authApis } from '@/base/apis/auth.api';
import { showAlertError } from '@/base/ui/toaster';
import { clearSession } from '@/base/store/slices/session.slice';
import Link from 'next/link';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    boxShadow: 'none',
}));


export interface AppbarProps {
    menu: { title: string, href: string }[]
    // open: boolean;
    // onToggleLeftTool: (open: boolean) => void;
}
type MenuType = { title: string; href: string; outlineIcon: any, solidIcon: any, badge?: boolean }

const menus: MenuType[] = [
    {
        title: 'Giỏ hàng',
        outlineIcon: <ShoppingCartIcon height={26} width={26} />,
        solidIcon: <SoildShoppingBagIcon height={26} width={26} />,
        href: '/cart',
        badge: true,
    },
    {
        title: 'Đơn hàng',
        outlineIcon: <ShoppingBagIcon height={26} width={26} />,
        solidIcon: <SoildSoildShoppingBagIcon height={26} width={26} />,
        href: '/order',
        badge: true,
    },
]
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));
export default function Appbar(props: AppbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const theme = useTheme();
    const dispatch = useDispatch()
    const dispatchAsync = useAppDispatch()
    const { loggedIn, user } = useSelector((state: RootState) => state.session)
    const { loading, item: userInfo } = useAppSelector((state: RootState) => state.user)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { products: cartItems } = useSelector((state: RootState) => state.cartLocal)
    const { products: orderItems, status } = useSelector((state: RootState) => state.order)

    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        if (loggedIn && user.userId) {
            dispatchAsync(getUserSessionThunk(user.userId))
        }
    }, [loggedIn])
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    // const handleMenuOpen = React.useCallback(() => {
    //     props.onToggleLeftTool(!props.open);
    // }, [props.open, props.onToggleLeftTool]);

    const { mutate, isPending } = useMutation({
        mutationFn: authApis.logout,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
    });
    const logout = () => {
        dispatch(clearSession())
        mutate()
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const getBadgeContent = (href: string) => {
        switch (href) {
            case '/cart': return cartItems?.length
            case '/order': {
                if (status === 'Pending')
                    return orderItems?.length
                return undefined
            }

            default: return;
        }
    }
    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px))',
                zIndex: theme.zIndex.drawer + 1,
                mb: 2

            }}
        >
            <StyledToolbar variant="dense" disableGutters>
                <Container>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 0 }}>
                        {/* logo */}
                        <Stack component={Link} href={'/'} direction="row" alignItems="center" justifyContent={'center'}>
                            <Icon sx={{ justifyContent: 'center', alignContent: 'center', color: 'goldenrod', height: 30, width: 30 }} >
                                <BuildingStorefrontIcon height={30} width={30} />
                            </Icon>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: (theme.vars ?? theme).palette.primary.main,
                                    fontWeight: '700',
                                    m: 1,
                                    whiteSpace: 'nowrap',
                                    lineHeight: 1,
                                }}
                            >
                                {'Len Store'}
                            </Typography>
                        </Stack>
                        {/* right */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, columnGap: 0.5 }}>
                            {props.menu?.map((item, index) => (
                                <ButtonBase
                                    key={index}
                                    component={Link} href={item.href}
                                    sx={{
                                        backgroundColor: pathname.split('/')?.[1] === item.href.split('/')?.[1] ? brand[50] : "",
                                        transition: "transform 120ms ease",
                                        "&:hover": { transform: "scale(1.05)" },
                                    }}
                                >
                                    {item.title}
                                </ButtonBase>
                            ))}
                            {menus?.map((item, index) => (
                                <Tooltip key={index} title={item.title} placement="right">
                                    <IconButton
                                        onClick={() => router.push(item.href)} sx={{
                                            border: 'none',
                                            borderRadius: 2,
                                            background: pathname === item.href ? brand[50] : 'transparent',
                                        }}>
                                        <Badge badgeContent={getBadgeContent(item.href)} invisible={!item.badge} color="error">
                                            {pathname === item.href ? item.solidIcon : item.outlineIcon}
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                            ))}
                            {/* <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    gap: 1,
                                    alignItems: 'center',
                                    marginX: 1
                                }}
                            >
                                <TextField placeholder='Tìm kiếm...' />
                            </Box> */}
                            {loggedIn ?
                                <Stack direction="row" alignItems="center" display={{ xs: 'none', md: 'flex' }}>
                                    <Tooltip title="Open menu">
                                        <IconButton onClick={handleMenu} size='large' sx={{ p: 0 }}>
                                            <Avatar
                                                alt={'example'}
                                                src=""
                                                sx={{ width: 40, height: 40, margin: "0 auto" }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {!loading ?
                                            <Box>
                                                <Stack padding={1} spacing={1} direction={'row'} alignItems={'center'}>
                                                    <Avatar sizes='small' >A</Avatar>
                                                    <Stack >
                                                        <Typography variant='body1'>{userInfo.fullName}</Typography>
                                                        <Typography variant='caption' color='textSecondary'>{userInfo.email}</Typography>
                                                    </Stack>

                                                </Stack>
                                                <MenuItem onClick={() => router.push('/admin/profile')}>
                                                    <ButtonIconText buttonProps={{ variant: 'text', color: 'inherit' }} iconComp={<UserIcon />} title='Profile' />
                                                </MenuItem>
                                                <MenuItem onClick={logout}>
                                                    <ButtonIconText buttonProps={{ loading: isPending, variant: 'text', color: 'inherit' }} iconComp={<PowerIcon />} title='Logout' />
                                                </MenuItem>
                                            </Box> : <CircularProgress />
                                        }
                                    </Menu>
                                </Stack>
                                : <Box
                                    sx={{
                                        display: { xs: 'none', md: 'flex' },
                                        gap: 2,
                                        alignItems: 'center', ml: 1
                                    }}
                                >
                                    <Button color="primary" variant="outlined" >
                                        Đăng nhập
                                    </Button>
                                    <Button color="primary" variant="contained" >
                                        Đăng ký
                                    </Button>
                                </Box>}
                        </Box >

                        {/* mobile */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                            <IconButton aria-label="Menu button" onClick={toggleDrawer(!open)}>
                                <Icon>{open ? <XMarkIcon /> : <Bars3Icon />}</Icon>
                            </IconButton>
                            <Drawer
                                anchor="top"
                                open={open}
                                onClose={toggleDrawer(false)}
                                PaperProps={{
                                    sx: {
                                        top: 'var(--template-frame-height, 0px)',
                                    },
                                }}
                            >
                                <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                    <Toolbar />
                                    {(props.menu)?.map((item, index) => (<MenuItem key={index}
                                        onClick={() => router.push(item.href)}
                                        sx={{ backgroundColor: pathname.split('/')?.[1] === item.href.split('/')?.[1] ? brand[50] : "", }} >
                                        {item.title}
                                    </MenuItem>))}
                                    <Divider />
                                    {menus?.map((item, index) => (
                                        <MenuItem
                                            key={index} sx={{ backgroundColor: pathname === item.href ? brand[50] : "", }}
                                            onClick={() => router.push(item.href)}>
                                            <Stack alignContent={'space-between'} direction={'row'} alignItems={'center'}>
                                                <ButtonIconText
                                                    buttonProps={{ variant: 'text', color: 'inherit' }}
                                                    iconComp={pathname === item.href ? item.solidIcon : item.outlineIcon}
                                                    title={item.title}

                                                />
                                                <Typography>{getBadgeContent((item.href))}</Typography>
                                            </Stack>
                                        </MenuItem>
                                    ))}


                                    <Divider sx={{ my: 3 }} />
                                    <MenuItem>
                                        <Button color="primary" variant="contained" fullWidth>
                                            Đăng ký
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button color="primary" variant="outlined" fullWidth>
                                            Đăng nhập
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                    </Box>





                </Container>
            </StyledToolbar>
        </AppBar>
    );
}