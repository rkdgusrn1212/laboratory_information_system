import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

const MemberDetailForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}
        >
          <TextField
            required
            fullWidth
            id="id"
            label="아이디"
            name="id"
            autoComplete="username"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    sx={{ whiteSpace: 'nowrap' }}
                    variant="text"
                    color="secondary"
                  >
                    중복확인
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password2"
            label="비밀번호 확인"
            type="password"
            id="password2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="name"
            name="name"
            required
            fullWidth
            id="name"
            label="성명"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="tel"
            name="tel"
            required
            fullWidth
            id="tel"
            label="전화번호"
            autoFocus
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default MemberDetailForm;
