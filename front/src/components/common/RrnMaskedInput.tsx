import { forwardRef, RefCallback, useImperativeHandle, useState } from 'react';

import { IMaskInput } from 'react-imask';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import { rrnMask } from '../../utils/masks';

interface RrnMaskInputProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: { target: { value: string } }) => void;
  name: string;
}

const RrnMaskInput = forwardRef<HTMLElement, RrnMaskInputProps>(
  ({ onChange, ...other }, ref) => {
    return (
      <IMaskInput
        {...other}
        inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
        mask="000000-0******"
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

const RrnMaskedInput = forwardRef<
  string,
  FormControlProps & {
    label: string;
    help?: string;
  }
>(({ label, help, ...props }, ref) => {
  const [value, setValue] = useState('');
  const [pure, setPure] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur: React.FocusEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = () => {
    setPure(value);
    setValue(rrnMask(value));
  };

  const handleFocus: React.FocusEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = () => {
    setValue(pure);
  };

  useImperativeHandle(ref, () => pure);

  return (
    <FormControl {...props}>
      <InputLabel htmlFor="rrn-mask-input">{label}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        label={label}
        id="rrn-mask-input"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inputComponent={RrnMaskInput as any}
      />
      <FormHelperText>{help}</FormHelperText>
    </FormControl>
  );
});
export default RrnMaskedInput;
