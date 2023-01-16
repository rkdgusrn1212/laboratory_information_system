import { useState, useCallback } from 'react';
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

const MemberDetailForm = () => {
  const [birth, setBirth] = useState<Dayjs | null>(dayjs('1990-01-01'));
  const [passwordVisiblity, setPasswordVisibility] = useState(false);

  const handleMouseUpAndLeaveVisibility = useCallback(
    () => setPasswordVisibility(false),
    [],
  );

  const handleMouseDownVisibility = useCallback(
    () => setPasswordVisibility(true),
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
              value={birth}
              views={['year', 'month', 'day']}
              onChange={(
                newValue: React.SetStateAction<dayjs.Dayjs | null>,
              ) => {
                setBirth(newValue);
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
            id="name"
            label="성명"
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
            label="전화번호"
            autoFocus
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default MemberDetailForm;
