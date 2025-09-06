'use client'
import * as React from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button, Container, Divider, Drawer, Icon, MenuItem, TextField } from '@mui/material';
import {  BuildingStorefrontIcon, ChevronDoubleDownIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { usePathname, useRouter } from 'next/navigation';
import { ButtonBase } from '@/components/button/button-base.comp';
import { brand } from '@/base/ui/themePrimitive';
import { Bars3Icon, ChevronDoubleUpIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    boxShadow: 'none',
}));


export interface AppbarProps {
    menu: { title: string, href: string }[]
    open: boolean;
  onToggleLeftTool: (open: boolean) => void;
}

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
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
      const handleMenuOpen = React.useCallback(() => {
        props.onToggleLeftTool(!props.open);
      }, [props.open, props.onToggleLeftTool]);
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
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 0 }}>
                    <Stack direction="row" alignItems="center" justifyContent={'center'}>
                    <IconButton
                        onClick={handleMenuOpen} size="large" sx={{
                            border: 'none',
                            borderRadius: 2,
                            background: 'transparent',
                        }}>
                        <Bars3Icon height={26} width={26} />
                    </IconButton>
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
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {props.menu?.map((item, index) => (
                            <ButtonBase
                                key={index}
                                onClick={() => router.push(item.href)}
                                sx={{
                                    ml: 1,
                                    backgroundColor: pathname.startsWith(item.href.replace("/all", "")) ? brand[50] : "",
                                    transition: "transform 120ms ease",
                                    "&:hover": { transform: "scale(1.05)" },
                                }}
                            >
                                {item.title}
                            </ButtonBase>
                        ))}
                    </Box >
                </Box>
                <Box
                    sx={{
                        display: { xs: 'flex', md: 'flex' },
                        gap: 1,
                        alignItems: 'center',
                        marginX: 1
                    }}
                >
                    <TextField placeholder='Tìm kiếm...' />
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        gap: 1,
                        alignItems: 'center',
                    }}
                >
                    <Button color="primary" variant="outlined" size="small">
                        Đăng nhập
                    </Button>
                    <Button color="primary" variant="contained" size="small">
                        Đăng ký
                    </Button>
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                    <IconButton aria-label="Menu button" onClick={toggleDrawer(!open)}>
                        <Icon>{open ? <XMarkIcon /> : <ChevronUpDownIcon />}</Icon>
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
                            {props.menu?.map((item, index) => (<MenuItem key={index}
                                onClick={() => router.push(item.href)}
                                sx={{
                                    ml: 1,
                                    backgroundColor: pathname.startsWith(item.href.replace("/all", "")) ? brand[50] : "",
                                }} >
                                {item.title}
                            </MenuItem>))}


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
            </StyledToolbar>
        </AppBar>
    );
}