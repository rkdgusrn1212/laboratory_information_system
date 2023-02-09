import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ReceptionConsultationForm from '../components/receptconsultation/ReceptionConsultationForm';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import orange from '@mui/material/colors/orange';
import Link from '@mui/material/Link';

import Logo from '../components/common/Logo';
import { blueGrey, green, teal } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      contrastText: teal[600],
    },
    secondary: {
      main: green[300],
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
    },
  },
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: 20,
    height: 300,
    border: 0,
    backgroundColor: '#ffffff',
    '&.Mui-disabled': {
      border: 0,
      backgroundColor: '#c0c0c0',
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:hover': {
      backgroundColor: '#aacccc',
    },
  },
}));

const ReceptConsultationPage: React.FC = () => {
  const [selected, setSelected] = useState<number | undefined>(undefined);

  const handleChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: unknown,
  ) => {
    setSelected(value as number | undefined);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ px: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            mb={3}
            mt={5}
            variant="h3"
            textAlign="start"
            color="skyblue"
            fontWeight="bold"
          >
            진료 접수
          </Typography>
          <Logo size={24} color={grey['700']} />
        </Box>
      </Container>
      <Box sx={{ background: '#007bcb' }}>
        <Container sx={{ p: 2 }}>
          {selected === undefined && (
            <Typography
              mb={3}
              mt={5}
              fontFamily="sans-serif"
              variant="h4"
              textAlign="start"
              color="white"
              fontWeight="bold"
            >
              <ContactSupportOutlinedIcon fontSize="inherit" />
              {'  '}진료를 접수하시겠습니까?
            </Typography>
          )}
          {selected === undefined && (
            <Typography
              my={2}
              px={4}
              fontFamily="sans-serif"
              variant="h5"
              textAlign="start"
              color="white"
            >
              아래 항목을 선택해주세요
            </Typography>
          )}
          <Box
            mt={5}
            mb={2}
            display="flex"
            justifyContent="center"
            width="100%"
          >
            {selected === undefined ? (
              <StyledToggleButtonGroup
                fullWidth
                color="standard"
                value={selected}
                exclusive
                onChange={handleChange}
              >
                <ToggleButton value={0}>
                  <Stack alignItems="center" spacing={3}>
                    <Typography
                      fontFamily="cafe-surround"
                      fontWeight="bold"
                      variant="h4"
                      textAlign="center"
                      color="darkblue"
                    >
                      초진 접수
                    </Typography>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        color: 'white',
                        bgcolor: 'green',
                      }}
                    >
                      <HistoryEduIcon fontSize="large" />
                    </Avatar>
                    <Typography color={blueGrey[800]}>
                      <b>병원에 처음 방문한다면</b>
                      <br /> 여기를 클릭하세요.
                    </Typography>
                  </Stack>
                </ToggleButton>
                <ToggleButton value={1}>
                  <Stack alignItems="center" spacing={3}>
                    <Typography
                      fontFamily="cafe-surround"
                      fontWeight="bold"
                      variant="h4"
                      textAlign="center"
                      color="darkblue"
                    >
                      재진 접수
                    </Typography>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        color: 'white',
                        bgcolor: orange['500'],
                      }}
                    >
                      <PersonSearchOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography color={blueGrey[800]}>
                      <b>병원에 방문한 적이 있다면</b>
                      <br /> 여기를 클릭하세요.
                    </Typography>
                  </Stack>
                </ToggleButton>
              </StyledToggleButtonGroup>
            ) : (
              <ReceptionConsultationForm isNew={selected === 1} />
            )}
          </Box>
          <Box mb={1} display="flex" justifyContent="end">
            <Link href="/" color={grey['50']}>
              의료진용 화면 가기
            </Link>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default ReceptConsultationPage;
