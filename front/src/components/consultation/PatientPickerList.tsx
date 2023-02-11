import { useState, useCallback, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import {
  isArray,
  isPatientReception,
  PatientReception,
  PatientReservation,
  ReadablePatient,
} from '../../services/types';
import stringAvatar from '../../utils/stringAvatar';
import dayjs from 'dayjs';

export type PatientPickerListProps = {
  onSelected: (patient: ReadablePatient | undefined) => void;
  selected: ReadablePatient | undefined;
  data: PatientReception[] | PatientReservation[];
};

const PatientPickerList: React.FC<PatientPickerListProps> = ({
  onSelected,
  data,
  selected,
}) => {
  const isReceptionData = useMemo(
    () => isArray<PatientReception>(data, isPatientReception),
    [data],
  );

  return (
    <Stack gap={1}>
      {data.map((item) => {
        const patient = item.patient;
        const age =
          new Date(
            new Date().getTime() - new Date(patient.patientBirth).getTime(),
          ).getFullYear() - 1970;
        return (
          <Card
            key={patient.patientNo}
            elevation={2}
            sx={{
              background:
                patient.patientNo === selected?.patientNo
                  ? 'linear-gradient(to right, #69dbff, #9198e5)'
                  : 'white',
            }}
          >
            <CardActionArea
              onClick={() => {
                onSelected(patient);
              }}
              sx={{ px: 2, py: 1 }}
            >
              <Stack direction="row" alignItems="center">
                <Avatar
                  color="white"
                  {...stringAvatar(patient.patientName, 40)}
                />
                <Stack flexGrow={1} mx={2} alignItems="stretch">
                  <Stack direction="row" justifyContent={'space-between'}>
                    <Typography fontSize={10}>
                      <small>
                        {'차트번호 : ' +
                          patient.patientNo.toString().padStart(6, '0')}
                      </small>
                    </Typography>
                    <Typography fontSize={10} textOverflow="ellipsis">
                      <small>
                        {(isReceptionData ? '접수시간 : ' : '예약시간 : ') +
                          (isReceptionData
                            ? (item as PatientReception).receptionTime
                            : dayjs(
                                (item as PatientReservation).reservationTime,
                              ).format('HH:mm:ss'))}
                      </small>
                    </Typography>
                  </Stack>
                  <Stack direction="row" flexGrow={1} spacing={1}>
                    <Typography flexGrow={1} variant="body1" fontWeight="bold">
                      {patient.patientName}
                    </Typography>
                    <Typography variant="body1">
                      <small>{age}세</small>
                    </Typography>
                    <Typography variant="body1">
                      <small>{patient.patientMale ? '남' : '여'}</small>
                    </Typography>
                    <Typography variant="body1">
                      <small>{patient.patientBirth}</small>
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardActionArea>
          </Card>
        );
      })}
    </Stack>
  );
};
export default PatientPickerList;