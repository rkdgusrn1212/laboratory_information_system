import { useCallback, FormEventHandler, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Patient } from '../../services/types';

const PrescriptionForm: React.FC<{ patient: Patient }> = ({ patient }) => {
  const handleSubmit: FormEventHandler = useCallback((event) => {
    event.preventDefault();
    return null;
  }, []);
  const age = useMemo(
    () =>
      new Date(new Date().getTime() - patient.birth.getTime()).getFullYear() -
      1970,
    [patient],
  );
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={2}>
          <TextField label="환자번호" value={patient.no} />
        </Grid>
        <Grid item xs={2}>
          <TextField label="환자성명" value={patient.name} />
        </Grid>
        <Grid item xs={2}>
          <TextField label="환자나이" value={'만 ' + age + '세'} />
        </Grid>
        <Grid item xs={2}>
          <TextField label="환자나이" value={patient.male ? '남' : '여'} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="환자나이" value={patient.rnn} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default PrescriptionForm;
