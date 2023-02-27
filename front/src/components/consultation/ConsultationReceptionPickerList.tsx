import { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import {
  ConsultationAppointment,
  ConsultationReception,
  ConsultationWalkIn,
  isArray,
  isConsultationWalkIn,
} from '../../services/types';
import stringAvatar from '../../utils/stringAvatar';
import dayjs from 'dayjs';
import { useReadPatientByPatientNoQuery } from '../../services/patientApi';

const ConsultationReceptionCard: React.FC<{
  consultationReception?: ConsultationAppointment | ConsultationWalkIn;
  selected?: boolean;
  onClick?: () => void;
}> = ({ consultationReception, selected, onClick }) => {
  const useFindPatientResult = useReadPatientByPatientNoQuery(
    consultationReception ? consultationReception.patientNo : 0,
    { pollingInterval: 20000, skip: consultationReception === undefined },
  );
  const isAppointment = useMemo(
    () => !isConsultationWalkIn(consultationReception),
    [consultationReception],
  );

  return (
    <Card
      elevation={2}
      sx={{
        background: selected
          ? 'linear-gradient(to right, #69dbff, #9198e5)'
          : consultationReception?.consultationTime
          ? '#c0c0c0'
          : 'white',
        height: 100,
      }}
    >
      <CardActionArea
        disabled={consultationReception?.consultationTime != null}
        onClick={onClick}
        sx={{ px: 2, py: 1, height: '100%' }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize={12} width={100}>
            {consultationReception ? (
              (isAppointment ? '예약시간 : ' : ' 대기순번 : ') +
              (isAppointment
                ? dayjs(
                    (consultationReception as ConsultationAppointment)
                      .consultationReceptionAppointment,
                  ).format('HH:mm')
                : (consultationReception as ConsultationWalkIn)
                    .consultationWalkInOrder)
            ) : (
              <Skeleton variant="text" />
            )}
          </Typography>
          <Typography fontSize={12} width={140} textAlign="end">
            {consultationReception ? (
              consultationReception.consultationTime ? (
                '진료 : ' +
                dayjs(consultationReception.consultationTime).format('HH:mm:ss')
              ) : (
                '접수 : ' +
                dayjs(consultationReception.consultationReceptionTime).format(
                  'HH:mm:ss',
                )
              )
            ) : (
              <Skeleton variant="text" />
            )}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" mt={1}>
          {useFindPatientResult.data ? (
            <Avatar
              color="white"
              {...stringAvatar(useFindPatientResult.data.patientName, 40)}
            />
          ) : (
            <Skeleton variant="circular" width={40} height={40} />
          )}
          <Box flexGrow={1} ml={2} alignItems="stretch">
            <Typography fontSize={8} width={100} mb="2px">
              {useFindPatientResult.data ? (
                '차트번호 / ' +
                useFindPatientResult.data.patientNo.toString().padStart(6, '0')
              ) : (
                <Skeleton variant="text" />
              )}
            </Typography>
            <Box display="flex" flexGrow={1} alignItems="baseline" gap={1}>
              <Typography
                noWrap
                textOverflow="ellipsis"
                fontSize={18}
                fontWeight="bold"
                flexGrow={1}
                width={40}
              >
                {useFindPatientResult.data ? (
                  useFindPatientResult.data.patientName
                ) : (
                  <Skeleton variant="text" />
                )}
              </Typography>
              <Typography fontSize={12} width={80} textAlign="end">
                {useFindPatientResult.data ? (
                  new Date(
                    new Date().getTime() -
                      new Date(
                        useFindPatientResult.data.patientBirth,
                      ).getTime(),
                  ).getFullYear() -
                  1970 +
                  '세 / ' +
                  (useFindPatientResult.data.patientMale ? '남' : '여')
                ) : (
                  <Skeleton variant="text" />
                )}
              </Typography>
              <Typography fontSize={12} width={80} textAlign="end">
                {useFindPatientResult.data ? (
                  dayjs(useFindPatientResult.data.patientBirth).format(
                    'YYYY-MM-DD',
                  )
                ) : (
                  <Skeleton variant="text" />
                )}
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
    consultationReception: ConsultationReception | undefined,
  ) => void;
  selected: ConsultationReception | undefined;
  data: ConsultationAppointment[] | ConsultationWalkIn[] | undefined;
};

const ConsultationReceptionPickerList: React.FC<
  ConsultationReceptionPickerListProps
> = ({ onSelected, data, selected }) => {
  const handleClick = (consultationReception: ConsultationReception) => () => {
    if (
      consultationReception.consultationReceptionNo ===
      selected?.consultationReceptionNo
    ) {
      onSelected(undefined);
    } else {
      onSelected(consultationReception as ConsultationReception);
    }
  };
  return (
    <Stack gap={1} my={1} width={400}>
      {data ? (
        data.map((consultationReception) => (
          <ConsultationReceptionCard
            key={consultationReception.consultationReceptionNo}
            consultationReception={consultationReception}
            selected={
              selected
                ? consultationReception.consultationReceptionNo ===
                  selected.consultationReceptionNo
                : false
            }
            onClick={handleClick(consultationReception)}
          />
        ))
      ) : (
        <ConsultationReceptionCard />
      )}
    </Stack>
  );
};
export default ConsultationReceptionPickerList;
