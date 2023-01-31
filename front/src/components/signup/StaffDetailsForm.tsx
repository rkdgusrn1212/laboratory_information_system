import { useState, ChangeEventHandler, ChangeEvent, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { WriteDetailsField } from '../../services/authApi';
import { MappedValidationError } from '../../services/types';

const PhonePattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$/;
const RrnPattern = /^[0-9]{6}-[0-9]{7}$/;

export interface DetailsForm {
  staffBirth: string;
  staffName: string;
  staffMale: boolean;
  staffPhone: string;
  staffRrn: string;
}

const StaffDetailsForm: React.FC<{
  onDetailFormComplete: (form: DetailsForm | undefined) => void;
  error: Omit<MappedValidationError<WriteDetailsField>, 'staffType'>;
}> = ({ onDetailFormComplete, error }) => {
  const [staffBirth, setStaffBirth] = useState<Dayjs | null>(null);
  const [staffName, setStaffName] = useState<string>('');
  const [staffMale, setStaffMale] = useState<boolean | undefined>(undefined);
  const [staffPhone, setStaffPhone] = useState<string>('');
  const [staffRrn, setStaffRrn] = useState<string>('');

  const [staffBirthHelp, setStaffBirthHelp] = useState<string | undefined>(
    undefined,
  );
  const [staffNameHelp, setStaffNameHelp] = useState<string | undefined>(
    undefined,
  );
  const [staffMaleHelp, setStaffMaleHelp] = useState<string | undefined>(
    undefined,
  );
  const [staffPhoneHelp, setStaffPhoneHelp] = useState<string | undefined>(
    undefined,
  );
  const [staffRrnHelp, setStaffRrnHelp] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setStaffPhoneHelp((state) => error.staffPhone || state);
    setStaffBirthHelp((state) => error.staffBirth || state);
    setStaffRrnHelp((state) => error.staffRrn || state);
    setStaffMaleHelp((state) => error.staffMale || state);
    setStaffNameHelp((state) => error.staffName || state);
  }, [
    error.staffBirth,
    error.staffMale,
    error.staffName,
    error.staffPhone,
    error.staffRrn,
  ]);

  const handleBirthChange = (
    newValue: React.SetStateAction<dayjs.Dayjs | null>,
  ) => {
    setStaffBirth(newValue);
  };

  useEffect(() => {
    if (staffBirth == null) {
      setStaffBirthHelp('생년월알이 비어있습니다.');
    } else if (staffBirth.diff(Date.now(), 'day') > 0) {
      setStaffBirthHelp('생년월알이 미래일 순 없습니다.');
    } else {
      setStaffBirthHelp(undefined);
    }
  }, [staffBirth]);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setStaffName(event.target.value);
  };

  useEffect(() => {
    if (staffName.length < 1) {
      setStaffNameHelp('이름이 비어있습니다.');
    } else if (staffName.length > 40) {
      setStaffNameHelp('이름은 40자를 넘을 수 없습니다.');
    } else {
      setStaffNameHelp(undefined);
    }
  }, [staffName]);

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setStaffPhone(event.target.value);
  };

  useEffect(() => {
    if (staffPhone.length < 1) {
      setStaffPhoneHelp('전화번호가 비어있습니다.');
    } else if (!PhonePattern.test(staffPhone)) {
      setStaffPhoneHelp('전화번호 형식에 맞지 않습니다.');
    } else {
      setStaffPhoneHelp(undefined);
    }
  }, [staffPhone]);

  const handleRrnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setStaffRrn(event.target.value);
  };

  useEffect(() => {
    if (staffRrn.length < 1) {
      setStaffRrnHelp('주민번호가 비어있습니다.');
    } else if (!RrnPattern.test(staffRrn)) {
      setStaffRrnHelp('주민번호 형식에 맞지 않습니다.');
    } else {
      setStaffRrnHelp(undefined);
    }
  }, [staffRrn]);

  const handleMaleChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setStaffMale(value === 'male');
  };

  useEffect(() => {
    if (staffMale == undefined) {
      setStaffMaleHelp('성별이 선택되지 않았습니다.');
    } else {
      setStaffMaleHelp(undefined);
    }
  }, [staffMale]);

  useEffect(() => {
    if (
      staffBirthHelp === undefined &&
      staffMaleHelp === undefined &&
      staffNameHelp === undefined &&
      staffPhoneHelp === undefined &&
      staffRrnHelp === undefined
    ) {
      onDetailFormComplete({
        staffBirth: staffBirth?.toJSON(),
        staffName,
        staffMale,
        staffRrn,
        staffPhone,
      } as DetailsForm);
    } else {
      onDetailFormComplete(undefined);
    }
  }, [
    staffBirthHelp,
    staffMaleHelp,
    staffNameHelp,
    staffPhoneHelp,
    staffRrnHelp,
    staffBirth,
    staffMale,
    staffName,
    staffPhone,
    staffRrn,
    onDetailFormComplete,
  ]);

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
            helperText={staffNameHelp}
            error={staffNameHelp !== undefined}
            value={staffName}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            onChange={handleRrnChange}
            value={staffRrn}
            helperText={staffRrnHelp}
            error={staffRrnHelp !== undefined}
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
              onChange={handleBirthChange}
              renderInput={(params: TextFieldProps) => (
                <TextField
                  fullWidth
                  {...params}
                  error={staffBirthHelp !== undefined}
                  helperText={staffBirthHelp}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <FormLabel id="male-radio-buttons-group-label">성별</FormLabel>
          <FormHelperText id="male-radio-button-group-error">
            {staffMaleHelp}
          </FormHelperText>
          <RadioGroup
            row
            aria-errormessage="male-radio-button-group-error"
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
            helperText={staffPhoneHelp}
            error={staffPhoneHelp !== undefined}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default StaffDetailsForm;
