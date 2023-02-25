import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import styled from '@mui/material/styles/styled';

import { drawerWidth } from '../../pages/Navigation';
import Logo from '../common/Logo';
import stringAvatar from '../../utils/stringAvatar';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAccount, signout } from '../../services/accountSlice';
import { Tab, Tabs } from '@mui/material';

const pages = ['진료', '채혈', '검사'];
const settings = ['내 정보 수정', '로그아웃'];

export interface TopBarProps extends AppBarProps {
  open?: boolean;
  onOpenIconClick: React.MouseEventHandler<HTMLButtonElement>;
}

const TopBar: React.FC<TopBarProps> = ({ open, onOpenIconClick, ...props }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [pageNum, setPageNum] = useState<number>(0);
  const staff = useAppSelector(selectAccount)?.principal.staffVo;
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    switch (location.pathname.split('/')[1]) {
      case 'consultation':
        setPageNum(0);
        break;
      case 'collection':
        setPageNum(1);
        break;
      case 'test':
        setPageNum(2);
        break;
      default:
        setPageNum(0);
    }
  }, [location, dispatch]);

  const handlePageChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number,
  ) => {
    switch (value) {
      case 0:
        navigate('consultation');
        break;
      case 1:
        navigate('collection');
        break;
      case 2:
        navigate('test');
        break;
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting?: string) => () => {
    setAnchorElUser(null);
    if (setting === '로그아웃') {
      dispatch(signout());
    } else if (setting === '내 정보 수정') {
      navigate('/my-info');
    }
  };

  return (
    <AppBar {...props}>
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense">
          <Box sx={{ display: 'flex' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onOpenIconClick}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 3,
            }}
          >
            <Logo
              size={20}
              sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}
            />
          </Box>
          <Tabs
            sx={{ flexGrow: 1 }}
            textColor="inherit"
            indicatorColor="secondary"
            onChange={handlePageChange}
            value={pageNum}
          >
            {pages.map((page) => (
              <Tab key={page} label={page} />
            ))}
          </Tabs>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="계정 관리">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {staff &&
                  (staff.staffImage ? (
                    <Avatar
                      sx={{ width: 36, height: 36 }}
                      alt={staff.staffName}
                      src={staff.staffImage}
                    />
                  ) : (
                    <Avatar {...stringAvatar(staff.staffName, 36)} />
                  ))}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu()}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default styled(TopBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<TopBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
