'use client'
import * as React from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Avatar, Badge, Button, CircularProgress, Container, Divider, Drawer, Icon, Menu, MenuItem, TextField, Tooltip, useScrollTrigger } from '@mui/material';
import { GiftTopIcon, PowerIcon, UserIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { HomeIcon, ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { HomeIcon as SoildHomeIcon, ShoppingBagIcon as SoildShoppingBagIcon, ShoppingCartIcon as SoildSoildShoppingBagIcon } from "@heroicons/react/24/solid";

import { usePathname, useRouter } from 'next/navigation';
import { ButtonBase } from '@/components/button/button-base.comp';
import { brand, gray } from '@/base/ui/themePrimitive';
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
}
type MenuType = { title: string; href: string; outlineIcon: any, solidIcon: any, badge?: boolean }

const menus: MenuType[] = [
    {
        title: 'Giỏ hàng',
        outlineIcon: <ShoppingCartIcon height={26} width={26} />,
        solidIcon: <SoildSoildShoppingBagIcon height={26} width={26} />,
        href: '/cart',
        badge: true,
    },
    {
        title: 'Đơn hàng',
        outlineIcon: <ShoppingBagIcon height={26} width={26} />,
        solidIcon: < SoildShoppingBagIcon height={26} width={26} />,
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
function ElevationScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 20, // scroll bao nhiêu px thì đổi màu
    });

    return React.cloneElement(children as React.ReactElement<any>, {
        sx: {
            backgroundColor: trigger ? "white" : "transparent",
            transition: "background-color 0.3s ease",
        },
        elevation: trigger ? 4 : 0,
    });
}
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

    const { mutate, isPending } = useMutation({
        mutationFn: authApis.logout,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
         onSuccess: (data) => {
              if (data)
              dispatch(clearSession())
            }
    });
    const logout = () => {
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
        <ElevationScroll >
            <AppBar
                position="fixed"
                enableColorOnDark
                sx={{
                    boxShadow: 0,
                    backgroundImage: 'none',
                    mt: 'calc(var(--template-frame-height, 0px))',
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <StyledToolbar variant="dense" disableGutters>
                    <Container>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 0 }}>
                            {/* logo */}
                            <Stack bgcolor={gray[50]} borderRadius={1} padding={1} component={Link} href={'/'} direction="row" alignItems="center" justifyContent={'center'}>
                                <Icon sx={{ justifyContent: 'center', alignContent: 'center', color: '#22D3EE', height: 24, width: 24 }} >
                                    <GiftTopIcon height={24} width={24} />
                                </Icon>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        background: "linear-gradient(135deg, #60A5FA, #22D3EE, #A78BFA)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        fontWeight: '700',
                                        whiteSpace: 'nowrap',
                                        lineHeight: 1,
                                    }}
                                >
                                    {'LenStore'}
                                </Typography>
                            </Stack>
                            {/* right */}
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, columnGap: 0.5 }}>
                                {props.menu?.map((item, index) => (
                                    <IconButton 
                                    key={index}
                                        size='small'
                                        onClick={() => router.push(item.href)} sx={{
                                            border: 'none',
                                            borderRadius: 2,
                                            bgcolor: 'transparent',
                                            transition: "transform 120ms ease",
                                            "&:hover": { transform: "scale(1.05)" },
                                        }}>
                                        <Typography variant='body2' color={pathname.split('/')?.[1] === item.href.split('/')?.[1] ? 'primary' : 'textPrimary'}>

                                            {item.title}
                                        </Typography>
                                    </IconButton>
                                ))}
                                {menus?.map((item, index) => (
                                    <IconButton key={index}
                                            onClick={() => router.push(item.href)} sx={{
                                                border: 'none',
                                                borderRadius: 2,
                                                ml: 1,
                                                bgcolor: 'transparent',
                                                transition: "transform 120ms ease",
                                                "&:hover": { transform: "scale(1.05)" },
                                            }}>
                                                <Tooltip key={index} title={item.title} placement="bottom">
                                            <Badge badgeContent={getBadgeContent(item.href)} invisible={!item.badge} color="error">
                                                <Typography variant='body2' color={pathname === item.href ? 'primary' : 'textPrimary'}>
                                                    {pathname === item.href ? item.solidIcon : item.outlineIcon}
                                                </Typography>
                                            </Badge>
                                    </Tooltip>
                                        </IconButton>
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
                                        <Button onClick={() => router.push('/login')} size='small' color="primary" variant="outlined" >
                                            Đăng nhập
                                        </Button>
                                        <Button onClick={() => router.push('/register')} size='small' color="primary" variant="contained" >
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
                                            <Button onClick={() => router.push('/register')} color="primary" variant="contained" fullWidth>
                                                Đăng ký
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button onClick={() => router.push('/login')} color="primary" variant="outlined" fullWidth>
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
        </ElevationScroll>
    );
}