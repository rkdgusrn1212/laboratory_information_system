import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export function BasicDateRangePicker() {
    const [value, setValue] = React.useState([null, null]);

    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: '시작일', end: '종료일' }}
      >
        <DateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField size="small" {...startProps} />
              <Box sx={{ mx: 2, m:2 }}> ~ </Box>
              <TextField size="small" {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    );
}
export function BasicTextFields() {
    return (
        <React.Fragment>
            <Box sx={{
                mx: 2,
                mt: 3
            }}
                noValidate
                autoComplete="on"
            >
                <TextField
                    
                    id="outlined-size-small"
                    defaultValue="환자이름"
                    size="small"
                />

            </Box>
        </React.Fragment>
    );
} 