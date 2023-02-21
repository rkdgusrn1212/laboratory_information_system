import { forwardRef, RefCallback, useState } from 'react';

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
      />
    );
  },
);

const PhoneInput: React.FC<
  FormControlProps & {
    label: string;
    helpText?: string | null;
    // eslint-disable-next-line no-unused-vars
    onValueSet: (value: string) => void;
    initValue?: string;
  }
> = ({ label, helpText, initValue, onValueSet, ...props }) => {
  const [value, setValue] = useState(initValue ? initValue : '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onValueSet(event.target.value);
  };

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
      <FormHelperText>{helpText}</FormHelperText>
    </FormControl>
  );
};
export default PhoneInput;
