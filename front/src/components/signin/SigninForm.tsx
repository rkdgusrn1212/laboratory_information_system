import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LockPersonOutlined from '@mui/icons-material/LockPerson';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';

import { useSigninMutation } from '../../services/authApi';

const SigninForm = () => {
  const [authId, setAuthId] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const [signin, signinState] = useSigninMutation();

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

  const handleSigninClick: MouseEventHandler<HTMLButtonElement> = () => {
    signin({ authId, authPassword });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LockPersonOutlined fontSize="large" color="warning" sx={{ mb: 2 }} />
        <Box
          sx={{
            mt: 1,
            maxWidth: 'sm',
          }}
        >
          <TextField
            margin="normal"
            variant="filled"
            required
            fullWidth
            value={authId}
            onChange={handleIdChange}
            label="아이디"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            variant="filled"
            required
            fullWidth
            label="비밀번호"
            value={authPassword}
            onChange={handlePasswordChange}
            type={passwordVisiblity ? 'text' : 'password'}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onMouseLeave={handleMouseUpAndLeaveVisibility}
                    onMouseUp={handleMouseUpAndLeaveVisibility}
                    onMouseDown={handleMouseDownVisibility}
                  >
                    {passwordVisiblity ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Box sx={{ position: 'relative', mt: 3, mb: 2 }}>
            <Button
              onClick={handleSigninClick}
              fullWidth
              variant="contained"
              disabled={signinState.isLoading}
            >
              로그인
            </Button>

            {signinState.isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: 'primary',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          <Stack gap={1}>
            <Box display="flex" justifyContent="space-between">
              <Link color="secondary" href="#" variant="body2">
                비밀번호를 잊으셨나요?
              </Link>
              <Link
                color="secondary"
                href="/recept-consultation"
                variant="body2"
              >
                진료 접수화면
              </Link>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body2">계정이 없으신가요?</Typography>
              <Link href="/signup" variant="body2">
                가입하기
              </Link>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
export default SigninForm;
