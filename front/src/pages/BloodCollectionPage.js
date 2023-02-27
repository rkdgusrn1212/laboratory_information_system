import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
// Import Swiper React components
import { useState, useEffect, useRef } from 'react';
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
  const [selectedcollect, setSelectedcollect] = useState([]);

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

  const asd = [];

  const flag1 = useRef(1);
  const onSearch = (event) => {
    flag1.current = 2;
    setFlag(2);
    let count = 2; //뭔가 입력함 그러나 3번 또는 4번 플래그로 가지않음. 없는 검체번호임
    axios({
      method: 'get',
      url: `http://13.209.219.162/api/collect/specimenbyno?specimenNo=${search}`,
    }).then(function (response) {
      if (response.data != '') {
        response.data.map((collect) => {
          collect.id = collect.specimenNo + collect.orderNo;
        });

        list.map((list) => {
          if (list.specimenNo == search) {
            count = 3;
            setFlag(3);
            flag1.current = 3;
            console.log('아래 리스트와 겹침');
          }
        });

        inputlist.map((input) => {
          if (input == search) {
            flag1.current = 3;
            count = 3;
            setFlag(3);
            console.log('겹침22');
          }
        });

        if (flag1.current == 2) {
          setFlag(4);
          inputlist.push(search);
          setList([response.data[0], ...list]); //데이터가 삽입은 되는데 배열 마지막줄에 삽입이 이루어짐
          console.log(inputlist);
          console.log('flag: ' + flag);
        }
      }
    });
  };
  function postdata() {
    inputlist.map((input) => {
      // POST 요청 전송
      axios({
        method: 'post',
        url: `http://13.209.219.162/api/collect/insertcollectbypost`,
        data: {
          specimenNo: input,
          staffNo: loginstaffno, //로그인 정보로 받아오기
        },
      })
        .then(function () {
          getCollect(input);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  function getCollect(input) {
    axios({
      method: 'get',
      url: `http://13.209.219.162/api/collect/collectlistbyno?specimenNo=${input}`,
    }).then(function (response) {
      if (response.data != '') {
        response.data.map((a) => {
          a.id = a.specimenNo + a.orderNo;
          selectedcollect.push(a);
        });
      }

      collectlist().then((res) => setList(res));
    });
  }

  const onSearchHandler = (event) => {
    setSearch(event.currentTarget.value);
  };
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(); // Enter 입력이 되면 클릭 이벤트 실행
      console.log(flag);
    }
  };

  //post 방식으로 제출
  const handleClickOpen = () => {
    if (error == 1) {
      if (inputlist.length >= 1) {
        postdata();
        console.log(selectedcollect);
        setOpen(true);
      }
    }
  };

  const handleClose = (value) => {
    setSelectedcollect([]);
    setInputlist(asd);
    setOpen(false);
  };

  const columns = [
    {
      field: 'specimenNo',
      headerName: '검체번호',
      headerAlign: 'center',
      width: 80,
    },
    {
      field: 'orderNo',
      headerName: '오더번호',
      headerAlign: 'center',
    },
    {
      headerName: '처방명',
      field: 'prescriptionName',
      headerAlign: 'center',
      width: 150,
    },
    {
      field: 'specimenContainerCode',
      headerName: '용기코드',
      headerAlign: 'center',
    },
    {
      field: 'specimenTypeCode',
      headerName: '용기타입코드',
      headerAlign: 'center',
    },
    {
      field: 'patientNo',
      headerName: '환자번호',
      headerAlign: 'center',
    },
    {
      headerName: '바코드 출력자',
      field: 'printstaffNo',
      headerAlign: 'center',
      width: 120,
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
                    bgcolor: 'background.default',
                    display: 'grid',
                  }}
                >
                  <Paper
                    xs={12}
                    sx={{ minWidth: '400px', m: 2, width: '192%' }}
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
                                      {inputlist.map((input, i) => {
                                        if (i == 0) {
                                          return (
                                            <Typography variant="subtitle2">
                                              &nbsp;현재 입력된 검체번호 :{' '}
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
                                      {inputlist.map((input, i) => {
                                        if (i == 0) {
                                          return (
                                            <Typography variant="subtitle2">
                                              &nbsp;현재 입력된 검체번호 :{' '}
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
                                      {inputlist.map((input, i) => {
                                        if (inputlist.length < 1) {
                                          <Typography variant="subtitle2">
                                            현재 입력된 검체번호가 없습니다.
                                          </Typography>;
                                        } else if (i == 0) {
                                          return (
                                            <Typography variant="subtitle2">
                                              &nbsp;현재 입력된 검체번호 :{' '}
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
      <Paper sx={{ minWidth: '800px', m: 2, width: '95%' }} elevation={4}>
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
            selectedValue={selectedcollect}
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
