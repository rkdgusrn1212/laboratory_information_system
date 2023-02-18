import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
// Import Swiper React components
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//datagrid
import VaccinesIcon from '@mui/icons-material/Vaccines';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
//그리드
import BloodcollectionsDialog from '../components/bloodcollection/BloodcollectionDialog';
import { collectlist } from '../components/bloodcollection/CollectList';

//UI통일성을 위한 배경
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import axios from 'axios';
import ScaleLoader from 'react-spinners/ScaleLoader';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });
//로그인한 계정 정보 받아오기
import { selectAccount } from '../services/accountSlice';
import { useAppSelector } from '../hooks';

export default function BloodCollectionPage() {
  const [open, setOpen] = React.useState(false);

  const [inputlist, setInputlist] = useState([]);
  const [list, setList] = useState([]); //get
  //----검색기능
  const [search, setSearch] = useState(''); //검색하는 단어
  const [state, setState] = useState([]); //검색 결과
  const [pagestarter, setPagestarter] = useState([]); //반응형 그리드를 만들기위한 변수설정
  const [flag, setFlag] = useState(1);
  //db연결 오류
  const [error, setError] = useState(1);
  const account = useAppSelector(selectAccount); //로그인한  계정 정보
  const [loginstaffno, setLoginstaffno] = useState(1);

  useEffect(() => {
    collectlist().then((res) => {
      if (res.data == 'error') {
        setError(-100);
      }
      setList(res);
    });
    setLoginstaffno(account.principal.staffVo.staffNo);
    setPagestarter({
      starter: [{ id: 1 }],
    });
  }, []);

  function postdata() {
    inputlist.map((input) => {
      // POST 요청 전송
      axios({
        method: 'post',
        url: `http://localhost:8080/api/collect/insertcollectbypost`,
        data: {
          specimenNo: input,
          staffNo: loginstaffno, //로그인 정보로 받아오기
        },
      })
        .then(function () {
          collectlist().then((res) => setList(res));
        })
        .catch((error) => {
          console.log(error);
        });
    });
    alert('생성이 완료되었습니다.');
  }

  const onSearchHandler = (event) => {
    setSearch(event.currentTarget.value);
  };
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const onSearch = (event) => {
    setFlag(2); //뭔가 입력함 그러나 3번 또는 4번 플래그로 가지않음. 없는 검체번호임
    axios({
      method: 'get',
      url: `http://localhost:8080/api/collect/specimenbyno?specimenNo=${search}`,
    }).then(function (response) {
      if (response.data != '') {
        response.data.id = response.data.specimenNo;

        list.map((list) => {
          if (list.id == search) {
            setFlag(4);

            console.log('겹침');
            console.log('4 flag: ' + flag);
          }
        });

        inputlist.map((input) => {
          if (input.id == search) {
            setFlag(4);
            console.log('겹침22');
            console.log('4-2 flag: ' + flag);
          }
        });

        if (flag == 2) {
          setFlag(3);
          inputlist.push(search);
          setList([response.data, ...list]); //데이터가 삽입은 되는데 배열 마지막줄에 삽입이 이루어짐
          console.log(inputlist);
          console.log('flag: ' + flag);
        }
      }
    });
  };
  //post 방식으로 제출
  const handleClickOpen = () => {
    if (error == 1) {
      postdata();

      setOpen(true);
    }
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  //받아온 json파일 전처리
  function rowsbeforesetting(rows) {
    rows.map((a) => {
      a.status = 0;
    });
  }

  const columns = [
    {
      field: 'id',
      headerName: '검체번호',
      headerAlign: 'center',
      width: 80,
    },
    {
      headerName: '검사명',
      field: 'testName',
      headerAlign: 'center',
    },
    {
      field: 'testContainer',
      headerName: '용기명',
      headerAlign: 'center',
    },
    {
      field: 'patientNO',
      headerName: '환자번호',
      headerAlign: 'center',
    },
    {
      field: 'fieldName',
      headerName: '검사분야명',
      headerAlign: 'center',
    },
    {
      headerName: '바코드 출력자',
      field: 'printstaffNo',
      headerAlign: 'center',
      width: 60,
    },
    {
      headerName: '바코드 출력일시',
      field: 'specimenDate',
      headerAlign: 'center',
      type: 'dateTime',
      width: 200,
    },
    {
      headerName: '채혈자',
      field: 'staffNo',
      headerAlign: 'center',
      width: 60,
    },
    {
      headerName: '채혈일시',
      field: 'collectDate',
      headerAlign: 'center',
      width: 200,
      type: 'dateTime',
    },
  ];

  return (
    <Grid>
      <Grid>
        <Grid container spacing={2}>
          {[lightTheme].map((theme, index) => (
            <Grid item xs={6} key={index}>
              <ThemeProvider theme={theme}>
                <Box
                  xs={12}
                  sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <Paper
                    xs={12}
                    sx={{ minWidth: '500px', m: 1, width: '140vh' }}
                    elevation={4}
                  >
                    <Grid item xs={4} sx={{ mx: 7 }}>
                      <h3> 채혈정보</h3>
                    </Grid>

                    <Box
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <Grid sx={{ mx: 5, float: 'left' }}>
                        <Typography variant="subtitle1">
                          &nbsp;바코드 수기입력
                        </Typography>
                        {error == 1 &&
                          pagestarter.starter &&
                          pagestarter.starter.map(() => {
                            if (!pagestarter.starter) {
                              return <Grid>no data</Grid>;
                            } else {
                              if (flag == 1) {
                                return (
                                  <Typography variant="subtitle2">
                                    &nbsp;검색을 진행하여 주세요
                                  </Typography>
                                );
                              } else if (flag == 2) {
                                return (
                                  <>
                                    <Typography variant="subtitle2">
                                      &nbsp;잘못된 검체 번호입니다.
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      &nbsp;현재 입력된 검체번호 :{' '}
                                      {inputlist.map((input, i) => {
                                        if (i == 0) {
                                          return (
                                            <Typography variant="subtitle2">
                                              {input}
                                            </Typography>
                                          );
                                        } else {
                                          return (
                                            <Typography variant="subtitle2">
                                              ,{input}
                                            </Typography>
                                          );
                                        }
                                      })}
                                    </Typography>
                                  </>
                                );
                              } else if (flag == 3) {
                                return (
                                  <>
                                    <Typography variant="subtitle2">
                                      &nbsp;검체가 입력되었습니다.
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      &nbsp;현재 입력된 검체번호 :{' '}
                                      {inputlist.map((input, i) => {
                                        if (i == 0) {
                                          return (
                                            <Typography variant="subtitle2">
                                              {input}
                                            </Typography>
                                          );
                                        } else {
                                          return (
                                            <Typography variant="subtitle2">
                                              ,{input}
                                            </Typography>
                                          );
                                        }
                                      })}
                                    </Typography>
                                  </>
                                );
                              } else if (flag == 4) {
                                return (
                                  <>
                                    <Typography variant="subtitle2">
                                      &nbsp;이미 채혈이 완료된 검체입니다.
                                    </Typography>

                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      &nbsp;현재 입력된 검체번호 :{' '}
                                      {inputlist.map((input, i) => {
                                        if (i == 0) {
                                          return (
                                            <Typography variant="subtitle2">
                                              {input}
                                            </Typography>
                                          );
                                        } else {
                                          return (
                                            <Typography variant="subtitle2">
                                              ,{input}
                                            </Typography>
                                          );
                                        }
                                      })}
                                    </Typography>
                                  </>
                                );
                              }
                            }
                          })}
                      </Grid>

                      <Grid
                        sx={{ display: 'flex', justifyContent: 'right', mx: 5 }}
                      >
                        <FormControl variant="standard">
                          <Grid>
                            <InputLabel htmlFor="input-with-icon-adornment">
                              검체정보 검색
                            </InputLabel>
                            <Input
                              sx={{ m: 1, width: '50ch' }}
                              id="input-with-icon-adornment"
                              startAdornment={
                                <InputAdornment position="start">
                                  <VaccinesIcon />
                                </InputAdornment>
                              }
                              label="Required"
                              value={search}
                              placeholder="검체번호(바코드번호)"
                              onChange={onSearchHandler}
                              onKeyPress={handleOnKeyPress}
                              required
                            />
                          </Grid>
                        </FormControl>
                        <Grid sx={{ my: 1, float: 'right' }}>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={onSearch}
                          >
                            입력
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Box>
              </ThemeProvider>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Paper sx={{ minWidth: '500px', mx: 3, width: '140vh' }} elevation={4}>
        <Grid sx={{ height: '500px', width: '100%' }}>
          {pagestarter.starter &&
            pagestarter.starter.map(() => {
              if (!pagestarter.starter) {
                return <Grid>no data</Grid>;
              } else {
                return (
                  <DataGrid
                    components={{
                      Toolbar: GridToolbar,
                      NoRowsOverlay: () => (
                        <Grid container spacing={2}>
                          <Grid
                            sx={{
                              textAlign: 'center',
                              justifyContent: 'center',
                              width: '120%',
                              my: 30,
                            }}
                          >
                            <ScaleLoader color="#36d7b7" />
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                            >
                              연결 중
                            </Typography>
                          </Grid>
                        </Grid>
                      ),
                    }}
                    rows={list}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick //셀렉트 금지
                  />
                );
              }
            })}
        </Grid>
        <br />
        <Grid
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <BloodcollectionsDialog
            selectedValue={inputlist}
            open={open}
            onClose={handleClose}
          />
          <Button
            color="success"
            variant="contained"
            sx={{ width: '100%' }}
            onClick={handleClickOpen}
          >
            채혈자 및 채혈시간 업데이트
          </Button>
        </Grid>
      </Paper>
      <p />
    </Grid>
  );
}
