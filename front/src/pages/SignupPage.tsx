import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
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
      default: '#B0BEC5',
    },
  },
});

const SignupPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            width: '100%',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '80px',
          }}
        >
          <SignupForm />
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default SignupPage;
