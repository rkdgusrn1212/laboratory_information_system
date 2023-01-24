import {
  useState,
  useCallback,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  ChangeEventHandler,
} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppSelector } from '../../hooks';

const StaffDetailForm: ForwardRefRenderFunction<unknown, unknown> = (
  props,
  ref,
) => {
  const signupFormState = useAppSelector((state) => state.signupForm);
  const [staffBirth, setStaffBirth] = useState<Dayjs | null>(
    dayjs(signupFormState.form.staffBirth),
  );
  const [staffName, setStaffName] = useState<string>(
    signupFormState.form.staffName || '',
  );
  const [authId, setAuthId] = useState<string>(
    signupFormState.form.authId || '',
  );
  const [authPassword, setAuthPassword] = useState<string>(
    signupFormState.form.authPassword || '',
  );
  const [staffPhone, setStaffPhone] = useState<string>(
    signupFormState.form.staffPhone || '',
  );
  const [staffRrn, setStaffRrn] = useState<string>(
    signupFormState.form.staffRrn || '',
  );
  const [passwordVisiblity, setPasswordVisibility] = useState(false);

  const handleMouseUpAndLeaveVisibility = useCallback(
    () => setPasswordVisibility(false),
    [],
  );

  const handleMouseDownVisibility = useCallback(
    () => setPasswordVisibility(true),
    [],
  );

  useImperativeHandle(ref, () => ({
    authId,
    authPassword,
    staffName,
    staffBirth: staffBirth?.toString(),
    staffPhone,
    staffRrn,
  }));

  const handleIdChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setAuthId(event.target.value);
    },
    [],
  );

  const handlePasswordChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => {
    setAuthPassword(event.target.value);
  }, []);

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

  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}
        >
          <TextField
            required
            fullWidth
            id="id"
            label="아이디"
            name="id"
            value={authId}
            onChange={handleIdChange}
            autoComplete="username"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    sx={{ whiteSpace: 'nowrap' }}
                    variant="text"
                    color="secondary"
                  >
                    중복확인
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="비밀번호"
            value={authPassword}
            onChange={handlePasswordChange}
            type={passwordVisiblity ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onMouseLeave={handleMouseUpAndLeaveVisibility}
                    onMouseUp={handleMouseUpAndLeaveVisibility}
                    onMouseDown={handleMouseDownVisibility}
                  >
                    {passwordVisiblity ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            autoComplete="name"
            name="name"
            required
            fullWidth
            onChange={handleNameChange}
            id="name"
            label="성명"
            value={staffName}
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="tel"
            name="tel"
            required
            fullWidth
            id="tel"
            value={staffPhone}
            label="전화번호"
            onChange={handlePhoneChange}
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="rrn"
            required
            fullWidth
            onChange={handleRrnChange}
            id="rrn"
            value={staffRrn}
            label="주민번호"
            autoFocus
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default forwardRef(StaffDetailForm);
