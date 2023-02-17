import { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import {
  ConsultationAppointment,
  ConsultationReception,
  ConsultationWalkIn,
  isArray,
  isConsultationWalkIn,
} from '../../services/types';
import stringAvatar from '../../utils/stringAvatar';
import dayjs, { Dayjs } from 'dayjs';
import { useReadPatientByPatientNoQuery } from '../../services/patientApi';
import { Box } from '@mui/material';

const ConsultationReceptionCard: React.FC<{
  consultationReception: ConsultationReception;
  selected: boolean;
  onClick: () => void;
}> = ({ consultationReception, selected, onClick }) => {
  const useFindPatientResult = useReadPatientByPatientNoQuery(
    consultationReception.patientNo,
  );
  const isAppointment = useMemo(
    () =>
      isArray<ConsultationWalkIn>(consultationReception, isConsultationWalkIn),
    [consultationReception],
  );

  if (!useFindPatientResult.data) return <CircularProgress />;
  const age =
    new Date(
      new Date().getTime() -
        new Date(useFindPatientResult.data.patientBirth).getTime(),
    ).getFullYear() - 1970;
  return (
    <Card
      elevation={2}
      sx={{
        background: selected
          ? 'linear-gradient(to right, #69dbff, #9198e5)'
          : 'white',
      }}
    >
      <CardActionArea onClick={onClick} sx={{ px: 2, py: 1 }}>
        <Stack direction="row" alignItems="center">
          <Avatar
            color="white"
            {...stringAvatar(useFindPatientResult.data.patientName, 40)}
          />
          <Box flexGrow={1} mx={2} alignItems="stretch">
            <Stack direction="row" justifyContent={'space-between'}>
              <Typography fontSize={10}>
                <small>
                  {'차트번호 : ' +
                    useFindPatientResult.data.patientNo
                      .toString()
                      .padStart(6, '0')}
                </small>
              </Typography>
              <Typography fontSize={10} textOverflow="ellipsis">
                <small>
                  {(isAppointment ? '예약시간 : ' : '접수시간 : ') +
                    (isAppointment
                      ? dayjs(
                          (consultationReception as ConsultationAppointment)
                            .consultationReceptionAppointment,
                        ).format('YYYY-MM-DD, HH:mm:ss')
                      : dayjs(
                          consultationReception.consultationReceptionTime,
                        ).format('YYYY-MM-DD, HH:mm:ss'))}
                </small>
              </Typography>
            </Stack>
            <Box display="flex" flexGrow={1} gap={1}>
              <Typography
                noWrap
                textOverflow="ellipsis"
                variant="body1"
                fontWeight="bold"
                width={120}
              >
                {useFindPatientResult.data.patientName}
              </Typography>
              <Typography variant="body1" width={60} textAlign="end">
                <small>{age}세</small>
              </Typography>
              <Typography variant="body1" width={40} textAlign="start">
                <small>
                  {useFindPatientResult.data.patientMale ? '남' : '여'}
                </small>
              </Typography>
              <Typography variant="body1" width={80}>
                <small>
                  {dayjs(useFindPatientResult.data.patientBirth).format(
                    'YYYY-MM-DD',
                  )}
                </small>
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export type ConsultationReceptionPickerListProps = {
  onSelected: (
    // eslint-disable-next-line no-unused-vars
    consultationReception: ConsultationReception,
  ) => void;
  selected: ConsultationReception | undefined;
  data: ConsultationReception[];
};

const ConsultationReceptionPickerList: React.FC<
  ConsultationReceptionPickerListProps
> = ({ onSelected, data, selected }) => {
  return (
    <Stack gap={1}>
      {data.map((consultationReception) => (
        <ConsultationReceptionCard
          key={consultationReception.consultationNo}
          consultationReception={consultationReception}
          selected={
            selected
              ? consultationReception.consultationReceptionNo ===
                selected.consultationReceptionNo
              : false
          }
          onClick={() => onSelected(consultationReception)}
        />
      ))}
    </Stack>
  );
};
export default ConsultationReceptionPickerList;
