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
import { useSignupMutation } from '../../services/authApi';
import { RootState } from '../../store';
import { SignupFormState } from '../../services/signupFormSlice';
import { useSelector } from 'react-redux';

const ValidationForm: ForwardRefRenderFunction<
  unknown,
  { handleSubmit: FormEventHandler<HTMLFormElement> }
> = ({ handleSubmit }, ref) => {
  const [validating, setValidating] = useState(false);
  const [signup, signupState] = useSignupMutation();
  const [email, setEmail] = useState<string>('');
  const signupFormstate = useSelector((state: RootState) => state.signupForm);

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setEmail(event.target.value);
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
      <>
        {signupFormstate.status === 'validating' && (
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
        {signupFormstate.status === 'detailsCompleted' && (
          <Button
            type="submit"
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            인증번호 발급
          </Button>
        )}
        {signupFormstate.status === 'validating' && (
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
        )}
      </>
    </Box>
  );
};
export default forwardRef(ValidationForm);
