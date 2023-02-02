import { useState, useCallback, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Patient } from '../../services/types';

export type PatientPickerListProps = {
  onSelected: (patient: Patient) => void;
  data: Patient[];
};

const PatientPickerList: React.FC<PatientPickerListProps> = ({
  onSelected,
  data,
}) => {
  const [selected, setSelected] = useState(data[0]);

  const handleClickItem = useCallback((item: Patient) => {
    setSelected(item);
  }, []);

  useEffect(() => {
    onSelected(selected);
  }, [onSelected, selected]);

  return (
    <Stack gap={1}>
      {data.map((item) => {
        if (!item.image) {
          if (item.male) {
            item.image = '/image/male_icon.png';
          } else {
            item.image = '/image/female_icon.png';
          }
        }
        const age =
          new Date(new Date().getTime() - item.birth.getTime()).getFullYear() -
          1970;
        return (
          <Card
            key={item.no}
            elevation={2}
            sx={{
              background:
                item.no === selected?.no
                  ? 'linear-gradient(to right, #69dbff, #9198e5)'
                  : 'white',
            }}
          >
            <CardActionArea
              onClick={() => {
                handleClickItem(item);
              }}
            >
              <Grid
                container
                minWidth="sm"
                sx={{ alignItems: 'center', m: 1, gap: 1, spacing: 1 }}
              >
                <Grid item>
                  <Avatar
                    sx={{
                      color: 'white',
                      bgcolor: item.male ? '#ffa733' : '#ed4b82',
                    }}
                    alt={item.name}
                    src={item.image}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1">
                    <small>{item.no}</small>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" fontWeight="bold">
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">
                    <small>만 {age}세</small>
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1">
                    <small>{item.male ? '남' : '여'}</small>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">
                    <small>{item.rnn}</small>
                  </Typography>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        );
      })}
    </Stack>
  );
};
export default PatientPickerList;
