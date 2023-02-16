import { ChangeEventHandler, useState } from 'react';

import Box from '@mui/material/Box';
import PhoneMaskedInput from '../common/PhoneMaskedInput';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { PhonePattern } from '../../utils/patterns';
import { CreatePatientRequest } from '../../services/patientApi';

interface StepNameAndPhonePorps {
  // eslint-disable-next-line no-unused-vars
  onSuccess: (
    // eslint-disable-next-line no-unused-vars
    data: {
      patient: Pick<CreatePatientRequest, 'patientName' | 'patientPhone'>;
    },
  ) => void;
}

const StepNameAndPhone: React.FC<StepNameAndPhonePorps> = ({ onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleValueSet = (value: string) => {
    setPhone(value);
    if (!PhonePattern.test(phone)) {
      setPhoneError('휴대폰 번호를 다시 한번 확인해 주세요.');
    } else {
      setPhoneError(null);
    }
    if (name.length > 40 || name.length < 0) {
      setNameError('이름을 다시한번 확인해 주세요.');
    } else {
      setNameError(null);
    }
  };

  const handleSubmit = () => {
    onSuccess({ patient: { patientName: name, patientPhone: phone } });
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
            error={nameError != null}
            helperText={nameError}
          />
          <PhoneMaskedInput
            fullWidth
            label="휴대폰 번호"
            onValueSet={handleValueSet}
            size="small"
            error={phoneError !== null}
            helpText={phoneError}
          />
          <Button
            sx={{ height: '100%' }}
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
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
