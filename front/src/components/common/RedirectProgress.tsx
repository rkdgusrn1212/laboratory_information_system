import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Logo from './Logo';

const RedirectProgress: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Stack
        rowGap={5}
        sx={{
          minWidth: 500,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Logo size={40} />
        <Typography textAlign="center" variant="h6">
          다른 페이지로 이동하는 중...
        </Typography>
        <LinearProgress />
      </Stack>
    </Container>
  );
};
export default RedirectProgress;
