import {
  useState,
  useCallback,
  ForwardRefRenderFunction,
  ChangeEventHandler,
  ChangeEvent,
  forwardRef,
} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const StaffDetailForm: ForwardRefRenderFunction<unknown, unknown> = () => {
  const [staffBirth, setStaffBirth] = useState<Dayjs | null>(null);
  const [staffName, setStaffName] = useState<string>('');
  const [staffMale, setStaffMale] = useState<boolean | undefined>(undefined);
  const [staffPhone, setStaffPhone] = useState<string>('');
  const [staffRrn, setStaffRrn] = useState<string>('');

  const handleNameChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setStaffName(event.target.value);
    },
    [],
  );
  const handlePhoneChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setStaffPhone(event.target.value);
    },
    [],
  );
  const handleRrnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setStaffRrn(event.target.value);
    },
    [],
  );

  const handleMaleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, value: string) => {
      setStaffMale(value === 'male');
    },
    [],
  );

  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField
            autoComplete="name"
            required
            fullWidth
            onChange={handleNameChange}
            label="성명"
            value={staffName}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            onChange={handleRrnChange}
            value={staffRrn}
            label="주민번호"
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="생년월일"
              openTo="year"
              value={staffBirth}
              views={['year', 'month', 'day']}
              onChange={(
                newValue: React.SetStateAction<dayjs.Dayjs | null>,
              ) => {
                setStaffBirth(newValue);
              }}
              renderInput={(params: TextFieldProps) => (
                <TextField fullWidth {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <FormLabel id="male-radio-buttons-group-label">성별</FormLabel>
          <RadioGroup
            row
            aria-labelledby="male-radio-buttons-group-label"
            value={
              staffMale === undefined
                ? undefined
                : staffMale
                ? 'male'
                : 'female'
            }
            onChange={handleMaleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="남성" />
            <FormControlLabel value="female" control={<Radio />} label="여성" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="tel"
            required
            fullWidth
            value={staffPhone}
            label="전화번호"
            onChange={handlePhoneChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default forwardRef(StaffDetailForm);
