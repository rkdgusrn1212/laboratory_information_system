import { ChangeEvent, useState } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Paper from '@mui/material/Paper';
import { Avatar, Button, TextField, Typography } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  ReadDoctorListWithDepartmentResponse,
  useReadDoctorListWithDepartmentQuery,
} from '../../services/doctorApi';
import stringAvatar from '../../utils/stringAvatar';
import { Department, Doctor, Patient } from '../../services/types';
import { useCreateConsultationWalkInMutation } from '../../services/consultationReceptionApi';
import { useCreateConsultationAppointmentMutation } from '../../services/consultationReceptionApi';
import { Dayjs } from 'dayjs';

const RenderRow: React.FC<
  ListChildComponentProps<{
    data: ReadDoctorListWithDepartmentResponse;
    // eslint-disable-next-line no-unused-vars
    handleClickItem: (doctor: Doctor & Department) => void;
    // eslint-disable-next-line no-unused-vars
    handleClickAppointmentItem: (doctor: Doctor & Department) => void;
  }>
> = ({
  index,
  style,
  data: { data, handleClickItem, handleClickAppointmentItem },
}) => {
  return (
    <ListItem style={style} component="div" key={data[index].staffNo}>
      <Paper sx={{ width: '100%' }} elevation={5}>
        <Box
          height={60}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          {data[index].staffImage ? (
            <Avatar
              alt={data[index].staffImage as string}
              src={data[index].staffImage as string}
              sx={{ width: 40, height: 40 }}
            />
          ) : (
            <Avatar {...stringAvatar(data[index].staffName, 40)}></Avatar>
          )}
          <Box
            mx={1}
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            width={300}
          >
            <Typography variant="h6" fontFamily="cafe-surround">
              {data[index].staffName}
              <small> 선생님</small>
            </Typography>
            <Typography variant="subtitle1" fontFamily="cafe-surround">
              {data[index].departmentName}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: 90, mr: 1 }}
              onClick={() => handleClickItem(data[index])}
            >
              대기
              <ListAltIcon />
            </Button>
            <Button
              onClick={() => handleClickAppointmentItem(data[index])}
              variant="contained"
              sx={{ width: 90 }}
            >
              예약
              <ScheduleIcon />
            </Button>
          </Box>
        </Box>
      </Paper>
    </ListItem>
  );
};

const StepSelectDoctor: React.FC<{
  // eslint-disable-next-line no-unused-vars
  onSuccess: (data: { doctor: Doctor & Department }) => void;
  onException: () => void;
  patient: Patient;
}> = ({ patient, onSuccess, onException }) => {
  const doctorListWithDepartment = useReadDoctorListWithDepartmentQuery({
    pageSize: 100,
    pageStart: 0,
  }).data;
  const [createConsultationWalkIn] = useCreateConsultationWalkInMutation();
  const [createConsultationAppointment] =
    useCreateConsultationAppointmentMutation();
  const [open, setOpen] = useState<{
    state: boolean;
    data: (Doctor & Department) | null;
  }>({ state: false, data: null });
  const [time, setTime] = useState<Dayjs | null>(null);

  const handleClickItem = (doctor: Doctor & Department) => {
    createConsultationWalkIn({
      staffNo: doctor.staffNo,
      patientNo: patient.patientNo,
    })
      .unwrap()
      .then(() => onSuccess({ doctor }))
      .catch(() => onException());
  };

  const handleClickAppointmentItem = (doctor: Doctor & Department) => {
    setTime(null);
    setOpen({ state: true, data: doctor });
  };

  const handleClose = () => {
    setOpen((prev) => ({ ...prev, state: false }));
  };

  const handleSubmit = () => {
    createConsultationAppointment({
      staffNo: (open.data as Doctor & Department).staffNo,
      patientNo: patient.patientNo,
      consultationReceptionAppointment: time?.toJSON() as string,
    })
      .unwrap()
      .then(() => onSuccess({ doctor: open.data as Doctor & Department }))
      .catch(() => onException());
  };

  const handleTimeChange = (newValue: Dayjs | null) => {
    setTime(newValue);
  };

  return (
    <Box width="100%" display="flex" justifyContent="space-between">
      <Box mr={2}>
        <Typography mb={2} variant="h5">
          어서오세요 <b>{patient.patientName}</b>님
        </Typography>
        <Typography variant="h6">
          우측의 목록에서 진료 받기를 희망하는 의사를 선택해주세요.
        </Typography>
      </Box>
      <Box minWidth={600} flexGrow={1}>
        <FixedSizeList
          height={350}
          width="100%"
          itemSize={80}
          itemCount={
            doctorListWithDepartment ? doctorListWithDepartment.length : 0
          }
          overscanCount={5}
          itemData={
            doctorListWithDepartment
              ? {
                  data: doctorListWithDepartment,
                  handleClickItem,
                  handleClickAppointmentItem,
                }
              : undefined
          }
        >
          {RenderRow}
        </FixedSizeList>
      </Box>
      <Dialog open={open.state} color="white" onClose={handleClose}>
        <DialogTitle>예약 접수</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="baseline" gap={1}>
            <Typography fontWeight="bold">
              {open.data?.departmentName}
            </Typography>
            <Typography fontSize={20} fontWeight="bold">
              {open.data?.staffName}
            </Typography>
            <Typography>선생님에게 예약합니다.</Typography>
          </Box>
          <DialogContentText mb={1}>
            진료를 희망하는 날짜를 선택해 주세요.
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              disablePast
              label="희망 일자/시간"
              onChange={handleTimeChange}
              value={time}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit}>등록</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default StepSelectDoctor;
