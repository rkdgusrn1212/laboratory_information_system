import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import ReceptList from '../components/testrecept/ReceptList';
import Title from '../components/testresultanalysis/Title';
import { useAppSelector } from '../hooks';
import { selectAccount } from '../services/accountSlice';

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function TestReceptPage() {
  // 보내는 변수
  const [barcode, setBarCode] = useState('');
  // 받아온 변수
  const [specimenno, setSpecimenNo] = useState('');
  const [specimentypename, setSpecimenTypeName] = useState('');
  const [testprescriptionamount, setTestPrescriptionAmount] = useState('');
  const [specimencontainername, setSpecimenContainerName] = useState('');

  const [patientno, setPatientNo] = useState('');
  const [patientname, setPatientName] = useState('');
  const [patientmale, setPatientMale] = useState('');
  const [patientrrn, setPatientRrn] = useState('');

  const [prescriptioncode, setPrescriptionCode] = useState('');
  const [prescriptionname, setPrescriptionName] = useState('');

  const [nursename, setNurseName] = useState('');
  const [collectdate, setCollectDate] = useState('');
  const [doctorname, setDoctorName] = useState('');
  const [prescriptionordertime, setPrescriptionOrderTime] = useState('');

  const account = useAppSelector(selectAccount);
  const date = moment().format('YYYYMMDD');
  const showdate = moment().format('YYYY-MM-DD');

  const handlebarcode = (e) => {
    setBarCode(e.target.value);

    //  console.log(e.target.value);
  };

  //바코드 입력했을 때 검체 정보 불러오기.
  const searchbarcode = async () => {
    try {
      const searchSpecimenInfo = await axios.get(
        'http://13.209.219.162/api/test/findspecimen',
        {
          params: {
            specimenNo: barcode,
          },
        },
      );
      if (searchSpecimenInfo.data.length > 0) {
        setSpecimenNo(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .specimenNo,
        );
        setSpecimenTypeName(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .specimenTypeName,
        );
        setTestPrescriptionAmount(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .testPrescriptionAmount,
        );
        setSpecimenContainerName(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .specimenContainerName,
        );
        setPatientNo(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1].patientNo,
        );
        setPatientName(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .patientName,
        );
        if (
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .patientMale === true
        ) {
          setPatientMale('남자');
        } else if (
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .patientMale === false
        ) {
          setPatientMale('여자');
        }
        setPatientRrn(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .patientRrn,
        );
        setPrescriptionCode(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .prescriptionCode,
        );
        setPrescriptionName(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .prescriptionName,
        );
        setNurseName(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1].nurseName,
        );
        setCollectDate(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .collectDate,
        );
        setDoctorName(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .doctorName,
        );
        setPrescriptionOrderTime(
          searchSpecimenInfo.data[searchSpecimenInfo.data.length - 1]
            .prescriptionOrderTime,
        );
      }
      for (const elem of searchSpecimenInfo.data) {
        insertspecimen({
          barcode: barcode,
          prescriptioncode: elem.prescriptionCode,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchbarcode(e.target.value);
    }
  };

  const insertspecimen = (data) => {
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      url: 'http://13.209.219.162/api/test/recepttest',
      data: JSON.stringify({
        specimenNo: data.barcode,
        prescriptionCode: data.prescriptioncode,
        staffNo: account.principal.staffVo.staffNo,
        receptionDate: date,
      }),
    });
  };

  const handleinsert = (e) => {
    searchbarcode(e.target.value);
    alert('검사가 접수되었습니다.');
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.default',
              gridTemplateColumns: { md: '1fr' },
              gridTemplateRows: { md: '1fr 4fr' }, // 한줄에 몇개
              gap: 2, // 박스간의 간격
            }}
          >
            <Paper elevation={6}>
              <Grid sx={{ mx: 2, my: 1 }}>
                <Title>검사 접수</Title>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                <Grid
                  item
                  xs={9}
                  sx={{ mx: 2, mb: 2 }}
                  display="flex"
                  justifyContent="center"
                >
                  <TextField
                    sx={{ width: '100%' }}
                    label="바코드 수기 입력"
                    size="small"
                    value={barcode}
                    onChange={handlebarcode}
                    onKeyPress={handleOnKeyPress}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ mx: 2, mb: 2 }}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: '100%', display: 'center', mr: 2 }}
                    onClick={handleinsert}
                  >
                    접수
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={6}>
              <Grid sx={{ mx: 2, my: 1 }}>
                <Title>검체 정보</Title>
              </Grid>
              <Box sx={{ flexGrow: 1, mb: 3 }}>
                <Grid xs={12} sx={{ mx: 2, gap: 2 }}>
                  <Box
                    display="flex"
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                  >
                    <TextField
                      label="검체번호"
                      size="small"
                      value={specimenno}
                      disabled
                    />
                    <TextField
                      label="검체명"
                      size="small"
                      value={specimentypename}
                      disabled
                    />
                    <TextField
                      label="검체량"
                      size="small"
                      value={testprescriptionamount}
                      disabled
                    />
                    <TextField
                      label="용기명"
                      size="small"
                      value={specimencontainername}
                      disabled
                    />
                  </Box>
                </Grid>
              </Box>

              <Grid sx={{ mx: 2, my: 1 }}>
                <Title>환자 정보</Title>
              </Grid>
              <Box sx={{ flexGrow: 1, mb: 3 }}>
                <Grid xs={12} sx={{ mx: 2, gap: 2 }}>
                  <Box
                    display="flex"
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                  >
                    <TextField
                      label="환자번호"
                      size="small"
                      value={patientno}
                      disabled
                    />
                    <TextField
                      label="환자이름"
                      size="small"
                      value={patientname}
                      disabled
                    />
                    <TextField
                      label="환자성별"
                      size="small"
                      value={patientmale}
                      disabled
                    />
                    <TextField
                      label="주민번호"
                      size="small"
                      value={patientrrn}
                      disabled
                    />
                  </Box>
                </Grid>
              </Box>

              <Grid sx={{ mx: 2, my: 1 }}>
                <Title>검사 정보</Title>
              </Grid>
              <Box sx={{ flexGrow: 1, mb: 3 }}>
                <Grid xs={12} sx={{ mx: 2, gap: 2 }}>
                  <Box
                    display="flex"
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                  >
                    <TextField
                      label="검사항목코드"
                      size="small"
                      value={prescriptioncode}
                      disabled
                    />
                    <TextField
                      label="검사명"
                      size="small"
                      value={prescriptionname}
                      disabled
                    />
                    <TextField
                      label="검사접수자"
                      size="small"
                      value={account.principal.staffVo.staffName}
                      disabled
                    />
                    <TextField
                      label="검사접수일자"
                      size="small"
                      value={showdate}
                      disabled
                    />
                  </Box>
                </Grid>
              </Box>

              <Grid sx={{ mx: 2, my: 1 }}>
                <Title>채혈/진료 정보</Title>
              </Grid>
              <Box sx={{ flexGrow: 1, mb: 3 }}>
                <Grid xs={12} sx={{ mx: 2, gap: 2 }}>
                  <Box
                    display="flex"
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                  >
                    <TextField
                      label="채혈자"
                      size="small"
                      value={nursename}
                      disabled
                    />
                    <TextField
                      label="채혈일자"
                      size="small"
                      value={collectdate}
                      disabled
                    />
                    <TextField
                      label="진료의"
                      size="small"
                      value={doctorname}
                      disabled
                    />
                    <TextField
                      label="진료일자"
                      size="small"
                      value={prescriptionordertime}
                      disabled
                    />
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.default',
              gridTemplateColumns: { md: '1fr' },
              gap: 2,
            }}
          >
            <Paper elevation={6}>
              <Grid sx={{ mx: 2, my: 1 }}>
                <Title>검사 접수 목록</Title>
              </Grid>
              <Box sx={{ flexGrow: 1, mt: 3 }}>
                <Grid xs={12} sx={{ gap: 2 }}>
                  <Box
                    display="flex"
                    component="form"
                    sx={{
                      '& > :not(style)': { width: '25ch' },
                    }}
                  >
                    <ReceptList></ReceptList>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
