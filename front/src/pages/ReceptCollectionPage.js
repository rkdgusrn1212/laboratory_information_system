import AccountCircle from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

// 여기까진 데이타 그리드 +검색
import Button from '@mui/material/Button';
// Import Swiper React components
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//카드
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
//그리드
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
//체크박스
//다잉얼로그
import ReceptCollectionDialog from '../components/receptcollection/ReceptCollectionDialog';
//검색셜과 미리보기
import { Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';
//그리드에 색깔 넣기

import { PatientList } from '../components/receptcollection/PatientList';

//-----------------------카드
export default function ReceptCollectionPage() {
  const [patientlist, setpatientlist] = useState([]);
  const [search, setSearch] = useState(''); //검색하는 단어
  const [callpatient, setCallpatient] = useState([]); //검색 결과
  const [find, setFind] = useState(''); //검색하는 단어
  const [selectedp, setSelectedp] = useState(0); //선택한 사람
  const [plength, setPLength] = useState(0); //검색결과수
  const [rows1, setRows1] = useState([]); //검색한 환자로 처방결과를 받아오는 값
  const [nawon, setNawon] = useState([]); // 내원 검색 결과
  const [selectedn, setSelectedn] = useState(0); //선택한 내원정보
  const [ordern, setOrder] = useState([]); //반응형 그리드를 만들기위한 변수설정
  const [rows3, setRows3] = useState([]); //첫번째 그리드에서 선택한 값들
  const [rows5, setRows5] = useState([]); //바코드를 출력할 처방정보
  const [selectionModel1, setSelectionModel1] = React.useState([]); // 첫번째 그리드에서 선택한 값들
  const [selectionModel2, setSelectionModel2] = React.useState([]); //바코드를 출력할 처방정보
  // 여기까진 검색 기능구현
  const [open, setOpen] = React.useState(false); //다이얼로그
  //검색결과 미리보기
  const [input, setInput] = useState('');
  //리셋용 배열
  const resetrow = [];
  //선택한 그리드1의 값들 그리드 2로 이동
  const rows2 = [];

  //검색창 미리보기 구현
  useEffect(() => {
    PatientList().then((res) => setpatientlist(res));
  }, []);
  const handleInput = (e) => {
    console.log(e.target.value);
    setInput(e.target.value.toLowerCase());
    setSearch(e.target.value);
  };
  const onSearchHandler = (event) => {
    setSearch(event.currentTarget.value);
  };
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSelectedp(-100);
      onSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  function onP() {
    fetch(
      `http://localhost:8080/api/collect/patientbyname?patientName=${search}`,
      {
        method: 'GET',
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //전처리
        data.map((patient) => {
          patient.patientAge += '세';

          if (patient.patientMale === '1') patient.patientMale = '남자';
          else {
            patient.patientMale = '여자';
          }
        });
        setCallpatient({
          patients: data,
        });
        setPLength(data.length);
      });
  }

  const onSearch = (event) => {
    onP();
    // setState(json);
    // setPLength(json.products.length);
    setFind(search);
    console.log(callpatient.patients);
  };
  //받아온 json파일 전처리
  function rowsbeforesetting(rows) {
    rows.map((a) => {
      a.status = 0;
    });
  }
  // //받아온 환자 json파일 전처리
  // function onPbeforesetting() {
  //     console.log("onPbeforesetting")
  //     callpatient.patients.map((a) => {
  //         if (a.patientmale === "1") {
  //             a.patientmale = "male"
  //             console.log("onPbeforesetting1")
  //         }
  //         else {
  //             console.log("onPbeforesetting2")
  //             a.patientmale = "female"
  //         }
  //     })
  // }

  const rows = [
    {
      //처방 정보
      p_code: 'L20',
      id: 2211150001,
      visit_no: 1,
      order_date: '22-11-15',
      test_container: '용기명1',
      staff_name: '김의사',
      department_name: '소화기내과(GI) - 제2병동',
      test_name: '검사명1',
    },
    {
      p_code: 'L20',
      id: 2211150002,
      visit_no: 1,
      order_date: '22-11-15',
      test_container: '용기명2',
      staff_name: '김의사',
      department_name: '소화기내과(GI) - 제2병동',
      test_name: '검사명2',
    },
    {
      p_code: 'L20',
      id: 2212160003,
      visit_no: 2,
      order_date: '22-12-16',
      test_container: '용기명3',
      staff_name: '김의사',
      department_name: '소화기내과(GI) - 제2병동',
      test_name: '검사명3',
    },
    {
      p_code: 'L20',
      id: 2301050004,
      visit_no: 3,
      order_date: '23-01-05',
      test_container: '용기명4',
      staff_name: '나의사',
      department_name: '신경외과(NS) - 제1병동',
      test_name: '검사명5',
    },
    {
      p_code: 'L20',
      id: 2301180005,
      visit_no: 4,
      order_date: '23-01-18',
      test_container: '용기명4',
      staff_name: '나의사',
      department_name: '신경외과(NS) - 제1병동',
      test_name: '검사명5',
    },
    {
      p_code: 'L20',
      id: 2301870003,
      visit_no: 5,
      order_date: '23-01-27',
      test_container: '용기명3',
      staff_name: '김의사',
      department_name: '소화기내과(GI) - 제2병동',
      test_name: '검사명3',
    },
  ];
  const columns = [
    {
      field: 'p_code',
      headerName: '처방코드',
      headerAlign: 'center',
    },
    // {
    //     field: 'visit_no',
    //     headerName: '내원번호',
    //     headerAlign: 'center',

    // },
    {
      field: 'order_date',
      headerName: '오더일자',
      headerAlign: 'center',
      type: 'date',
    },
    {
      field: 'test_container',
      headerName: '용기명',
      headerAlign: 'center',
    },
    {
      headerName: '검사명',
      field: 'test_name',
      headerAlign: 'center',
    },
    {
      field: 'staff_name',
      headerName: '담당의',
      headerAlign: 'center',
    },
    {
      headerName: '진료과',
      field: 'department_name',
      headerAlign: 'center',
      width: 300,
    },
  ];

  const columns2 = [
    {
      headerName: '검사명',
      field: 'test_name',
      headerAlign: 'center',
      width: 300,
    },
    {
      field: 'test_container',
      headerName: '용기명',
      headerAlign: 'center',
    },
    {
      field: 'p_code',
      headerName: '처방코드',
      headerAlign: 'center',
    },
  ];

  // -------------다이얼로그

  const handleClickOpen = () => {
    grid2buttonclick();
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  //환자 선택
  const selectpatient = (i) => {
    rowsbeforesetting(rows); //전처리
    setRows1(rows); //입력

    setSelectedp(i);
    // 선택한 환자로 내원 받아오기
    setNawon({
      visits: [
        {
          visitno: 1,
          v_doc: '김의사',
          department_name: '소화기내과(GI) - 제2병동',
          visit_date: '22-11-15',
        },
        {
          visitno: 2,
          v_doc: '김의사',
          department_name: '소화기내과(GI) - 제2병동',
          visit_date: '22-12-16',
        },
        {
          visitno: 3,
          v_doc: '나의사',
          department_name: '신경외과(NS) - 제1병동',
          visit_date: '23-01-5',
        },
        {
          visitno: 4,
          v_doc: '나의사',
          department_name: '신경외과(NS) - 제1병동',
          visit_date: '23-01-18',
        },
        {
          visitno: 5,
          v_doc: '김의사',
          department_name: '소화기내과(GI) - 제2병동',
          visit_date: '23-01-27',
        },
      ],
    });
    // 선택한 환자로 처방 받아오기

    //반응형 그리드를 만들기위한 변수설정
    setOrder({
      order: [{ id: 1 }],
    });
  };

  //내원정보 카드 글릭시 내원카드 선택
  const clickcard = (i) => {
    setSelectedn(i + 1); //i는 0부터 시작 로넘은 1부터 시작함
    rows.map((a, b) => {
      if (nawon.visits[i].visitno === a.visit_no) {
        rows[b].status = 1;
        //그리드 객체에서
        //getRowClassName={(params) => `super-app-theme--${params.row.status}`}
      }
    });
    //선택한 내원정보가 있는 처방정보의 상태값을 전부 바꿔야함
    setRows1(rows);
  };

  function grid1buttonclick() {
    // rows2 = resetrow;
    setRows3(resetrow); //초기화

    // console.log("selectionModel1:" + selectionModel1)
    selectionModel1.map((id) => {
      // console.log("id:" + id)//선택된 값들의 id들
      rows.map((row) => {
        if (row.id === id) {
          // console.log("id:" + row.id)
          rows2.push({
            p_code: row.p_code,
            id: row.id,
            visit_no: row.visit_no,
            order_date: row.order_date,
            test_container: row.test_container,
            staff_name: row.staff_name,
            department_name: row.department_name,
            test_name: row.test_name,
          });
        }
      });
    });
    setRows3(rows2);
  }

  //선택한 그리드2의 값들로 다이얼로그를 통해 바코드 생성
  const rows4 = [];
  function grid2buttonclick() {
    // console.log("selectionModel2:" + selectionModel2)
    selectionModel2.map((id) => {
      // console.log("id:" + id)//선택된 값들의 id들
      rows.map((row) => {
        if (row.id === id) {
          // console.log("id:" + row.id)
          rows4.push({
            id: row.id,
            visit_no: row.visit_no,
            order_date: row.order_date,
            specimen_no: row.specimen_no,
            test_container: row.test_container,
            staff_name: row.staff_name,
            department_name: row.department_name,
            test_name: row.test_name,
          });
        }
      });
    });

    setRows5(rows4);
    //바코드 출력시간의 현재시간으로 입력해야 함
    //db에 이정보들을 입력하여야 함
  }

  return (
    <Grid>
      <p></p>
      <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ minWidth: 275, width: '95%' }}>
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <Grid sx={{ maxHeight: '500px', overflowY: 'scroll' }}>
                <h3>&nbsp; 환자 정보 검색창</h3>
                <Grid sx={{ textAlign: 'right' }}>
                  <Autocomplete
                    onKeyPress={handleOnKeyPress}
                    disablePortal
                    id="combo-box-demo"
                    options={patientlist.map((item) => item.patientName)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="이름으로 검색"
                        onSelect={handleInput}
                        sx={{
                          width: 350,
                          margin: '10px auto',
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    mx: 3,
                  }}
                >
                  <FormControl variant="standard">
                    <Grid>
                      <InputLabel htmlFor="input-with-icon-adornment">
                        환자정보 검색
                      </InputLabel>
                      <Input
                        sx={{ m: 1, width: '50ch' }}
                        id="input-with-icon-adornment"
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                        label="Required"
                        value={search}
                        placeholder="환자이름, 번호, 주민번호"
                        onChange={onSearchHandler}
                        onKeyPress={handleOnKeyPress}
                      />
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 14 }}>
                    {find} (으)로 검색된 환자 총 {plength}건입니다.
                  </Typography>
                </Grid>
                {callpatient.patients &&
                  callpatient.patients.map((patient, i) => {
                    if (!callpatient.patients) {
                      return <Grid>no data</Grid>;
                    } else if (selectedp === i + 1)
                      return (
                        <Grid
                          sx={{
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            mx: 3,

                            // backgroundColor: '#99CBED'
                          }}
                        >
                          <Grid>
                            <CheckIcon fontSize="large" sx={{ my: 2 }} />
                          </Grid>
                          <Grid item xs={3} sx={{}}>
                            <TextField
                              disabled
                              id="filled-disabled"
                              label="환자이름"
                              defaultValue=""
                              variant="filled"
                              value={patient.patientName}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={3} sx={{}}>
                            <TextField
                              disabled
                              id="filled-disabled"
                              label="성별/나이"
                              defaultValue=""
                              variant="filled"
                              value={
                                patient.patientMale + '/' + patient.patientAge
                              }
                              size="small"
                            />{' '}
                          </Grid>
                          <Grid item xs={3} sx={{}}>
                            <TextField
                              disabled
                              id="filled-disabled"
                              label="주민번호"
                              defaultValue=""
                              variant="filled"
                              value={patient.patientRrn}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={3} sx={{}}>
                            <TextField
                              disabled
                              id="filled-disabled"
                              label="환자번호"
                              defaultValue=""
                              variant="filled"
                              //value={find}
                              value={patient.patientNo}
                              size="small"
                            />
                          </Grid>
                          <Grid>
                            <CheckIcon fontSize="large" sx={{ my: 2 }} />
                          </Grid>
                        </Grid>
                      );
                    else if (selectedp === -100) {
                      return (
                        <Grid
                          sx={{
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            mx: 3,
                            '&:hover': {
                              backgroundColor: '#a0a0a0',
                            },
                          }}
                          onClick={(e) => selectpatient(i + 1)}
                        >
                          <Grid item xs={3} sx={{}}>
                            <TextField
                              disabled
                              id="filled-disabled"
                              label="환자이름"
                              defaultValue="검색창에 값을 입력하세요"
                              variant="filled"
                              value={patient.patientName}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={3} sx={{}}>
                            <TextField
                              disabled
                              id="filled-disabled"
                              label="성별/나이"
                              defaultValue="검색창에 값을 입력하세요"
                              variant="filled"
                              value={
                                patient.patientMale + '/' + patient.patientAge
                              }
                              size="small"
                            />{' '}
                          </Grid>
                          <Grid item xs={3} sx={{}}>
                            <TextField
                              disabled
                              id="filled-disabled"
                              label="주민번호"
                              defaultValue="검색창에 값을 입력하세요"
                              variant="filled"
                              value={patient.patientRrn}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={3} sx={{}}>
                            <TextField
                              disabled
                              id="filled-disabled"
                              label="환자번호"
                              defaultValue="검색창에 값을 입력하세요"
                              variant="filled"
                              //value={find}
                              value={patient.patientNo}
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {/* ----------------------------------------------------------------- 내원 사이드 */}
      <Grid sx={{ minWidth: ' 1450px' }}>
        <Grid sx={{ width: '18%', float: 'left', mx: 1 }}>
          <Card
            sx={{
              height: '700px',
              minWidth: 275,
              width: '95%',
              mx: 1,
              overflowY: 'scroll',
            }}
          >
            <CardContent>
              <h3>내원정보</h3>
              {nawon.visits &&
                nawon.visits.map((visit, i) => {
                  if (!nawon.visits) {
                    return <Grid>no data</Grid>;
                  } else {
                    if (selectedn === i + 1) {
                      return (
                        <>
                          <Card
                            className="nawoncard"
                            onClick={(e) => clickcard(i)}
                            variant="outlined"
                            sx={{
                              minWidth: 200,
                              backgroundColor: '#ABCBAD',
                              borderColor: '#000',
                              '&:hover': {
                                backgroundColor: '#96BE98',
                              },
                            }}
                          >
                            <CardContent
                              sx={{
                                alignItems: 'self-end',
                                justifyContent: 'flex-end',
                                background:
                                  'linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
                                borderColor: '#000',
                              }}
                            >
                              <Grid>
                                <Grid sx={{ display: 'flex' }}>
                                  <Grid sx={{ float: 'left' }}>
                                    <Typography sx={{ fontSize: 14 }}>
                                      {i + 1}번째
                                    </Typography>
                                  </Grid>
                                  <Grid sx={{ float: 'right' }}>
                                    <Typography
                                      sx={{ fontSize: 14 }}
                                      color="text.secondary"
                                      gutterBottom
                                    >
                                      내원일자: {visit.visit_date}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Typography variant="body2" component="div">
                                  내원과:{visit.department_name}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="text.secondary"
                                >
                                  진료의: {visit.v_doc}
                                </Typography>
                              </Grid>
                            </CardContent>
                          </Card>
                          <p />
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Card
                            className="nawoncard"
                            onClick={(e) => clickcard(i)}
                            variant="outlined"
                            sx={{
                              minWidth: 200,
                              backgroundColor: '#fff',
                              borderColor: '#000',
                              '&:hover': {
                                backgroundColor: '#a0a0a0',
                              },
                              // '&:height_scroll': {
                              //     height: '800px',
                              //     overflowX: 'hidden',
                              //     overflowY: 'auto'
                              // },
                            }}
                          >
                            <CardContent
                              sx={{
                                alignItems: 'self-end',
                                justifyContent: 'flex-end',
                                background:
                                  'linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
                                borderColor: '#000',
                              }}
                            >
                              <Grid>
                                <Grid sx={{ display: 'flex' }}>
                                  <Grid sx={{ float: 'left' }}>
                                    <Typography sx={{ fontSize: 14 }}>
                                      {i + 1}번째
                                    </Typography>
                                  </Grid>
                                  <Grid sx={{ float: 'right' }}>
                                    <Typography
                                      sx={{ fontSize: 14 }}
                                      color="text.secondary"
                                      gutterBottom
                                    >
                                      내원일자: {visit.visit_date}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Typography variant="body2" component="div">
                                  내원과:{visit.department_name}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="text.secondary"
                                >
                                  진료의: {visit.v_doc}
                                </Typography>
                              </Grid>
                            </CardContent>
                          </Card>
                          <p />
                        </>
                      );
                    }
                  }
                })}
            </CardContent>
          </Card>
        </Grid>
        {ordern.order &&
          ordern.order.map((id, i) => {
            if (!ordern.order) {
              return <Grid>no data</Grid>;
            } else {
              return (
                <Card sx={{ minWidth: '1100px', width: '80%', marginleft: 20 }}>
                  <CardContent sx={{ minWidth: 500 }}>
                    <Box
                      sx={{
                        height: 500,
                        width: '38%',
                        float: 'right',
                      }}
                    >
                      <h3>채취할 처방정보</h3>
                      <DataGrid
                        rows={rows3}
                        columns={columns2}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        checkboxSelection
                        onSelectionModelChange={(newSelectionModel) => {
                          setSelectionModel2(newSelectionModel);
                        }}
                        selectionModel={selectionModel2}
                      />
                      <br />
                      <Button
                        sx={{ width: '100%' }}
                        variant="contained"
                        onClick={handleClickOpen}
                      >
                        채취버튼
                      </Button>
                      <ReceptCollectionDialog
                        open={open}
                        onClose={handleClose}
                      />
                    </Box>
                    <Grid sx={{ my: 40, float: 'right' }}>
                      <ArrowForwardIcon />
                      &nbsp;&nbsp;
                    </Grid>

                    <Box
                      sx={{
                        height: 500,
                        width: '58%',
                        float: 'left',
                        '& .super-app-theme--1': {
                          bgcolor: '#ABCBAD',
                          '&:hover': {
                            bgcolor: '#96BE98',
                          },
                        },
                      }}
                    >
                      <h3>처방정보</h3>

                      <DataGrid
                        rows={rows1}
                        columns={columns}
                        // getRowClassName={(params) => {
                        //     if (selectedn === `${params.row.id}`) {
                        //         return 'super-app-theme--1'
                        //     }
                        // }}
                        getRowClassName={(params) =>
                          `super-app-theme--${params.row.status}`
                        }
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        checkboxSelection
                        // isRowSelectable={(params) => params.row.specimen_no < 50000}// 나중에 구현 할것 오른쪽에 넘어간 값 받아오는것
                        onSelectionModelChange={(newSelectionModel) => {
                          setSelectionModel1(newSelectionModel);
                        }}
                        selectionModel={selectionModel1}
                      />

                      <br />
                      <Button
                        sx={{ width: '100%' }}
                        variant="outlined"
                        onClick={grid1buttonclick}
                      >
                        리스트 등록
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            }
          })}
      </Grid>
    </Grid>
  );
}
