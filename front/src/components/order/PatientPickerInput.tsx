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

const PatientPickerInput: React.FC = () => {
  const [condition, setCondition] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value as string);
  };
  return (
    <Box
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FormControl sx={{ m: 1, width: '150px' }} size="small">
        <InputLabel id="search-condition-label">검색조건</InputLabel>
        <Select
          variant="outlined"
          labelId="search-condition-label"
          id="search-condition"
          value={condition}
          label="검색조건"
          onChange={handleChange}
        >
          <MenuItem value={'no'}>환자번호</MenuItem>
          <MenuItem value={'name'}>성명</MenuItem>
          <MenuItem value={'rnn'}>주민번호</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size="small">
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
    </Box>
  );
};
export default PatientPickerInput;
