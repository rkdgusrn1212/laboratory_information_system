import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';

const PatientPickerInput: React.FC = () => {
  const [condition, setCondition] = useState('name');

  const handleChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value as string);
  };
  return (
    <Stack
      alignItems="start"
      justifyContent="stretch"
      direction="row"
      spacing={1}
      px={1}
    >
      <FormControl sx={{ width: 120 }} size="small">
        <InputLabel id="search-condition-label">검색조건</InputLabel>
        <Select
          variant="outlined"
          labelId="search-condition-label"
          id="search-condition"
          value={condition}
          label="검색조건"
          onChange={handleChange}
        >
          <MenuItem value={'name'}>성명</MenuItem>
          <MenuItem value={'no'}>환자번호</MenuItem>
          <MenuItem value={'rnn'}>주민번호</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ flexGrow: 1 }} variant="outlined" size="small">
        <InputLabel htmlFor="outlined-adornment-password">검색</InputLabel>
        <OutlinedInput
          id="search"
          type="search"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="검색"
        />
      </FormControl>
    </Stack>
  );
};
export default PatientPickerInput;
