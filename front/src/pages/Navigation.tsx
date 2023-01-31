import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from '../components/navigation/TopBar';
import SideDrawer from '../components/navigation/SideDrawer';
import { useAppSelector } from '../hooks';
import { selectAccount } from '../services/accountSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toolbar } from '@mui/material';

export const drawerWidth = 240;

const Navigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const account = useAppSelector(selectAccount);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account?.principal.staffVo) {
      navigate('/', { replace: true });
      return;
    }
  }, [account, navigate]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar position="fixed" open={open} onOpenIconClick={handleDrawerOpen} />
      <SideDrawer open={open} onCloseIconClick={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar variant="dense" />
        <Outlet />
      </Box>
    </Box>
  );
};
export default Navigation;
