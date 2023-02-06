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

import { ReadablePatient } from '../../services/types';
import OrderTable from './OrderTable';

const PrescriptionForm: React.FC<{ patient: ReadablePatient | undefined }> = ({
  patient,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startTime = useMemo<number>(() => Date.now(), [patient]);
  const [during, setDuring] = useState<string>('00:00');

  const age = useMemo(() => {
    if (patient) {
      return (
        new Date(
          new Date().getTime() - new Date(patient.patientBirth).getTime(),
        ).getFullYear() - 1970
      );
    }
    return undefined;
  }, [patient]);

  useEffect(() => {
    setDuring('00:00');
    const interval = setInterval(() => {
      const seconds = parseInt(
        new Date(Date.now() - startTime).getSeconds().toFixed(),
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
  }, [startTime]);

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
              {patient ? '새 진료기록' : <Skeleton width={120} />}
            </Typography>
            <Stack direction="column" alignItems="start">
              <Stack
                direction="row"
                mr={2}
                alignItems="center"
                justifyContent="start"
                spacing={1}
              >
                {patient ? (
                  <AccessTimeIcon />
                ) : (
                  <Skeleton width={24} height={24} variant="circular" />
                )}
                <Typography fontSize={24} fontFamily="digital-clock-font">
                  {patient ? during : <Skeleton width={120} />}
                </Typography>
              </Stack>
              <Typography fontSize={12} textAlign="end" mr={2}>
                {patient ? (
                  '진료 시작: ' + new Date(startTime).toLocaleString()
                ) : (
                  <Skeleton width={120} />
                )}
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="subtitle1" ml={2} mb={1}>
            {patient ? '환자 정보' : <Skeleton width={120} />}
          </Typography>
          <Stack direction="row" spacing={2} px={1} mb={2}>
            <Box width={100}>
              {patient ? (
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="차트번호"
                  disabled
                  value={patient.patientNo.toString().padStart(6, '0')}
                />
              ) : (
                <Skeleton variant="rounded" height={40} />
              )}
            </Box>
            <Box flexGrow={1}>
              {patient ? (
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="성명"
                  disabled
                  value={patient.patientName}
                />
              ) : (
                <Skeleton variant="rounded" height={40} />
              )}
            </Box>
            <Box width={80}>
              {patient ? (
                <TextField
                  fullWidth
                  type="text"
                  size="small"
                  disabled
                  label="나이"
                  value={age + ' 세'}
                />
              ) : (
                <Skeleton variant="rounded" height={40} />
              )}
            </Box>
            <Box width={60}>
              {patient ? (
                <TextField
                  fullWidth
                  type="text"
                  size="small"
                  label="성별"
                  disabled
                  value={patient ? (patient.patientMale ? '남' : '여') : ''}
                />
              ) : (
                <Skeleton variant="rounded" height={40} />
              )}
            </Box>
            <Box width={120}>
              {patient ? (
                <TextField
                  fullWidth
                  type="text"
                  size="small"
                  label="생년월일"
                  disabled
                  value={patient ? patient.patientBirth : ''}
                />
              ) : (
                <Skeleton variant="rounded" height={40} />
              )}
            </Box>
          </Stack>
          <Typography variant="subtitle1" ml={2}>
            {patient ? '처방 목록' : <Skeleton width={120} />}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <OrderTable disabled={patient === undefined} />
          </Box>
          {patient ? (
            <Button variant="contained" sx={{ mr: 1, alignSelf: 'end' }}>
              진료기록 제출
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
        {patient ? null : (
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
            <AlertTitle>안내</AlertTitle>
            진료할 환자가 선택되지 않았습니다. —{' '}
            <strong>환자를 선택하면 바로 진료가 시작됩니다.</strong>
          </Alert>
        )}
      </Box>
    </Paper>
  );
};
export default PrescriptionForm;
