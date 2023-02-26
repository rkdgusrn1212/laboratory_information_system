import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import PatientInformation from '../components/testresultanalysis/PatientInformation';
import SelectedTestResult from '../components/testresultanalysis/SelectedTestResult';
import TimeSeriesChart from '../components/testresultanalysis/TimeSeriesChart';

const mdTheme = createTheme();


export default function TestResultAnalysisPage() {

  const location = useLocation();

  const b = location.state.b;
  const c = location.state.c;
  const d = location.state.d;
  const e = location.state.e;
  const f = location.state.f;

  console.log(b+" "+c+" "+d+" "+e+" "+f);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              {/* 검사결과 */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <TimeSeriesChart c={c} d={d} e={e} f={f}></TimeSeriesChart>
                </Paper>
              </Grid>
              {/* 환자정보 */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <PatientInformation c={c} d={d} e={e} f={f}></PatientInformation>
                </Paper>
              </Grid>
              {/* 선택된 검사 */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <SelectedTestResult c={c} d={d} e={e} f={f}></SelectedTestResult>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

