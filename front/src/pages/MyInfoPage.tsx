import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../hooks';
import { selectAccount } from '../services/accountSlice';
import MyInfoForm from '../components/myinfo/MyInfoForm';
import { Staff } from '../services/types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#69dbff',
      main: '#00aaff',
      dark: '#007bcb',
      contrastText: '#fff',
    },
    secondary: {
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f',
      contrastText: '#fff',
    },
    background: {
      paper: '#FAFAFA',
    },
  },
});

const MyInfoPage = () => {
  const account = useAppSelector(selectAccount);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account || !account.principal.staffVo) {
      navigate('/', { replace: true });
      return;
    }
  }, [account, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        position="fixed"
        width="100%"
        height="100%"
        sx={{
          background:
            'linear-gradient(180deg,rgba(255,255,255,1) 80%, rgba(0,170,255,1) 100%)',
        }}
      >
        <Container component="main" maxWidth="md">
          {account?.principal.staffVo && (
            <MyInfoForm staff={account.principal.staffVo} />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default MyInfoPage;
