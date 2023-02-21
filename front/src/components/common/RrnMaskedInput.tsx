import { forwardRef, RefCallback, useState } from 'react';

import { IMaskInput } from 'react-imask';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import { rrnMask } from '../../utils/masks';

interface RrnIMaskInputProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: { target: { value: string } }) => void;
  name: string;
}

const RrnIMaskInput = forwardRef<HTMLElement, RrnIMaskInputProps>(
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

const RrnMaskedInput: React.FC<
  FormControlProps & {
    label: string;
    helpText?: string | null;
    // eslint-disable-next-line no-unused-vars
    onValueSet: (value: string) => void;
    initValue?: string;
  }
> = ({ label, helpText, onValueSet, initValue, ...props }) => {
  const [value, setValue] = useState(initValue ? initValue : '');
  const [pure, setPure] = useState(initValue ? initValue : '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur: React.FocusEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = () => {
    setPure(value);
    setValue(rrnMask(value));
    onValueSet(value);
  };

  const handleFocus: React.FocusEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = () => {
    setValue(pure);
  };

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
        inputComponent={RrnIMaskInput as any}
      />
      <FormHelperText>{helpText}</FormHelperText>
    </FormControl>
  );
};
export default RrnMaskedInput;
