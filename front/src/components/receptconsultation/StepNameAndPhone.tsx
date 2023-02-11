import { ChangeEventHandler, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import PhoneMaskedInput from '../common/PhoneMaskedInput';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { PhonePattern } from '../../utils/patterns';
import { CreatablePatient } from '../../services/types';

interface StepNameAndPhonePorps {
  // eslint-disable-next-line no-unused-vars
  onStepAndPhoneSubmit: (
    // eslint-disable-next-line no-unused-vars
    data: Pick<CreatablePatient, 'patientName' | 'patientPhone'>,
  ) => void;
}

const StepNameAndPhone: React.FC<StepNameAndPhonePorps> = ({
  onStepAndPhoneSubmit,
}) => {
  const ref = useRef('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);

  const handleClick = () => {
    let hasError = false;
    if (!PhonePattern.test(ref.current)) {
      setPhoneError('휴대폰 번호를 다시 한번 확인해 주세요.');
      hasError = true;
    } else {
      setPhoneError(undefined);
    }
    if (name.length > 40 || name.length < 0) {
      setNameError('이름을 다시한번 확인해 주세요.');
      hasError = true;
    } else {
      setNameError(undefined);
    }
    if (hasError) return;
    onStepAndPhoneSubmit({ patientName: name, patientPhone: ref.current });
  };

  const handleNameChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setName(event.target.value);
  };

  return (
    <Box
      display="flex"
      py={6}
      justifyContent={'space-between'}
      gap={3}
      alignItems="center"
    >
      <Box flexGrow={1} ml={1} maxWidth={500}>
        <Alert
          severity="info"
          sx={{
            background:
              'linear-gradient(90deg, rgba(186,255,191,1) 61%, rgba(132,255,171,1) 100%)',
          }}
        >
          주민번호가 성공적으로 입력되었습니다.
        </Alert>
        <Typography my={2} variant="h5">
          계속해서 접수를 진행하기 위해 이름과 휴대폰 번호를 입력해 주세요.
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="end"
          gap={1}
          mb={4}
        >
          <TextField
            fullWidth
            label="이름"
            size="small"
            value={name}
            onChange={handleNameChange}
            error={nameError !== undefined}
            helperText={nameError}
          />
          <PhoneMaskedInput
            fullWidth
            label="휴대폰 번호"
            ref={ref}
            size="small"
            error={phoneError !== undefined}
            help={phoneError}
          />
          <Button
            sx={{ height: '100%' }}
            variant="contained"
            color="secondary"
            onClick={handleClick}
          >
            입력
          </Button>
        </Box>
      </Box>
      <Box
        component="img"
        mr={{ xs: 1, md: 5 }}
        sx={{
          maxHeight: 167,
          maxWidth: 250,
        }}
        alt="The house from the offer."
        src="/images/phone.png"
      />
    </Box>
  );
};
export default StepNameAndPhone;
