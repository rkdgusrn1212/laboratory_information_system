import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PatientPickerList from './PatientPickerList';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';

import { Doctor, Patient } from '../../services/types';
import { useState } from 'react';

const dummyPatient = [
  {
    patientNo: 1,
    patientName: '강현구',
    patientBirth: '1995-11-11',
    patientMale: true,
    patientPhone: '010-1234-5678',
    patientRrn: '951111-1●●●●●●',
  },
  {
    patientNo: 2,
    patientName: '류진',
    patientBirth: '1996-08-08',
    patientMale: false,
    patientPhone: '010-1234-5678',
    patientRrn: '960909-2●●●●●●',
  },
  {
    patientNo: 3,
    patientName: '김동신',
    patientBirth: '1996-03-03',
    patientMale: true,
    patientPhone: '010-1234-5678',
    patientRrn: '960303-1●●●●●●',
  },
  {
    patientNo: 4,
    patientName: '김덕배',
    patientBirth: '1995-03-13',
    patientMale: true,
    patientPhone: '010-1234-5678',
    patientRrn: '950313-1●●●●●●',
  },
  {
    patientNo: 5,
    patientName: '이춘자',
    patientBirth: '1996-02-12',
    patientMale: false,
    patientPhone: '010-1234-5678',
    patientRrn: '960212-2●●●●●●',
  },
  {
    patientNo: 6,
    patientName: '김만식',
    patientBirth: '1976-09-09',
    patientMale: true,
    patientPhone: '010-1234-5678',
    patientRrn: '760909-1●●●●●●',
  },
];

const dummyDoctor: Doctor = {
  staffNo: 1,
  staffName: '김덕철',
  staffImage: null,
  staffMale: true,
  staffBirth: '1988-06-21',
  staffRrn: '880621-1●●●●●●',
  staffPhone: '010-2577-2577',
  staffAdmitted: true,
  staffType: 1,
  departmentCode: 'NS',
  doctorCertification: 38463,
};

const dummyReception = [
  {
    consultationReceptionNo: 1,
    consultationReceptionTime: new Date().toJSON(),
    consultationWalkInNo: 34,
    consultation: null,
    doctor: dummyDoctor,
    patient: dummyPatient[0],
  },
  {
    consultationReceptionNo: 3,
    consultationReceptionTime: new Date().toJSON(),
    consultationWalkInNo: 35,
    consultation: null,
    doctor: dummyDoctor,
    patient: dummyPatient[1],
  },
  {
    consultationReceptionNo: 4,
    consultationReceptionTime: new Date().toJSON(),
    consultationWalkInNo: 36,
    consultation: null,
    doctor: dummyDoctor,
    patient: dummyPatient[4],
  },
];

const dummyReservation = [
  {
    consultationReceptionNo: 2,
    consultationReceptionTime: new Date().toJSON(),
    consultationAppointmentTime: new Date().toJSON(),
    consultation: null,
    doctor: dummyDoctor,
    patient: dummyPatient[2],
  },
  {
    consultationReceptionNo: 5,
    consultationReceptionTime: new Date().toJSON(),
    consultationAppointmentTime: new Date().toJSON(),
    consultation: null,
    doctor: dummyDoctor,
    patient: dummyPatient[3],
  },
  {
    consultationReceptionNo: 6,
    consultationReceptionTime: new Date().toJSON(),
    consultationAppointmentTime: new Date().toJSON(),
    consultation: null,
    doctor: dummyDoctor,
    patient: dummyPatient[5],
  },
];

const PatientPicker: React.FC<{
  // eslint-disable-next-line no-unused-vars
  onSelected: (patient: Patient | undefined) => void;
  selected: Patient | undefined;
}> = ({ onSelected, selected }) => {
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
              <PatientPickerList
                onSelected={onSelected}
                data={dummyReception}
                selected={selected}
              />
            </Box>
          </Box>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, overflowY: 'scroll' }}>
              <Box sx={{ minHeight: 0, px: 1 }}>
                <PatientPickerList
                  onSelected={onSelected}
                  data={dummyReservation}
                  selected={selected}
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
