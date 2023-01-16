import { useCallback, FormEventHandler, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Patient } from '../../services/types';

const PrescriptionForm: React.FC<{ patient: Patient | null }> = ({
  patient,
}) => {
  const handleSubmit: FormEventHandler = useCallback((event) => {
    event.preventDefault();
    return null;
  }, []);
  const age = useMemo(() => {
    if (patient) {
      return (
        new Date(new Date().getTime() - patient.birth.getTime()).getFullYear() -
        1970
      );
    }
    return 0;
  }, [patient]);
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5">처방</Typography>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">처방 환자</Typography>
          </Grid>
          <Grid item xs={1}>
            <TextField
              size="small"
              type="text"
              label="환자번호"
              disabled
              value={patient?.no}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              type="text"
              label="성명"
              disabled
              value={patient?.name}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
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
          <Grid item xs={1}>
            <TextField
              type="text"
              size="small"
              label="성별"
              disabled
              value={patient?.male ? '남' : '여'}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              type="text"
              size="small"
              label="주민번호"
              disabled
              value={patient?.rnn}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">검사 오더</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
export default PrescriptionForm;
