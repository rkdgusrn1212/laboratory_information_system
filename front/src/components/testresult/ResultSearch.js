import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import * as React from 'react';

export function ResultSearchDate() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: '시작일', end: '종료일' }}
      sx={{ width: '100%' }}
    >
      <DateRangePicker
        sx={{ width: '100%' }}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment sx={{ width: '100%' }}>
            <Box display="flex" sx={{ width: '100%' }}>
              <TextField sx={{ width: '100%' }} size="small" {...startProps} />
              <Typography sx={{ mx: 1, my: 1 }}> ~ </Typography>
              <TextField sx={{ width: '100%' }} size="small" {...endProps} />
            </Box>
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
export function ResultSearchName() {
  return (
    <React.Fragment>
      <Box
        noValidate
        autoComplete="on"
        sx={{ width: '100%' }}
      >
        <TextField
          sx={{ width: '100%' }}
          label="환자이름"
          size="small"
        />
      </Box>
    </React.Fragment>
  );
} 