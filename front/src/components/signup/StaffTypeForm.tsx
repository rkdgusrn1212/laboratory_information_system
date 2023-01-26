import React, {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { Avatar } from '@mui/material';
import { useAppSelector } from '../../hooks';

const StaffTypeForm: ForwardRefRenderFunction<unknown, unknown> = (
  props,
  ref,
) => {
  const signupFormState = useAppSelector((state) => state.signupForm);
  const [selectedType, setSelectedType] = useState<number | undefined>(
    signupFormState.form.staffType,
  );

  useImperativeHandle(ref, () => selectedType);

  const handleChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, newType: number) => {
      setSelectedType(newType);
    },
    [],
  );

  return (
    <ToggleButtonGroup
      fullWidth
      color="standard"
      value={selectedType}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value={0}>
        <Box sx={{ display: 'block', p: 1 }}>
          <Avatar
            src="/images/nurse_icon.png"
            sx={{
              margin: 'auto',
              p: 1,
              bgcolor: 'skyblue',
              width: 56,
              height: 56,
            }}
          />
          간호사
        </Box>
      </ToggleButton>
      <ToggleButton value={1}>
        <Box sx={{ display: 'block', p: 1 }}>
          <Avatar
            src="/images/doctor_icon.png"
            sx={{
              margin: 'auto',
              p: 1,
              bgcolor: 'orange',
              width: 56,
              height: 56,
            }}
          />
          의사
        </Box>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
export default forwardRef(StaffTypeForm);
