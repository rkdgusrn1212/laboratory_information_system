import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputDialog from '../components/testresultinput/InputDialog';
import ProgressChart from '../components/testresultinput/ProgressChart';
import ResultList from '../components/testresultinput/ResultList';

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function TestResultInputPage() {
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
              <Typography>바코드 수기 입력</Typography>
              <TextField
                sx={{
                  width: 600,
                  maxWidth: '80%',
                }}
                id="outlined-size-small"
                size="small"
              />
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
              <ResultList></ResultList>
            </Paper>
            <Paper elevation={6}>
              <ProgressChart></ProgressChart>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
