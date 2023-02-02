import PatientPicker from '../components/order/PatientPicker';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, Stack, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import PrescriptionForm from '../components/order/PrescriptionForm';
import { useState } from 'react';
import { Patient } from '../services/types';
import { Box } from '@mui/system';
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
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        gap={1}
        height="100%"
      >
        <Stack
          direction="column"
          justifyContent="start"
          alignItems="stretch"
          gap={1}
        >
          <Box sx={{ flexGrow: 1, height: 100 }}>
            <PatientPicker
              onSelected={(item) => {
                setSelected(item);
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, height: 100 }}>
            <PrescriptionPicker />
          </Box>
        </Stack>
        <PrescriptionForm patient={selected} />
      </Stack>
    </ThemeProvider>
  );
};
export default OrderPage;
