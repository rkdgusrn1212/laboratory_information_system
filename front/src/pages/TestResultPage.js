import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ResultSearchDate, ResultSearchName } from '../components/testresult/ResultSearch';
import ResultSearchList from '../components/testresult/ResultSearchList';

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function TestResultPage() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid Paper xs={12} >
          <Box
            sx={{
              p: 6,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '1fr' }, // 한줄에 몇개
              gap: 2, // 박스간의 간격
            }}
          >
            <Paper elevation={6}>
              <Grid container spacing={2}>

                <Grid item xs={1} sx={{ ml: 2, my: 3 }} display="flex" justifyContent="center">
                  <Typography>환자 이름</Typography>
                </Grid>
                <Grid item xs={3} sx={{ my: 2 }} display="flex" justifyContent="center">
                  <ResultSearchName></ResultSearchName>
                </Grid>
                <Grid item xs={1} sx={{ mx: 3, my: 3 }} display="flex" justifyContent="center">
                  <Typography>접수 기간</Typography>
                </Grid>
                <Grid item xs={5} sx={{ my: 2, width: '100%' }} display="flex" justifyContent="center">
                  <ResultSearchDate ></ResultSearchDate>
                </Grid>
                <Grid item xs={1} sx={{ my: 2, width: '100%' }} display="flex" justifyContent="center">
                  <Button variant="contained" color="success" >
                    검색
                  </Button>
                </Grid>

              </Grid>
            </Paper>
            <Paper elevation={6}>
              <ResultSearchList></ResultSearchList>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
