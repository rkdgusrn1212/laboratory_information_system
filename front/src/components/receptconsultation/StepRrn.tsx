import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import RrnMaskedInput from '../common/RrnMaskedInput';
import { Button, Typography } from '@mui/material';
import { RrnPattern } from '../../utils/patterns';
import { CreatePatientRequest } from '../../services/patientApi';

interface StepRrnProps {
  // eslint-disable-next-line no-unused-vars
  onRrnSubmit: (data: Pick<CreatePatientRequest, 'patientRrn'>) => void;
}

const StepRrn: React.FC<StepRrnProps> = ({ onRrnSubmit }) => {
  const [rrn, setRrn] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const handleValueSet = (value: string) => {
    setRrn(value);
    if (!RrnPattern.test(value)) {
      setError('주민번호/외국인등록번호를 다시 한번 확인해 주세요.');
    }
  };

  const handleClick = () => {
    onRrnSubmit({ patientRrn: rrn });
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
        <Typography my={2} variant="h5">
          접수를 위해 주민번호 13자리를 입력해 주세요.
        </Typography>
        <Typography ml={1} mt={1} mb={3} variant="body1">
          외국인이신가요? 외국인등록번호 13자리를 입력해주세요.
        </Typography>
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="center"
          gap={1}
          mb={4}
        >
          <RrnMaskedInput
            fullWidth
            label="주민번호/외국인등록번호"
            onValueSet={handleValueSet}
            size="small"
            error={error !== undefined}
            helpText={error}
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
        src="/images/idcard.png"
      />
    </Box>
  );
};
export default StepRrn;
