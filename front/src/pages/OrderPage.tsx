import PatientPicker from '../components/order/PatientPicker';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, Stack, Box } from '@mui/material';
import PrescriptionForm from '../components/order/PrescriptionForm';
import { useState } from 'react';
import { Patient } from '../services/types';
import PrescriptionPicker from '../components/order/PrescriptionPicker';

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
      <Stack
        height="100%"
        direction="row"
        alignItems="stretch"
        spacing={1}
        m={1}
      >
        <PatientPicker
          onSelected={(item) => {
            setSelected(item);
          }}
        />
        <PrescriptionPicker />
        <PrescriptionForm patient={selected} />
      </Stack>
    </ThemeProvider>
  );
};
export default OrderPage;
