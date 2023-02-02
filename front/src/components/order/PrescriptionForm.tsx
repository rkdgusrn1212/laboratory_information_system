import { useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Patient } from '../../services/types';
import OrderTable from './OrderTable';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';

const PrescriptionForm: React.FC<{ patient: Patient | null }> = ({
  patient,
}) => {
  const age = useMemo(() => {
    if (patient) {
      return (
        new Date(new Date().getTime() - patient.birth.getTime()).getFullYear() -
        1970
      );
    }
    return '';
  }, [patient]);
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box>
        <Typography variant="h6">처방</Typography>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 5, mb: 2 }}>
              처방 환자
            </Typography>
          </Grid>
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
        <Stack rowGap={1}>
          <Typography variant="subtitle1" sx={{ mt: 5, mb: 2 }}>
            처방 등록
          </Typography>
          <Box sx={{ height: 'auto' }}>
            <OrderTable />
          </Box>
          <Button fullWidth variant="contained">
            저장
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
export default PrescriptionForm;
