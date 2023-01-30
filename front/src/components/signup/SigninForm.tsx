import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SigninRequest } from '../../services/authApi';

export interface SigninFormProps {
  onSigninFormComplete: (form: SigninRequest | undefined) => void;
}

const SigninForm: React.FC<SigninFormProps> = ({ onSigninFormComplete }) => {
  const [authId, setAuthId] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const handleIdChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAuthId(event.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setAuthPassword(event.target.value);
  };

  const handleMouseUpAndLeaveVisibility = () => setPasswordVisibility(false);

  const handleMouseDownVisibility = () => setPasswordVisibility(true);

  useEffect(() => {
    if (authId.length > 0 && authPassword.length > 0) {
      onSigninFormComplete({ authId, authPassword });
    } else {
      onSigninFormComplete(undefined);
    }
  }, [authId, authPassword, onSigninFormComplete]);

  return (
    <Stack gap={1} width="100%">
      <TextField
        required
        fullWidth
        label="아이디"
        value={authId}
        onChange={handleIdChange}
        autoComplete="username"
      />
      <TextField
        required
        fullWidth
        label="비밀번호"
        value={authPassword}
        onChange={handlePasswordChange}
        type={passwordVisiblity ? 'text' : 'password'}
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onMouseLeave={handleMouseUpAndLeaveVisibility}
                onMouseUp={handleMouseUpAndLeaveVisibility}
                onMouseDown={handleMouseDownVisibility}
              >
                {passwordVisiblity ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};
export default SigninForm;
