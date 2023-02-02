import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Logo from '../components/common/Logo';

const RedirectPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);
  }, [navigate]);

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
          잘못된 요청입니다. 곧 다른 페이지로 이동됩니다.
        </Typography>
        <LinearProgress />
      </Stack>
    </Container>
  );
};
export default RedirectPage;
