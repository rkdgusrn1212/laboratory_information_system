import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PatientPickerInput from './PatientPickerInput';
import PatientPickerList from './PatientPickerList';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { ReactEventHandler } from 'react';
import { Patient } from '../../services/types';

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
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5">환자 선택</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PatientPickerInput />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <PatientPickerList onSelected={onSelected} data={dummyPatient} />
    </Paper>
  );
};
export default PatientPicker;
