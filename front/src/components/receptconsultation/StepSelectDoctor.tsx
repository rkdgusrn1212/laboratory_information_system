import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Paper from '@mui/material/Paper';
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  ReadDoctorListWithDepartmentResponse,
  useReadDoctorListWithDepartmentQuery,
} from '../../services/doctorApi';
import stringAvatar from '../../utils/stringAvatar';
import { Department, Doctor, Patient } from '../../services/types';
import { useCreateConsultationWalkInMutation } from '../../services/consultationReceptionApi';

const RenderRow: React.FC<
  ListChildComponentProps<{
    data: ReadDoctorListWithDepartmentResponse;
    // eslint-disable-next-line no-unused-vars
    handleClickItem: (doctor: Doctor & Department) => void;
  }>
> = ({ index, style, data: { data, handleClickItem } }) => {
  return (
    <ListItem
      style={style}
      component="div"
      key={data[index].staffNo}
      disablePadding
    >
      <Paper sx={{ width: '100%' }} elevation={5}>
        <ListItemButton
          sx={{ height: 60 }}
          onClick={() => handleClickItem(data[index])}
        >
          <ListItemAvatar>
            {data[index].staffImage ? (
              <Avatar
                alt={data[index].staffImage as string}
                src={data[index].staffImage as string}
                sx={{ width: 40, height: 40 }}
              />
            ) : (
              <Avatar {...stringAvatar(data[index].staffName, 40)}></Avatar>
            )}
          </ListItemAvatar>
          <ListItemText>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography variant="h6" fontFamily="cafe-surround">
                {data[index].staffName}
                <small> 선생님</small>
              </Typography>
              <Typography variant="subtitle1" fontFamily="cafe-surround">
                {data[index].departmentName}
              </Typography>
            </Box>
          </ListItemText>
        </ListItemButton>
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

  const handleClickItem = (doctor: Doctor & Department) => {
    createConsultationWalkIn({
      staffNo: doctor.staffNo,
      patientNo: patient.patientNo,
    })
      .unwrap()
      .then(() => onSuccess({ doctor }))
      .catch(() => onException());
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
      <Box minWidth={300} flexGrow={1}>
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
              ? { data: doctorListWithDepartment, handleClickItem }
              : undefined
          }
        >
          {RenderRow}
        </FixedSizeList>
      </Box>
    </Box>
  );
};
export default StepSelectDoctor;
