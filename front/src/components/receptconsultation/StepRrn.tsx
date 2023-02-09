import { forwardRef, RefCallback, useState } from 'react';

import { IMaskInput } from 'react-imask';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { rrnMask } from '../../utils/masks';

type RrnMaskInputProps = {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const RrnMaskInput = forwardRef<HTMLElement, RrnMaskInputProps>(
  ({ onChange, ...other }, ref) => {
    return (
      <IMaskInput
        {...other}
        inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
        mask="000000-0******"
        pattern="\"
        onAccept={(value) =>
          onChange({
            target: {
              name: other.name,
              value: value as string,
            },
          })
        }
        overwrite
      />
    );
  },
);

const StepRrn: React.FC = () => {
  const [value, setValue] = useState('000000-0000000');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur: React.FocusEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = () => {
    setValue(rrnMask(value));
  };

  return (
    <Box>
      <FormControl variant="standard">
        <InputLabel htmlFor="formatted-text-mask-input">react-imask</InputLabel>
        <Input
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          name="textmask"
          id="formatted-text-mask-input"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent={RrnMaskInput as any}
        />
      </FormControl>
    </Box>
  );
};
export default StepRrn;
