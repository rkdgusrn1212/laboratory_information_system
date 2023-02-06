import { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import PrescriptionForm from '../components/order/PrescriptionForm';
import { ReadablePatient } from '../services/types';
import PrescriptionPicker from '../components/order/PrescriptionPicker';
import PatientPicker from '../components/order/PatientPicker';

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
  const [selected, setSelected] = useState<ReadablePatient | undefined>(
    undefined,
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        height="100%"
        width="100%"
        direction="row"
        alignItems="stretch"
        spacing={1}
      >
        <Box flexGrow={1}>
          <PatientPicker
            onSelected={(item) => {
              setSelected(item);
            }}
          />
        </Box>
        <Box flexGrow={2}>
          <PrescriptionForm patient={selected} />
        </Box>
        <Box flexGrow={1}>
          <PrescriptionPicker />
        </Box>
      </Stack>
    </ThemeProvider>
  );
};
export default OrderPage;
