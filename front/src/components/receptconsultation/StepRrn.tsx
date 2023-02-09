import { useRef } from 'react';

import Box from '@mui/material/Box';
import RrnMaskedInput from '../common/RrnMaskedInput';
import { Button, Typography } from '@mui/material';

const StepRrn: React.FC = () => {
  const rrnRef = useRef(null);

  return (
    <Box>
      <Typography my={2} variant="h5">
        접수를 위해 주민번호 13자리를 입력해 주세요.
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <RrnMaskedInput
          fullWidth
          label="주민번호/외국인등록번호"
          ref={rrnRef}
          size="small"
        />
        <Button sx={{ height: '100%' }} variant="contained" color="secondary">
          입력
        </Button>
      </Box>
    </Box>
  );
};
export default StepRrn;
