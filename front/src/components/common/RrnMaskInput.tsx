import { ForwardRefRenderFunction, forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface RrnMaskInputProps {
  onChange: (event: { target: { name: string; value: unknown } }) => void;
  name: string;
}

const RrnMaskInput: ForwardRefRenderFunction<
  HTMLInputElement,
  RrnMaskInputProps
> = (props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) =>
        onChange({ target: { name: props.name, value: value } })
      }
      overwrite
    />
  );
};
export default forwardRef<HTMLInputElement, RrnMaskInputProps>(RrnMaskInput);
