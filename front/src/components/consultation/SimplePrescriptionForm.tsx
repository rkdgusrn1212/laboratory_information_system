import { ChangeEvent, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
const countries: readonly CountryType[] = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
];
const SimplePrescriptionForm: React.FC = () => {
  const [prescriptionCode, setPrescriptionCode] = useState('');
  const [behaviorCode, setBehaviorCode] = useState('');

  const handlePrescriptionCodeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setPrescriptionCode(event.target.value);
  };

  return (
    <Paper sx={{ height: '100%', py: 3, px: 1 }}>
      <Typography variant="h6" ml={2} mb={2}>
        간편 처방 등록
      </Typography>
      <Box display="flex" gap={1} mb={1}>
        <Box flexGrow={1} width={100}>
          <TextField
            label="처방코드"
            size="small"
            value={prescriptionCode}
            onChange={handlePrescriptionCodeChange}
          />
        </Box>
        <Box flexGrow={1} width={100}>
          <Autocomplete
            fullWidth
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                label="청구코드"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
          />
        </Box>
        <TextField label="분류" size="small" sx={{ width: 100 }} />
      </Box>
      <TextField label="처방명" size="small" fullWidth></TextField>
    </Paper>
  );
};
export default SimplePrescriptionForm;
