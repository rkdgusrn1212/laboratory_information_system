import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material';
import Container from '@mui/material/Container';
import SignupForm from '../components/signup/SignupForm';
import { useAppDispatch } from '../hooks';

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
      default: '#B0BEC5',
    },
  },
});

const SignupPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          width: '100%',
          mt: 5,
          mb: 5,
        }}
      >
        <SignupForm />
      </Container>
    </ThemeProvider>
  );
};
export default SignupPage;
