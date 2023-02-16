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
import {
  blueGrey,
  deepOrange,
  green,
  indigo,
  teal,
} from '@mui/material/colors';

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
      default: '#22c1c3',
    },
    error: {
      main: deepOrange[300],
    },
    info: { main: indigo[600] },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        standardInfo: {
          background:
            'linear-gradient(90deg, rgba(186,255,191,1) 60%, rgba(132,255,171,1) 100%)',
          color: indigo[600],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background:
            'linear-gradient(90deg, rgba(46,22,125,0.99) 80%, rgba(22,14,79,1) 100%)',
        },
      },
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

  const handleReset = () => {
    setSelected(undefined);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ background: '#ffffff' }}>
        <Container sx={{ px: 2, pb: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="end"
            height={80}
          >
            <Typography
              variant="h3"
              textAlign="start"
              color="#007bcb"
              fontWeight="bold"
            >
              진료 접수
            </Typography>
            <Link href="/">
              <Logo
                size={20}
                color={grey['700']}
                sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}
              />
            </Link>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          background:
            'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(0,123,203,1) 100%)',
        }}
      >
        <Container sx={{ p: 2 }}>
          {selected !== undefined && (
            <Link
              ml={1}
              mt={2}
              display="inline-block"
              underline="hover"
              color="inherit"
              onClick={handleReset}
            >
              &lt; 처음으로 돌아가기
            </Link>
          )}
          {selected === undefined && (
            <Typography
              mt={5}
              mb={3}
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
              <ReceptionConsultationForm
                onReset={handleReset}
                isNew={selected === 0}
              />
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default ReceptConsultationPage;
