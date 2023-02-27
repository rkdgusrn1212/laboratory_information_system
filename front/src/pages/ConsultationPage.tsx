import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

import ConsultationForm from '../components/consultation/ConsultationForm';
import PrescriptionPicker from '../components/consultation/PrescriptionPicker';
import ConsultationReceptionPicker from '../components/consultation/ConsultationRecptionPicker';
import { ConsultationReception, Prescription } from '../services/types';
import SimplePrescriptionForm from '../components/consultation/SimplePrescriptionForm';
import { useAppSelector } from '../hooks';
import { selectAccount } from '../services/accountSlice';

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
  const [prescriptionList, setPrescriptionList] = useState<Prescription[]>([]);
  const account = useAppSelector(selectAccount);
  const navigate = useNavigate();

  useEffect(() => {
    if (account?.principal.authorities[0] !== 'ROLE_DOCTOR')
      navigate('/', { replace: true });
  }, [account?.principal.authorities, navigate]);

  const handlePrescriptionPick = (prescription: Prescription) => {
    for (const elem of prescriptionList) {
      if (elem.prescriptionCode === prescription.prescriptionCode) {
        return;
      }
    }
    setPrescriptionList([...prescriptionList, prescription]);
  };

  const handlePrescriptionListChanged = useCallback(
    (prescriptionList: Prescription[]) => {
      setPrescriptionList(prescriptionList);
    },
    [],
  );

  const handleResetPrescription = useCallback(() => {
    setPrescriptionList([]);
  }, []);

  const handleSelected = (item: ConsultationReception | undefined) => {
    if (
      item === undefined ||
      (selected !== undefined &&
        selected.consultationReceptionNo !== item.consultationReceptionNo)
    ) {
      setDialog({ open: true, data: item });
    } else {
      setSelected(item);
    }
  };

  const handleReset = () => {
    setSelected(dialog.data);
    setDialog({ open: false, data: undefined });
  };

  const handleClose = () => {
    setDialog({ open: false, data: undefined });
  };

  const handleSubmitSuccess = () => {
    setSelected(undefined);
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
            <ConsultationForm
              onSubmitSuccess={handleSubmitSuccess}
              consultationReception={selected}
              prescriptionList={prescriptionList}
              onPrescriptionListChanged={handlePrescriptionListChanged}
              onResetPrescription={handleResetPrescription}
            />
          </Box>
          <Stack flexGrow={1} spacing={1}>
            <Box height="50%">
              <PrescriptionPicker onPrescriptionPick={handlePrescriptionPick} />
            </Box>
            <Box flexGrow={1} overflow="scroll">
              <SimplePrescriptionForm />
            </Box>
          </Stack>
        </Stack>
        <Dialog
          open={dialog.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'진료를 취소하시겠습니까?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              진료기록 작성 중 취소하면. 진료여부는 서버에 기록되지만 오더는
              발생하지 않습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              돌아가기
            </Button>
            <Button variant="contained" onClick={handleReset}>
              진료 취소
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};
export default ConsultationPage;
