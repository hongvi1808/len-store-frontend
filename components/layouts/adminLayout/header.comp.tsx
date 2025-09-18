'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Avatar, CircularProgress, Icon, Link, Menu, MenuItem, Skeleton } from '@mui/material';
import { Bars3Icon, ChevronDoubleLeftIcon, PowerIcon, UserIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { showAlertError } from '@/base/ui/toaster';
import { ButtonIconText } from '../../button/buton-iconText.comp';
import { authApis } from '@/base/apis/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { clearSession } from '@/base/store/slices/session.slice';
import { RootState, useAppDispatch, useAppSelector } from '@/base/store';
import { getUserSessionThunk } from '@/base/store/thunks/user.thunk';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 0.5,
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled('div')({
  position: 'relative',
  height: 40,
  display: 'flex',
  alignItems: 'center',
  '& img': {
    maxHeight: 40,
  },
});

export interface HeaderProps {
  logo?: React.ReactNode;
  title?: string;
  menuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
}

export default function Header({
  logo,
  title,
  menuOpen,
  onToggleMenu,
}: HeaderProps) {
  const router = useRouter();
  const theme = useTheme();
  const { loggedIn, user } = useSelector((state: RootState) => state.session)
  const { loading, item: userInfo } = useAppSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const dispatchAsync = useAppDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: authApis.logout,
    onError: (error) => {
      console.error('Error calling api:', error);
      showAlertError(error.message)
    },
    onSuccess: (data) => {
      if (data)
        dispatch(clearSession())
      router.push('/admin/login')
    }
  });
  // React.useEffect(() => {
  //   if (loggedIn && user.userId) {
  //     dispatchAsync(getUserSessionThunk(user.userId))
  //   }
  // }, [loggedIn])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuOpen = React.useCallback(() => {
    onToggleMenu(!menuOpen);
  }, [menuOpen, onToggleMenu]);

  const getMenuIcon = React.useCallback(
    (isExpanded: boolean) => {
      const expandMenuActionText = 'Expand';
      const collapseMenuActionText = 'Collapse';

      return (
        <Tooltip
          title={`${isExpanded ? collapseMenuActionText : expandMenuActionText} menu`}
          enterDelay={1000}
        >
          <div>
            <IconButton
              size="small"
              aria-label={`${isExpanded ? collapseMenuActionText : expandMenuActionText} navigation menu`}
              onClick={handleMenuOpen}
            >
              {!isExpanded ? <Icon sx={{ justifyContent: 'center', alignContent: 'center' }} >
                <Bars3Icon color="primary" />
              </Icon>
                : <Icon sx={{ justifyContent: 'center', alignContent: 'center' }} >
                  <ChevronDoubleLeftIcon color="primary" />
                </Icon>}
            </IconButton>
          </div>
        </Tooltip>
      );
    },
    [handleMenuOpen],
  );
  const logout = () => {
    mutate()
  }
  return (
    <AppBar color="inherit" position="absolute" sx={{ displayPrint: 'none' }}>
      <Toolbar sx={{ backgroundColor: 'inherit', }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center">
            <Box sx={{ mr: 1 }}>{getMenuIcon(menuOpen)}</Box>
            <Link style={{ textDecoration: 'none' }}>
              <Stack direction="row" alignItems="center">
                {logo ? <LogoContainer>{logo}</LogoContainer> : null}
                {title ? (
                  <Typography
                    variant="h6"
                    sx={{
                      color: (theme.vars ?? theme).palette.primary.main,
                      fontWeight: '700',
                      ml: 1,
                      whiteSpace: 'nowrap',
                      lineHeight: 1,
                    }}
                  >
                    {title}
                  </Typography>
                ) : null}
              </Stack>
            </Link>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Open menu">
              <IconButton onClick={handleMenu} size='large' sx={{ p: 0, border: 0, bgcolor: 'transparent' }}>
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
        </Stack>
      </Toolbar>
    </AppBar>
  );
}