import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import SigninForm from '../components/signin/SigninForm';

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SigninContainer>
        <SigninInnerContainer>
          <Typography
            color="white"
            fontFamily="fantasy"
            textAlign="center"
            variant="h2"
          >
            <i>KHS</i>
          </Typography>
          <Typography
            color="white"
            mb={3}
            fontFamily="fantasy"
            textAlign="center"
            variant="h5"
          >
            Laboratory Information System
          </Typography>
          <SigninForm />
        </SigninInnerContainer>
      </SigninContainer>
    </ThemeProvider>
  );
};
export default SigninPage;
