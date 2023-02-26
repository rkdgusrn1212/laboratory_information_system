import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Title from '../components/testresultanalysis/Title';
import InputDialog from '../components/testresultinput/InputDialog';
import ProgressChart from '../components/testresultinput/ProgressChart';
import ResultList from '../components/testresultinput/ResultList';

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function TestResultInputPage() {

  const [completetest, setCompletTest] = useState('');

  const [incompletetest, setInCompleteTest] = useState('');

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '1fr' }, // 한줄에 몇개
              gap: 2, // 박스간의 간격
            }}
          >
            <Paper elevation={6}>
              <Grid sx={{ mx: 2, my: 1 }}>
                <Title >
                  검체 정보
                </Title>
              </Grid>
              <Grid >
                <InputDialog></InputDialog>
              </Grid>
            </Paper>
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '5fr 2fr' }, // 한줄에 몇개 그리고 화면 비율
              gap: 2, // 박스간의 간격
            }}
          >
            <Paper elevation={6}>
              <Grid sx={{ mx: 2, my: 1 }}>
                <Title >
                  검사 접수 리스트
                </Title>
              </Grid>
              <ResultList setCompletTest={setCompletTest} setInCompletTest={setInCompleteTest}></ResultList>
            </Paper>
            <Paper elevation={6}>
              <Grid sx={{ mx: 2, my: 1 }}>
                <Title >
                  진행 상황
                </Title>
              </Grid>
              <ProgressChart value={completetest} value2={incompletetest}></ProgressChart >
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
