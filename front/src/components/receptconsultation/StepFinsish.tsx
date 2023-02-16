import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { Doctor, Patient } from '../../services/types';

const StepFinish: React.FC<{
  patient: Patient;
  doctor: Doctor;
  onReset: () => void;
}> = ({ patient, doctor, onReset }) => {
  return (
    <Stack alignItems="end">
      <Typography my={2} variant="h4" textAlign="start" width="100%">
        <b>{patient.patientName}</b>님,
      </Typography>
      <Typography variant="h5" textAlign="start" width="100%">
        <b>{doctor.staffName}</b>선생님에 대한 진료가 접수되었습니다.
      </Typography>
      <Button
        sx={{ mt: 4, mb: 2 }}
        color="secondary"
        onClick={onReset}
        variant="contained"
        size="small"
      >
        처음 화면으로 돌아가기
      </Button>
    </Stack>
  );
};
export default StepFinish;
