import { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useReadTestFieldListMutation } from '../../services/testFieldApi';

const TestFieldSelectInput: React.FC<
  Omit<FormControlProps, 'onChange'> & {
    // eslint-disable-next-line no-unused-vars
    onChange: (event: SelectChangeEvent) => void;
    value: string;
    label: string;
  }
> = ({ value, onChange, label, ...props }) => {
  const [readTestFieldList, readTestFieldState] =
    useReadTestFieldListMutation();

  useEffect(() => {
    readTestFieldList({ pageSize: 100, pageStart: 0 });
  }, [readTestFieldList]);

  return (
    <FormControl {...props}>
      <InputLabel id="testField-select-label">{label}</InputLabel>
      <Select
        labelId="testField-select-label"
        label={label}
        value={value}
        onChange={onChange}
      >
        {readTestFieldState.data?.map((item) => (
          <MenuItem key={item.testFieldCode} value={item.testFieldCode}>
            {item.testFieldName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default TestFieldSelectInput;
