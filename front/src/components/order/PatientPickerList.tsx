import { useState, useCallback, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

import { ReadablePatient } from '../../services/types';
import stringAvatar from '../../utils/stringAvatar';

export type PatientPickerListProps = {
  onSelected: (patient: ReadablePatient) => void;
  data: ReadablePatient[];
};

const PatientPickerList: React.FC<PatientPickerListProps> = ({
  onSelected,
  data,
}) => {
  const [selected, setSelected] = useState(data[0]);

  const handleClickItem = useCallback((item: ReadablePatient) => {
    setSelected(item);
  }, []);

  useEffect(() => {
    onSelected(selected);
  }, [onSelected, selected]);

  return (
    <Stack gap={1}>
      {data.map((item) => {
        const age =
          new Date(
            new Date().getTime() - new Date(item.patientBirth).getTime(),
          ).getFullYear() - 1970;
        return (
          <Card
            key={item.patientNo}
            elevation={2}
            sx={{
              background:
                item.patientNo === selected?.patientNo
                  ? 'linear-gradient(to right, #69dbff, #9198e5)'
                  : 'white',
            }}
          >
            <CardActionArea
              onClick={() => {
                handleClickItem(item);
              }}
              sx={{ px: 2, py: 1 }}
            >
              <Stack direction="row" alignItems="center">
                <Avatar color="white" {...stringAvatar(item.patientName, 40)} />
                <Stack flexGrow={1} mx={2} alignItems="stretch">
                  <Typography fontSize={10} textOverflow="ellipsis">
                    <small>{item.patientNo}</small>
                  </Typography>
                  <Stack direction="row" flexGrow={1} spacing={1}>
                    <Typography flexGrow={1} variant="body1" fontWeight="bold">
                      {item.patientName}
                    </Typography>
                    <Typography variant="body1">
                      <small>{age}세</small>
                    </Typography>
                    <Typography variant="body1">
                      <small>{item.patientMale ? '남' : '여'}</small>
                    </Typography>
                    <Typography variant="body1">
                      <small>{item.patientBirth}</small>
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
