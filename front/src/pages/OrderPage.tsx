import PatientPicker from '../components/order/PatientPicker';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import PrescriptionForm from '../components/order/PrescriptionForm';
import { useState } from 'react';
import { Patient } from '../services/types';

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
  const [selected, setSelected] = useState<Patient | null>(null);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container height={'100vh'} spacing={1} sx={{ p: 1 }}>
        <Grid item xs={12} md={6} xl={3} sx={{ height: '100%' }}>
          <PatientPicker
            onSelected={(item) => {
              setSelected(item);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={9}>
          <PrescriptionForm patient={selected} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default OrderPage;
