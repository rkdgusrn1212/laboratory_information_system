import {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  ChangeEventHandler,
  ForwardRefRenderFunction,
  FormEventHandler,
} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import { SignupRequest, useSignupMutation } from '../../services/authApi';
import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import { useAppSelector } from '../../hooks';

const ValidationForm: ForwardRefRenderFunction<unknown> = (props, ref) => {
  const [validating, setValidating] = useState(false);
  const [signup, signupState] = useSignupMutation();
  const [email, setEmail] = useState<string>('');
  const signupFormState = useAppSelector((state) => state.signupForm);

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setEmail(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      signup(signupFormState.form as SignupRequest);
    },
    [],
  );

  useImperativeHandle(ref, () => email);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        required
        fullWidth
        id="email"
        label="이메일"
        name="email"
        onChange={handleEmailChange}
        autoComplete="email"
        disabled={validating}
      />
      {signupState.isSuccess || (
        <Box sx={{ mt: 2, mb: 1, position: 'relative' }}>
          <Button
            type="submit"
            fullWidth
            color="secondary"
            variant="contained"
            disabled={signupState.isLoading}
          >
            인증번호 발급
          </Button>
          {signupState.isLoading && (
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
      {signupState.isSuccess && (
        <>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color="warning"
              onClick={() => {
                setValidating(false);
              }}
              variant="text"
              sx={{ mt: 1, mb: 2 }}
            >
              이메일 변경
            </Button>
            <Button color="secondary" variant="text" sx={{ mt: 1, mb: 2 }}>
              인증번호 재발급
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
export default forwardRef(ValidationForm);
