import { useEffect, useMemo, useState } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Patient } from '../../services/types';
import OrderTable from './OrderTable';

const PrescriptionForm: React.FC<{ patient: Patient | null }> = ({
  patient,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startTime = useMemo<number>(() => Date.now(), [patient]);
  const [during, setDuring] = useState<string>('00:00');

  const age = useMemo(() => {
    if (patient) {
      return (
        new Date(new Date().getTime() - patient.birth.getTime()).getFullYear() -
        1970
      );
    }
    return '';
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
      <Stack direction="column" justifyContent="start" alignItems="stretch">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Typography variant="h6" ml={3} mb={2}>
            새 진료기록 작성
          </Typography>{' '}
          <Stack direction="column" alignItems="start">
            <Stack
              direction="row"
              mr={2}
              alignItems="center"
              justifyContent="start"
              spacing={1}
            >
              <AccessTimeIcon />
              <Typography fontSize={24} fontFamily="digital-clock-font">
                {during}
              </Typography>
            </Stack>
            <Typography fontSize={12} textAlign="end" mr={2}>
              {'진료 시작: ' + new Date(startTime).toLocaleString()}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="subtitle1" ml={2} mb={1}>
          환자 정보
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={1} px={1} mb={2}>
          <Grid item xs={3} xl={1}>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="환자번호"
              disabled
              value={patient ? patient.no : ''}
            />
          </Grid>
          <Grid item xs={9} xl={3.5}>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="성명"
              disabled
              value={patient ? patient.name : ''}
            />
          </Grid>
          <Grid item xs={4} xl={1.5}>
            <TextField
              fullWidth
              type="number"
              size="small"
              disabled
              label="나이"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">만</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">세</InputAdornment>
                ),
              }}
              value={age}
            />
          </Grid>
          <Grid item xs={2} xl={1}>
            <TextField
              fullWidth
              type="text"
              size="small"
              label="성별"
              disabled
              value={patient ? (patient.male ? '남' : '여') : ''}
            />
          </Grid>
          <Grid item xs={6} xl={5}>
            <TextField
              fullWidth
              type="text"
              size="small"
              label="주민번호"
              disabled
              value={patient ? patient.rnn : ''}
            />
          </Grid>
        </Grid>
        <Typography variant="subtitle1" ml={2}>
          처방 목록
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <OrderTable />
        </Box>
        <Button variant="contained" sx={{ mr: 1, alignSelf: 'end' }}>
          진료기록 저장
        </Button>
      </Stack>
    </Paper>
  );
};
export default PrescriptionForm;
