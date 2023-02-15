import { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useReadDepartmentListMutation } from '../../services/departmentApi';

const DepartmentSelectInput: React.FC<
  Omit<FormControlProps, 'onChange'> & {
    // eslint-disable-next-line no-unused-vars
    onChange: (event: SelectChangeEvent) => void;
    value: string;
    label: string;
  }
> = ({ value, onChange, label, ...props }) => {
  const [readDepartmentList, readDepartmentState] =
    useReadDepartmentListMutation();

  useEffect(() => {
    readDepartmentList({ pageSize: 100, pageStart: 0 });
  }, [readDepartmentList]);

  return (
    <FormControl {...props}>
      <InputLabel id="department-select-label">{label}</InputLabel>
      <Select
        labelId="department-select-label"
        label={label}
        value={value}
        onChange={onChange}
      >
        {readDepartmentState.data?.map((item) => (
          <MenuItem key={item.departmentCode} value={item.departmentCode}>
            {item.departmentName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default DepartmentSelectInput;
