import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, Box } from '@mui/material';
import Container from '@mui/material/Container';
import SignupForm from '../components/signup/SignupForm';

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
      default: '#ff6b42',
    },
  },
});

const SignupPage = () => {
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
          <SignupForm />
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default SignupPage;
