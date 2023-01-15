import * as React from 'react';
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

const SigninForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
          component="form"
          onSubmit={handleSubmit}
          noValidate
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
            id="id"
            label="아이디"
            name="id"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            variant="filled"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
          <Stack gap={1}>
            <Link color="secondary" href="#" variant="body2">
              비밀번호를 잊으셨나요?
            </Link>
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
