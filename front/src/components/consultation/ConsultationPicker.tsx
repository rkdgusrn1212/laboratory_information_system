import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ConsultationReceptionPickerList from './ConsultationReceptionPickerList';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import { ConsultationReception } from '../../services/types';
import { useLazyReadConsultationWalkInListQuery } from '../../services/consultationReceptionApi';
import { useAppSelector } from '../../hooks';
import { selectAccount } from '../../services/accountSlice';

const ConsultationReceptionPicker: React.FC<{
  onSelected: (
    // eslint-disable-next-line no-unused-vars
    consultaionReception: ConsultationReception,
  ) => void;
  selected: ConsultationReception | undefined;
}> = ({ onSelected, selected }) => {
  const Account = useAppSelector(selectAccount);
  if (!Account?.principal.staffVo.staffNo)
    throw new Error(
      'ConsultationReceptionPickerList: 로그인된 직원 계정 정보가 없습니다.',
    );
  const [tabValue, setTabValue] = useState(0);
  const [readConsultationWalkInList, readConsultationWalkInListState] =
    useLazyReadConsultationWalkInListQuery();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (tabValue === 0) {
      readConsultationWalkInList({
        pageSize: 10,
        pageStart: 0,
        staffNo: Account.principal.staffVo.staffNo,
      });
    }
  }, [Account.principal.staffVo.staffNo, readConsultationWalkInList, tabValue]);

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
        {(tabValue === 0 && !readConsultationWalkInListState.isSuccess) ||
        tabValue == 1 ? (
          <LinearProgress />
        ) : (
          <Box sx={{ flexGrow: 1, overflowY: 'scroll' }}>
            <Box sx={{ minHeight: 0, px: 1 }}>
              <ConsultationReceptionPickerList
                onSelected={onSelected}
                selected={selected}
                data={
                  tabValue === 0
                    ? (readConsultationWalkInListState.data as ConsultationReception[])
                    : []
                }
              />
            </Box>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};
export default ConsultationReceptionPicker;
