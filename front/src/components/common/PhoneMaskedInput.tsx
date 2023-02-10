import { forwardRef, RefCallback, useImperativeHandle, useState } from 'react';

import { IMaskInput } from 'react-imask';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

interface PhoneIMaskInputProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: { target: { value: string } }) => void;
  name: string;
}

const PhoneIMaskInput = forwardRef<HTMLElement, PhoneIMaskInputProps>(
  ({ onChange, ...other }, ref) => {
    return (
      <IMaskInput
        {...other}
        inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
        mask={[
          { mask: '{\\0\\1\\0}-000-0000' },
          { mask: '{\\0\\1\\0}-0000-0000' },
        ]}
        onAccept={(value) =>
          onChange({
            target: {
              value: value as string,
            },
          })
        }
        overwrite
      />
    );
  },
);

const PhoneInput = forwardRef<
  string,
  FormControlProps & {
    label: string;
    help?: string;
  }
>(({ label, help, ...props }, ref) => {
  const [value, setValue] = useState('010-');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useImperativeHandle(ref, () => value);

  return (
    <FormControl {...props}>
      <InputLabel htmlFor="phone-mask-input">{label}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={handleChange}
        label={label}
        id="phone-mask-input"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inputComponent={PhoneIMaskInput as any}
      />
      <FormHelperText>{help}</FormHelperText>
    </FormControl>
  );
});
export default PhoneInput;
