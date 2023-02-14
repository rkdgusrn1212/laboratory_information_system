import { forwardRef, RefCallback, useState } from 'react';

import { IMaskInput } from 'react-imask';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

interface DoctorCertificationIMaskInputProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: { target: { value: string } }) => void;
  name: string;
}

const DoctorIMaskInput = forwardRef<
  HTMLElement,
  DoctorCertificationIMaskInputProps
>(({ onChange, ...other }, ref) => {
  return (
    <IMaskInput
      {...other}
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      mask="#000[00]"
      definitions={{ '#': /[1-9]/ }}
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
});

const DoctorCertificationMaskedInput: React.FC<
  FormControlProps & {
    label: string;
    helpText?: string | null;
    // eslint-disable-next-line no-unused-vars
    onValueSet: (value: string) => void;
  }
> = ({ label, helpText, onValueSet, ...props }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onValueSet(event.target.value);
  };

  return (
    <FormControl {...props}>
      <InputLabel htmlFor="phone-certification-mask-input">{label}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={handleChange}
        label={label}
        id="doctor-certification-mask-input"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inputComponent={DoctorIMaskInput as any}
      />
      <FormHelperText>{helpText}</FormHelperText>
    </FormControl>
  );
};
export default DoctorCertificationMaskedInput;
