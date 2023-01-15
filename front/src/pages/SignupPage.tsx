import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
  },
});

const SignupPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <SignupForm />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="body2">이미 계정이 있으신가요?</Typography>
          <Link href="/signup" variant="body2">
            로그인하기
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignupPage;
