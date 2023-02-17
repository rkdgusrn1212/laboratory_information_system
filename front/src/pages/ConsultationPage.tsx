import { forwardRef, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';

import PrescriptionForm from '../components/consultation/PrescriptionForm';
import PrescriptionPicker from '../components/consultation/PrescriptionPicker';
import ConsultationReceptionPicker from '../components/consultation/ConsultationPicker';
import { ConsultationReception } from '../services/types';

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

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConsultationPage: React.FC = () => {
  const [selected, setSelected] = useState<ConsultationReception | undefined>(
    undefined,
  );
  const [dialog, setDialog] = useState<{
    open: boolean;
    data: ConsultationReception | undefined;
  }>({
    open: false,
    data: undefined,
  });

  const handleSelected = (item: ConsultationReception | undefined) => {
    if (item === undefined || (selected !== undefined && selected !== item)) {
      setDialog({ open: true, data: item });
    } else {
      setSelected(item);
    }
  };

  const handleAccept = () => {
    setSelected(dialog.data);
    setDialog({ open: false, data: undefined });
  };

  const handleClose = () => {
    setDialog({ open: false, data: undefined });
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ height: '100%', py: 1 }}>
        <Stack
          height="100%"
          width="100%"
          direction="row"
          alignItems="stretch"
          spacing={1}
        >
          <Box flexGrow={1}>
            <ConsultationReceptionPicker
              onSelected={handleSelected}
              selected={selected}
            />
          </Box>
          <Box
            flexGrow={2}
            style={{
              transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <PrescriptionForm patient={undefined} />
          </Box>
          <Box flexGrow={1}>
            <PrescriptionPicker />
          </Box>
        </Stack>
        <Dialog
          open={dialog.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'현재 진료중인 환자가 있습니다'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              현재 진료중인 환자가 있습니다. 진료중인 기록을 제출하거나,
              초기화하고 진행할 수 있습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleAccept}>초기화</Button>
            <Button onClick={handleAccept}>제출</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};
export default ConsultationPage;
