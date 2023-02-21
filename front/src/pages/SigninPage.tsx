import { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import styled from '@emotion/styled';
import SigninForm from '../components/signin/SigninForm';
import Logo from '../components/common/Logo';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { selectAccount } from '../services/accountSlice';

const theme = createTheme({
  palette: {
    mode: 'dark',
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
  },
});

const SigninContainer = styled.div`
  background-image: url('/images/main_bg.jpg');
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
`;

const SigninInnerContainer = styled.div`
  background: #000000aa;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 80px;
`;

const SigninPage = () => {
  const account = useAppSelector(selectAccount);
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      switch (account.principal.authorities[0]) {
        case 'ROLE_NURSE':
          navigate('/collection', { replace: true });
          break;
        case 'ROLE_DOCTOR':
          navigate('/consultation', { replace: true });
          break;
        default:
          navigate('/signup', { replace: true });
          break;
      }
    }
  }, [account, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SigninContainer>
        <SigninInnerContainer>
          <Logo size={60} />
          <SigninForm />
        </SigninInnerContainer>
      </SigninContainer>
    </ThemeProvider>
  );
};
export default SigninPage;
