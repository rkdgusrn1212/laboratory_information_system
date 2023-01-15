import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({
    email: data.get('email'),
  });
};

const ValidationForm: React.FC = () => {
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
      <Button
        type="submit"
        fullWidth
        color="secondary"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        인증번호 발송
      </Button>
    </Box>
  );
};
export default ValidationForm;
