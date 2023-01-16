import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';

const ValidationForm: React.FC = () => {
  const [validating, setValidating] = useState(false);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
      });
      setValidating(true);
    },
    [],
  );

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        required
        fullWidth
        id="email"
        label="이메일"
        name="email"
        autoComplete="email"
      />
      {validating && (
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Grow in={validating}>
            <TextField
              required
              fullWidth
              id="code"
              label="인증번호"
              name="code"
              autoComplete="one-time-code"
            />
          </Grow>
        </Box>
      )}
      {validating || (
        <Button
          type="submit"
          fullWidth
          color="secondary"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          '인증번호 발송'
        </Button>
      )}
    </Box>
  );
};
export default ValidationForm;
