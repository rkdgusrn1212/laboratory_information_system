import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PatientPickerInput from './PatientPickerInput';
import PatientPickerList from './PatientPickerList';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Patient } from '../../services/types';
import { autoBatchEnhancer } from '@reduxjs/toolkit';
import { Stack } from '@mui/material';

const dummyPatient = [
  {
    no: 'P0001',
    name: '강현구',
    rnn: '951111-1234567',
    birth: new Date('1995-11-11'),
    male: true,
    image: null,
  },
  {
    no: 'P0002',
    name: '류진',
    rnn: '960808-2134567',
    birth: new Date('1996-08-08'),
    male: false,
    image: null,
  },
  {
    no: 'P0003',
    name: '김동신',
    rnn: '960303-1313131',
    birth: new Date('1996-03-03'),
    male: true,
    image: null,
  },
];

const PatientPicker: React.FC<{
  onSelected: (patient: Patient) => void;
}> = ({ onSelected }) => {
  return (
    <Paper
      sx={{
        height: '100%',
        py: 3,
        minWidth: 400,
      }}
    >
      <Stack
        alignItems="stretch"
        justifyContent="start"
        flexDirection="column"
        height="100%"
        gap={2}
      >
        <Typography variant="h6" ml={3}>
          환자 선택
        </Typography>
        <PatientPickerInput />
        <Box sx={{ flexGrow: 1, overflowY: 'scroll' }}>
          <Box sx={{ minHeight: 0, px: 1 }}>
            <PatientPickerList onSelected={onSelected} data={dummyPatient} />
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};
export default PatientPicker;
