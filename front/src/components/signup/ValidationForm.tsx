import {
  useState,
  useCallback,
  ChangeEventHandler,
  ForwardRefRenderFunction,
  MouseEventHandler,
} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import CircularProgress from '@mui/material/CircularProgress';
import green from '@mui/material/colors/green';

import {
  CreateValidationRequest,
  isCreateValidationError,
  useCreateValidationMutation,
} from '../../services/authApi';

const ValidationForm: ForwardRefRenderFunction<unknown> = () => {
  const [email, setEmail] = useState<string>('');
  const [createValidation, createValidationState] =
    useCreateValidationMutation();

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setEmail(event.target.value);
    },
    [],
  );

  const handleIssueClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    createValidation({
      validationEmail: email,
    } as CreateValidationRequest);
  }, [email, createValidation]);

  const handleCancelClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    createValidationState.reset();
  }, [createValidationState]);

  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        required
        fullWidth
        id="email"
        label="이메일"
        name="email"
        value={email}
        onChange={handleEmailChange}
        autoComplete="email"
        helperText={
          createValidationState.isError &&
          (isCreateValidationError(createValidationState.error)
            ? createValidationState.error.data.message
            : '알수없는 오류 발생')
        }
        error={createValidationState.isError}
        disabled={createValidationState.isSuccess}
      />
      {createValidationState.isSuccess || (
        <Box sx={{ mt: 2, mb: 1, position: 'relative' }}>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={handleIssueClick}
            disabled={createValidationState.isLoading}
          >
            인증번호 발급
          </Button>
          {createValidationState.isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      )}
      {createValidationState.isSuccess && (
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Grow in={createValidationState.isSuccess}>
            <Box sx={{ display: 'block', width: '100%' }}>
              <TextField
                required
                fullWidth
                id="code"
                label="인증번호"
                name="code"
                autoComplete="one-time-code"
              />
              <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Button
                  color="secondary"
                  variant="text"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={handleCancelClick}
                >
                  취소
                </Button>
              </Box>
            </Box>
          </Grow>
        </Box>
      )}
    </Box>
  );
};
export default ValidationForm;
