import { useEffect, useMemo, useState } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';

import {
  Consultation,
  ConsultationReception,
  Patient,
  Prescription,
} from '../../services/types';
import OrderTable from './OrderTable';
import { useLazyReadPatientByPatientNoQuery } from '../../services/patientApi';
import { useCreatePrescriptionOrderMutation } from '../../services/prescriptionOrderApi';
import { useCreateConsultationMutation } from '../../services/consultationApi';
import dayjs from 'dayjs';

const ConsultationForm: React.FC<{
  consultationReception: ConsultationReception | undefined;
  prescriptionList: Prescription[];
  // eslint-disable-next-line no-unused-vars
  onPrescriptionListChanged: (prescriptionList: Prescription[]) => void;
  onResetPrescription: () => void;
  onSubmitSuccess: () => void;
}> = ({
  consultationReception,
  prescriptionList,
  onPrescriptionListChanged,
  onResetPrescription,
  onSubmitSuccess,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [during, setDuring] = useState<string>('00:00');
  const [readPatientById, readPatientByPatientIdResult] =
    useLazyReadPatientByPatientNoQuery({
      pollingInterval: 20000,
    });
  const [createConsultation, createConsultationResult] =
    useCreateConsultationMutation();
  const [createPrescriptionOrder] = useCreatePrescriptionOrderMutation();
  const [status, setStatus] = useState<
    'NONE' | 'LOADING' | 'WRITING' | 'SUBMITING'
  >('NONE');
  const [open, setOpen] = useState({ status: false, isSuccess: false });

  useEffect(() => {
    if (consultationReception) {
      setStatus('LOADING');
      readPatientById(consultationReception.patientNo)
        .unwrap()
        .then(() => {
          createConsultation({
            consultationReceptionNo:
              consultationReception.consultationReceptionNo,
          })
            .unwrap()
            .then(() => {
              setStatus('WRITING');
            });
        });
    } else {
      setStatus('NONE');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultationReception]);

  useEffect(() => {
    if (createConsultationResult.data) {
      onResetPrescription();
      setDuring('00:00');
      const interval = setInterval(() => {
        const seconds = dayjs(Date.now()).diff(
          dayjs(
            (createConsultationResult.data as Consultation).consultationTime,
          ),
          'second',
        );
        setDuring(
          `${(seconds / 60).toFixed().padStart(2, '0')}:${(seconds % 60)
            .toString()
            .padStart(2, '0')}`,
        );
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createConsultationResult.data]);

  const handleSubmitClick = () => {
    if (status === 'WRITING') {
      setStatus('SUBMITING');
      createPrescriptionOrder(
        prescriptionList.map((prescription) => ({
          consultationNo: (createConsultationResult.data as Consultation)
            .consultationNo,
          prescriptionCode: prescription.prescriptionCode,
        })),
      )
        .then(() => {
          setStatus('NONE');
          onSubmitSuccess();
          setOpen({ status: true, isSuccess: true });
        })
        .catch(() => {
          setStatus('WRITING');
          setOpen({ status: true, isSuccess: false });
        });
    }
  };

  const patientForm = useMemo(
    () => (
      <Stack direction="row" spacing={2} px={1} mb={2}>
        <Box width={100}>
          {status === 'WRITING' ? (
            <TextField
              fullWidth
              size="small"
              type="text"
              label="????????????"
              disabled
              value={(readPatientByPatientIdResult.data as Patient).patientNo
                .toString()
                .padStart(6, '0')}
            />
          ) : (
            <Skeleton variant="rounded" height={40} />
          )}
        </Box>
        <Box flexGrow={1}>
          {status === 'WRITING' ? (
            <TextField
              fullWidth
              size="small"
              type="text"
              label="??????"
              disabled
              value={(readPatientByPatientIdResult.data as Patient).patientName}
            />
          ) : (
            <Skeleton variant="rounded" height={40} />
          )}
        </Box>
        <Box width={80}>
          {status === 'WRITING' ? (
            <TextField
              fullWidth
              type="text"
              size="small"
              disabled
              label="??????"
              value={
                (
                  new Date(
                    new Date().getTime() -
                      new Date(
                        (
                          readPatientByPatientIdResult.data as Patient
                        ).patientBirth,
                      ).getTime(),
                  ).getFullYear() - 1970
                ).toString() + ' ???'
              }
            />
          ) : (
            <Skeleton variant="rounded" height={40} />
          )}
        </Box>
        <Box width={60}>
          {status === 'WRITING' ? (
            <TextField
              fullWidth
              type="text"
              size="small"
              label="??????"
              disabled
              value={
                status === 'WRITING'
                  ? (readPatientByPatientIdResult.data as Patient).patientMale
                    ? '???'
                    : '???'
                  : ''
              }
            />
          ) : (
            <Skeleton variant="rounded" height={40} />
          )}
        </Box>
        <Box width={120}>
          {status === 'WRITING' ? (
            <TextField
              fullWidth
              type="text"
              size="small"
              label="????????????"
              disabled
              value={
                status === 'WRITING'
                  ? (readPatientByPatientIdResult.data as Patient).patientBirth
                  : ''
              }
            />
          ) : (
            <Skeleton variant="rounded" height={40} />
          )}
        </Box>
      </Stack>
    ),
    [readPatientByPatientIdResult.data, status],
  );

  const orderTable = useMemo(
    () => (
      <OrderTable
        prescriptionList={prescriptionList}
        disabled={status !== 'WRITING'}
        onPrescriptionListChanged={onPrescriptionListChanged}
      />
    ),
    [prescriptionList, status, onPrescriptionListChanged],
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({ ...open, status: false });
  };

  return (
    <Paper elevation={2} sx={{ py: 3, height: '100%' }}>
      <Box position="relative" height="100%">
        <Stack
          direction="column"
          height="100%"
          justifyContent="start"
          alignItems="stretch"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
          >
            <Typography variant="h6" ml={3} mb={2}>
              {status === 'WRITING' ? (
                '??? ???????????? (no:' +
                (
                  createConsultationResult.data as Consultation
                ).consultationNo.toString() +
                ')'
              ) : (
                <Skeleton width={120} />
              )}
            </Typography>
            <Stack direction="column" alignItems="start">
              <Stack
                direction="row"
                mr={2}
                alignItems="center"
                justifyContent="start"
                spacing={1}
              >
                {status === 'WRITING' ? (
                  <AccessTimeIcon />
                ) : (
                  <Skeleton width={24} height={24} variant="circular" />
                )}
                <Typography fontSize={24} fontFamily="digital-clock-font">
                  {status === 'WRITING' ? during : <Skeleton width={120} />}
                </Typography>
              </Stack>
              <Typography fontSize={12} textAlign="end" mr={2}>
                {status === 'WRITING' ? (
                  '?????? ??????: ' +
                  new Date(
                    (
                      createConsultationResult.data as Consultation
                    ).consultationTime,
                  ).toLocaleString()
                ) : (
                  <Skeleton width={120} />
                )}
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="subtitle1" ml={2} mb={1}>
            {status === 'WRITING' ? '?????? ??????' : <Skeleton width={120} />}
          </Typography>
          {patientForm}
          <Divider />
          <Typography variant="subtitle1" ml={2} mt={2}>
            {status === 'WRITING' ? '?????? ??????' : <Skeleton width={120} />}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>{orderTable}</Box>
          {status === 'WRITING' ? (
            <Button
              variant="contained"
              sx={{ mr: 1, alignSelf: 'end' }}
              onClick={handleSubmitClick}
            >
              ???????????? ??????
            </Button>
          ) : (
            <Skeleton
              variant="rounded"
              width={120}
              height={45}
              sx={{ mr: 1, alignSelf: 'end' }}
            />
          )}
        </Stack>
        {status === 'WRITING' ? null : (
          <Alert
            sx={{
              width: '80%',
              left: '50%',
              position: 'absolute',
              top: '30%',
              transform: 'translate(-50%,-50%)',
            }}
            severity="info"
          >
            <AlertTitle>??????</AlertTitle>
            ????????? ????????? ???????????? ???????????????. ???{' '}
            <strong>????????? ???????????? ?????? ????????? ???????????????.</strong>
          </Alert>
        )}
      </Box>
      <Snackbar
        open={open.status}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={open.isSuccess ? 'success' : 'warning'}
          sx={{ width: '100%' }}
        >
          {open.isSuccess
            ? '??????????????? ?????????????????????.'
            : '???????????? ????????? ?????????????????????.'}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
export default ConsultationForm;
