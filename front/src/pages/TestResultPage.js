import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResultSearchList from '../components/testresult/ResultSearchList';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Title from '../components/testresultanalysis/Title';
import axios from 'axios';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function TestResultPage() {
  const [patientname, setPatientName] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [selectedpatientlist, setSelectedPatientList] = useState([]);

  const handlepatientname = (e) => {
    setPatientName(e.target.value);
  };

  const handlepatientsearch = (e) => {
    searchpatient(e.target.value);
  };

  const searchpatient = async () => {
    try {
      const searchpatientInfo = await axios.get(
        'http://13.209.219.162/api/result/findresultlistbypatient',
        {
          params: {
            patientName: patientname,
            startDate: start,
            endDate: end,
          },
        },
      );

      searchpatientInfo.data.map((selectedpatientlist, i) => {
        selectedpatientlist.id = i;
      });

      setSelectedPatientList(searchpatientInfo.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid Paper xs={12}>
          <Box
            sx={{
              p: 6,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '1fr' },
            }}
          >
            <Paper elevation={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ ml: 2, mt: 2 }}>
                  <Title>검사 결과 조회</Title>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ ml: 2, my: 2 }}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography>환자 이름</Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ my: 1 }}
                  display="flex"
                  justifyContent="center"
                >
                  <TextField
                    sx={{ width: '100%' }}
                    label="환자이름"
                    size="small"
                    value={patientname}
                    onChange={handlepatientname}
                  />
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ mx: 3, my: 2 }}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography>접수 기간</Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sx={{ my: 1, width: '100%' }}
                  display="flex"
                  justifyContent="center"
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="시작일"
                      value={start}
                      onChange={(newstart) => {
                        setStart(newstart.format('YYYYMMDD'));
                      }}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                    <Typography sx={{ mx: 1, my: 1 }}> ~ </Typography>
                    <DatePicker
                      label="종료일"
                      value={end}
                      onChange={(newend) => {
                        setEnd(newend.format('YYYYMMDD'));
                      }}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ my: 1, width: '100%' }}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handlepatientsearch}
                  >
                    검색
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={6}>
              <ResultSearchList
                value={selectedpatientlist}
                value2={start}
                value3={end}
              ></ResultSearchList>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
