import {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
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
  isSignupErrorResponse,
  SignupRequest,
  useSignupMutation,
} from '../../services/authApi';
import { useAppSelector } from '../../hooks';

const ValidationForm: ForwardRefRenderFunction<unknown> = (props, ref) => {
  const [signup, signupState] = useSignupMutation();
  const [email, setEmail] = useState<string>('');
  const signupFormState = useAppSelector((state) => state.signupForm);

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setEmail(event.target.value);
    },
    [],
  );

  const handleSignupClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    signup({
      validationEmail: email,
      ...signupFormState.form,
    } as SignupRequest);
  }, [email, signup, signupFormState.form]);

  useImperativeHandle(ref, () => email);

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
          signupState.isError &&
          isSignupErrorResponse(signupState.error) &&
          signupState.error.data.message
        }
        error={signupState.isError}
        disabled={signupState.isSuccess}
      />
      {signupState.isSuccess || (
        <Box sx={{ mt: 2, mb: 1, position: 'relative' }}>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={handleSignupClick}
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
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Grow in={signupState.isSuccess}>
            <Box sx={{ display: 'block', width: '100%' }}>
              <TextField
                required
                fullWidth
                id="code"
                label="인증번호"
                name="code"
                autoComplete="one-time-code"
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button color="warning" variant="text" sx={{ mt: 1, mb: 2 }}>
                  이메일 변경
                </Button>
                <Button color="secondary" variant="text" sx={{ mt: 1, mb: 2 }}>
                  인증번호 재발급
                </Button>
              </Box>
            </Box>
          </Grow>
        </Box>
      )}
    </Box>
  );
};
export default forwardRef(ValidationForm);
