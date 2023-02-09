import { useState } from 'react';

import { createTheme, Stack, ThemeProvider, Typography } from '@mui/material';
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
import Logo from '../components/common/Logo';

const theme = createTheme({
  palette: {
    primary: {
      light: '#69dbff',
      main: '#00aaff',
      dark: '#007bcb',
      contrastText: '#fff',
    },
    secondary: {
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f',
      contrastText: '#fff',
    },
    background: {
      default: '#white',
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
    value: any,
  ) => {
    setSelected(value);
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
          <Logo size={24} color="" />
        </Box>
      </Container>
      <Box sx={{ background: '#007bcb' }}>
        <Container sx={{ p: 2 }}>
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
          <Box my={5} display="flex" justifyContent="center" width="100%">
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
                    <Typography>
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
                        bgcolor: 'green',
                      }}
                    >
                      <PersonSearchOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography>
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
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default ReceptConsultationPage;
