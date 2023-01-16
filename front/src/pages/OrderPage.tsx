import PatientPicker from '../components/order/PatientPicker';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import PrescriptionForm from '../components/order/PrescriptionForm';

const theme = createTheme({
  palette: {
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

const OrderPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container gap={1} sx={{ p: 1, height: '100vh' }}>
        <Grid item sx={{ height: '100%' }}>
          <PatientPicker
            onSelected={(item) => {
              alert(JSON.stringify(item));
            }}
          />
        </Grid>
        <Grid item>{/* <PrescriptionForm patient={null} /> */}</Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default OrderPage;
