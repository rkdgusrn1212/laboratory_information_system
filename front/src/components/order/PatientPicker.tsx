import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PatientPickerList from './PatientPickerList';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';

import { ReadablePatient } from '../../services/types';
import { useState } from 'react';

const dummyPatient = [
  {
    patientNo: 'P0001',
    patientName: '강현구',
    patientBirth: '1995-11-11',
    patientMale: true,
  },
  {
    patientNo: 'P0002',
    patientName: '류진',
    patientBirth: '1996-08-08',
    patientMale: false,
  },
  {
    patientNo: 'P0003',
    patientName: '김동신',
    patientBirth: '1996-03-03',
    patientMale: true,
  },
  {
    patientNo: 'P0004',
    patientName: '김덕배',
    patientBirth: '1995-03-13',
    patientMale: true,
  },
  {
    patientNo: 'P0005',
    patientName: '이춘식',
    patientBirth: '1996-02-12',
    patientMale: false,
  },
  {
    patientNo: 'P0006',
    patientName: '김만식',
    patientBirth: '1996-09-09',
    patientMale: true,
  },
];

const dummyReception = [
  {
    receptionNo: 'RC0001',
    time: new Date(),
    patient: 'P0001',
  },
  {
    receptionNo: 'R0002',
    time: new Date(),
    patient: 'P0002',
  },
  {
    receptionNo: 'R0003',
    time: new Date(),
    patient: 'P0005',
  },
];

const dummyReservation = [
  {
    reservationNo: 'RS0001',
    time: new Date(),
    patient: 'P0003',
  },
  {
    reservationNo: 'RS0002',
    time: new Date(),
    patient: 'P0004',
  },
  {
    reservationNo: 'RS0003',
    time: new Date(),
    patient: 'P0006',
  },
];

const PatientPicker: React.FC<{
  onSelected: (patient: ReadablePatient) => void;
}> = ({ onSelected }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="대기 환자" />
            <Tab label="예약 환자" />
          </Tabs>
        </Box>
        {tabValue === 0 ? (
          <Box sx={{ flexGrow: 1, overflowY: 'scroll' }}>
            <Box sx={{ minHeight: 0, px: 1 }}>
              <PatientPickerList onSelected={onSelected} data={dummyPatient} />
            </Box>
          </Box>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, overflowY: 'scroll' }}>
              <Box sx={{ minHeight: 0, px: 1 }}>
                <PatientPickerList
                  onSelected={onSelected}
                  data={dummyPatient}
                />
              </Box>
            </Box>
          </>
        )}
      </Stack>
    </Paper>
  );
};
export default PatientPicker;
