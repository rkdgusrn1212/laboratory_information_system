import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ConsultationReceptionPickerList from './ConsultationReceptionPickerList';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';

import {
  ConsultationReception,
  ConsultationWalkIn,
} from '../../services/types';
import {
  useLazyReadConsultationAppointmentListQuery,
  useLazyReadConsultationWalkInListQuery,
} from '../../services/consultationReceptionApi';
import { useAppSelector } from '../../hooks';
import { selectAccount } from '../../services/accountSlice';
import dayjs from 'dayjs';

const ConsultationReceptionPicker: React.FC<{
  onSelected: (
    // eslint-disable-next-line no-unused-vars
    consultaionReception: ConsultationReception | undefined,
  ) => void;
  selected: ConsultationReception | undefined;
}> = ({ onSelected, selected }) => {
  const Account = useAppSelector(selectAccount);
  const [tabValue, setTabValue] = useState(0);
  const [readConsultationWalkInList, readConsultationWalkInListState] =
    useLazyReadConsultationWalkInListQuery({ pollingInterval: 5000 });
  const [
    readConsultationAppointmentList,
    readConsultationAppointmentListState,
  ] = useLazyReadConsultationAppointmentListQuery({ pollingInterval: 5000 });

  useEffect(() => {
    if (Account?.principal.staffVo.staffNo) {
      if (tabValue === 0) {
        readConsultationWalkInList({
          pageSize: 1000,
          pageStart: 0,
          staffNo: Account?.principal.staffVo.staffNo,
        });
      } else {
        const startDate = dayjs(Date.now());
        const endDate = dayjs(startDate)
          .set('date', startDate.date() + 1)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0);
        readConsultationAppointmentList({
          pageSize: 1000,
          pageStart: 0,
          consultationReceptionAppointmentStart: startDate.unix(),
          consultationReceptionAppointmentEnd: endDate.unix(),
          staffNo: Account?.principal.staffVo.staffNo,
        });
      }
    }
  }, [
    Account?.principal.staffVo.staffNo,
    readConsultationWalkInList,
    readConsultationAppointmentList,
    tabValue,
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper
      sx={{
        height: '100%',
        py: 3,
      }}
    >
      <Stack
        alignItems="stretch"
        justifyContent="start"
        flexDirection="column"
        height="100%"
      >
        <Typography variant="h6" ml={3} mb={2}>
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
        <Box sx={{ flexGrow: 1, overflowY: 'scroll' }}>
          <Box sx={{ minHeight: 0, px: 1 }}>
            <ConsultationReceptionPickerList
              onSelected={onSelected}
              selected={selected}
              data={
                tabValue === 0
                  ? readConsultationWalkInListState.data
                  : readConsultationAppointmentListState.data
              }
            />
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};
export default ConsultationReceptionPicker;
