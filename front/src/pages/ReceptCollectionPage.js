import AccountCircle from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
import { useEffect, useRef, useState } from 'react';
//그리드에 색깔 넣기
import axios from 'axios';
import JsBarcode from 'jsbarcode';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { PatientList } from '../components/receptcollection/PatientList';
import { useAppSelector } from '../hooks';
import { selectAccount } from '../services/accountSlice';

//만약 선택한 처방의 오더에 해당하는 검체 가 이미 있을때 알람만 준다.

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
  const [pagestarter, setPagestarter] = useState([]); //반응형 그리드를 만들기위한 변수설정

  const [rows3, setRows3] = useState([]); //첫번째 그리드에서 선택한 값들
  const [selectionModel1, setSelectionModel1] = React.useState([]); // 첫번째 그리드에서 선택한 값들
  const [selectionModel2, setSelectionModel2] = React.useState([]); //바코드를 출력할 처방정보
  const [flagnawon, setFlagnawon] = useState(1);
  const [rows5, setRows5] = useState([]);
  // 여기까진 검색 기능구현
  const [open, setOpen] = React.useState(false); //다이얼로그
  //검색결과 미리보기
  const [input, setInput] = useState('');
  //리셋용 배열
  const resetrow = [];
  //선택한 그리드1의 값들 그리드 2로 이동
  const [flag, setFlag] = useState(1);
  //검색창 미리보기 구현

  //db연결 오류
  const [error, setError] = useState(1); //

  const [loginstaffno, setLoginstaffno] = useState(1);
  const account = useAppSelector(selectAccount); //로그인한  계정 정보

  const imageUrl23 = useRef('');
  const imageUrl1 = [];
  const [imageUrl, setImageUrl] = useState([]);
  //만약 선택한 처방 정보의 해당하는 오더에 검체가 이미 있을때
  //다잉얼로그 열기

  useEffect(() => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    PatientList().then((res) => {
      if (res.data == 'error') {
        setError(-100);
      }
      setpatientlist(res);
    });
    setLoginstaffno(account.principal.staffVo.staffNo);
    setPagestarter({
      starter: [{ id: 1 }],
    });
  }, []);
  //데이터 불러오는 axios

  function onP() {
    //이름으로 환자 볼러오기
    axios({
      method: 'get',
      url: `http://13.209.219.162/api/patient/list?pageSize=1000&pageStart=0&patientNameKey=${search}`,
    }).then(function (response) {
      if (response.data != '') {
        console.log(response.data);
        error == 1 &&
          response.data.map((patient) => {
            patient.id = patient.patientNo;
            if (patient.patientMale === true) patient.patientMale = '남';
            else {
              patient.patientMale = '여';
            }
            const today = new Date();
            const birthDate = new Date(patient.patientBirth); // 2000년 8월 10일
            patient.age = today.getFullYear() - birthDate.getFullYear() + 1;
          });
        setCallpatient({
          patients: response.data,
        });
        setPLength(response.data.length);
      } else {
        axios({
          method: 'get',
          url: `http://13.209.219.162/api/patient/list?pageSize=1000&pageStart=0&patientNoKey=${search}`,
        }).then(function (response) {
          if (response.data != '') {
            console.log(response.data);
            error == 1 &&
              response.data.map((patient) => {
                patient.id = patient.patientNo;
                if (patient.patientMale === true) patient.patientMale = '남';
                else {
                  patient.patientMale = '여';
                }
                const today = new Date();
                const birthDate = new Date(patient.patientBirth); // 2000년 8월 10일
                patient.age = today.getFullYear() - birthDate.getFullYear() + 1;
              });
            setCallpatient({
              patients: response.data,
            });
            setPLength(response.data.length);
          }
        });
      }
    });
  }

  function onvisit(patientNo) {
    //환자no로  내원 볼러오기
    axios({
      method: 'get',
      url: `http://13.209.219.162/api/collect/getconsultationPatientNo?PatientNo=${patientNo}`,
    }).then(function (response) {
      if (response.data != '') {
        console.log(response.data);
        error == 1 &&
          response.data.map((visit) => {
            visit.id = visit.visitNo;
          });

        setNawon(response.data);
      } else {
        setNawon([{ id: -100 }]);
      }
    });
  }
  const checker = useRef(0);
  function onpre(patientNo) {
    //환자no로  처방 볼러오기
    axios({
      method: 'get',
      url: `http://13.209.219.162/api/prescription-order/full-test-prescription-order/list?pageSize=1000&pageStart=0&PatientNo=${patientNo}&consultationTimeOrder=DESC`,
    }).then(function (response) {
      if (response.data != '') {
        console.log(response.data);
        error == 1 &&
          response.data.map((pre, i) => {
            pre.id = i;
            pre.status = 0;
            pre.patientName = callpatient.patients[0].patientName;
          });

        setRows1(response.data);
      } else {
        setRows1({ id: -100 });
      }
    });
  }
  const rows6 = [];
  //검체를 생성하는 함수
  function createspecimen() {
    //같으면 채혈접수만
    //다르면 검체 생성까지
    checker.current = 1;
    rows4.map((postdata, i) => {
      rows6.push({
        orderNo: postdata.prescriptionOrderNo,
        staffNo: loginstaffno,
        specimenContainerCode: postdata.specimenContainerCode,
      });
    });

    axios({
      method: 'post',
      url: `http://13.209.219.162/api/collect/inserttest2`,
      data: rows6,
    }).then(function (response) {
      response.data.map((a) => {
        if (a.specimenNo != null) {
          const canvas = document.createElement('canvas');
          JsBarcode(canvas, a.specimenNo, {
            height: 50,
            displayValue: true,
          });
          imageUrl1.push(canvas.toDataURL('image/png'));
        } else {
          imageUrl1.push('검체가 통합되었습니다.');
        }
      });

      setImageUrl(imageUrl1);

      setOpen(true);
    });

    setFlag(2);
  }
  //검체번호로 바코드 만들기
  //수정해야함

  //환자 검색 파트
  const onSearchHandler = (event) => {
    setSearch(event.currentTarget.value);
  };
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSelectedp(-100);
      onSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const onSearch = (event) => {
    onP(); //환자를 받아옴

    setFind(search);
  };
  //환자 선택
  const selectpatient = (i) => {
    setSelectedp(i);
    console.log(callpatient.patients[i - 1].patientNo); //내가 선택한 환자의 환자 번호

    //axios get 환자번호로 처방 정보받아오기
    onpre(callpatient.patients[i - 1].patientNo);

    // 선택한 환자번호로 내원 받아오기
    onvisit(callpatient.patients[i - 1].patientNo);
    setOrder({
      order: [{ id: 1 }],
    });
  };

  //내원정보 카드 글릭시 내원카드 선택
  const clickcard = (i) => {
    //console.log(nawon);
    setSelectedn(i + 1); //i는 0부터 시작 로넘은 1부터 시작함
    error == 1 &&
      rows1.map((a, b) => {
        if (nawon[i].consultationNo == a.consultationNo) {
          a.status = 1;
        } else a.status = 0;
      });
    //선택한 내원정보가 있는 처방정보의 상태값을 전부 바꿔야함
  };

  const rows2 = [];
  //1번그리드 밑 버튼이 눌렸을때  데이터를 오른쪽 그리드로 복사한다.
  function grid1buttonclick() {
    // rows2 = resetrow;
    setRows3(resetrow); //초기화

    // console.log("selectionModel1:" + selectionModel1)
    error == 1 &&
      selectionModel1.map((id) => {
        // console.log("id:" + id)//선택된 값들의 id들
        rows1.map((row) => {
          if (row.id === id) {
            // console.log("id:" + row.id)
            rows2.push({
              id: row.id,
              consultationNo: row.consultationNo,
              consultationTime: row.consultationTime,
              consultationReceptionNo: row.consultationReceptionNo,
              consultationReceptionTime: row.consultationReceptionTime,
              staffNo: row.staffNo,
              patientNo: row.patientNo,
              consultationReceptionAppointment:
                row.consultationReceptionAppointment,
              prescriptionOrderNo: row.prescriptionOrderNo,
              prescriptionCode: row.prescriptionCode,
              prescriptionOrderTime: row.prescriptionOrderTime,
              specimenContainerCode: row.specimenContainerCode,
              specimenTypeCode: row.specimenTypeCode,
              prescriptionName: row.prescriptionName,
              prescriptionClassificationCode:
                row.prescriptionClassificationCode,
              prescriptionCode: row.prescriptionCode,
              prescriptionSlipCode: row.prescriptionSlipCode,
              prescriptionComment: row.prescriptionComment,
            });
          }
        });
      });
    console.log(rows2);
    setRows3(rows2);
  }

  // -------------다이얼로그

  //채취버튼이 눌렸을때.
  const handleClickOpen = () => {
    //db와 연결 확인
    if (error == 1) {
      //선택한 그리드의정보를 rows4로 저장한다
      grid2buttonclick();
      // //선택한 처방의 오더가 이미 채혈접수가 되어있는지 확인
      if (checker.current == 0) {
        createspecimen();
        console.log(rows4);
      }

      //다이얼로그 오픈
      //rows4에 검체 번호 들어가 있음

      // makebarcord();
    }
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  //선택한 그리드2의 값들로 다이얼로그를 통해 바코드 생성
  const rows4 = [];
  function grid2buttonclick() {
    // console.log("selectionModel2:" + selectionModel2)
    selectionModel2.map((id) => {
      // console.log("id:" + id)//선택된 값들의 id들
      rows1.map((row) => {
        if (row.id === id) {
          // console.log("id:" + row.id)
          rows4.push({
            id: row.id,
            consultationNo: row.consultationNo,
            consultationTime: row.consultationTime,
            consultationReceptionNo: row.consultationReceptionNo,
            consultationReceptionTime: row.consultationReceptionTime,
            staffNo: row.staffNo,
            patientNo: row.patientNo,
            consultationReceptionAppointment:
              row.consultationReceptionAppointment,
            prescriptionOrderNo: row.prescriptionOrderNo,
            prescriptionCode: row.prescriptionCode,
            prescriptionOrderTime: row.prescriptionOrderTime,
            specimenContainerCode: row.specimenContainerCode,
            specimenTypeCode: row.specimenTypeCode,
            prescriptionName: row.prescriptionName,
            prescriptionClassificationCode: row.prescriptionClassificationCode,
            prescriptionCode: row.prescriptionCode,
            prescriptionSlipCode: row.prescriptionSlipCode,
            prescriptionComment: row.prescriptionComment,
          });
        }
      });
    });
    console.log(rows4);
    setRows5(rows4);
    //바코드 출력시간의 현재시간으로 입력해야 함
    //db에 이정보들을 입력하여야 함
  }

  const columns = [
    {
      field: 'prescriptionOrderNo',
      headerName: '오더번호',
      headerAlign: 'center',
      type: 'date',
    },
    {
      field: 'prescriptionCode',
      headerName: '처방코드',
      headerAlign: 'center',
    },
    {
      field: 'prescriptionName',
      headerName: '처방명',
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
      headerName: '처방타입코드',
      headerAlign: 'center',
    },
    {
      field: 'staffNo',
      headerName: '담당의',
      headerAlign: 'center',
    },
  ];

  const columns2 = [
    {
      field: 'specimenContainerCode',
      headerName: '용기코드',
      headerAlign: 'center',
    },
    {
      headerName: '오더번호',
      field: 'prescriptionOrderNo',
      headerAlign: 'center',
    },
    {
      field: 'prescriptionCode',
      headerName: '처방코드',
      headerAlign: 'center',
    },
    {
      field: 'prescriptionName',
      headerName: '검사명',
      headerAlign: 'center',
      width: 200,
    },
  ];

  return (
    <Grid>
      <Grid>
        <p></p>
        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ minWidth: 275, width: '95%' }}>
            <CardContent>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Grid sx={{ maxHeight: '500px', overflowY: 'scroll' }}>
                  <h3>&nbsp; 환자 정보 검색창</h3>
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
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          }
                          label="Required"
                          value={search}
                          placeholder="환자이름, 환자번호"
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

                  {error == 1 &&
                    callpatient.patients &&
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
                                label="성별/나이"
                                defaultValue=""
                                variant="filled"
                                value={patient.patientMale + '/' + patient.age}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={3} sx={{}}>
                              <TextField
                                disabled
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
                                label="성별/나이"
                                defaultValue="검색창에 값을 입력하세요"
                                variant="filled"
                                value={patient.patientMale + '/' + patient.age}
                                size="small"
                              />{' '}
                            </Grid>
                            <Grid item xs={3} sx={{}}>
                              <TextField
                                disabled
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
        <Grid sx={{ minWidth: ' 1450px', my: 5 }}>
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
                {error == 1 &&
                  nawon &&
                  nawon.map((visit, i) => {
                    if (!nawon) {
                      return <Grid>no data</Grid>;
                    } else {
                      if (nawon[0].id == -100) {
                        return (
                          <Typography sx={{ fontSize: 14 }}>
                            선택한 환자의 내원정보가 없습니다.
                          </Typography>
                        );
                      }
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
                                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.1))',
                                }}
                              >
                                <Grid>
                                  <Grid sx={{ display: 'flex' }}>
                                    <Grid sx={{ float: 'left' }}>
                                      <Typography sx={{ fontSize: 14 }}>
                                        내원번호 : {visit.consultationNo}
                                      </Typography>
                                      <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                      >
                                        내원일자: {visit.consultationTime}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Typography variant="body2" component="div">
                                    내원과: {visit.departmentName}
                                  </Typography>
                                  <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                  >
                                    진료의: {visit.visitDoctor}
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

                                '&:hover': {
                                  backgroundColor: 'rgba(0,0,0,0.2)',
                                },
                              }}
                            >
                              <CardContent
                                sx={{
                                  alignItems: 'self-end',
                                  justifyContent: 'flex-end',
                                  background:
                                    'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
                                }}
                              >
                                <Grid>
                                  <Grid sx={{ display: 'flex' }}>
                                    <Grid sx={{ float: 'left' }}>
                                      <Typography sx={{ fontSize: 14 }}>
                                        내원번호 : {visit.consultationNo}
                                      </Typography>
                                      <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                      >
                                        내원일자: {visit.consultationTime}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Typography variant="body2" component="div">
                                    내원과: {visit.departmentName}
                                  </Typography>
                                  <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                  >
                                    진료의: {visit.visitDoctor}
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
          <Card
            sx={{
              minWidth: '1100px',
              width: '80%',
              marginleft: 20,
            }}
          >
            <CardContent sx={{ minWidth: 500 }}>
              <Box
                sx={{
                  height: 500,
                  width: '38%',
                  float: 'right',
                }}
              >
                <h3>채취할 처방정보</h3>
                {pagestarter.starter &&
                  pagestarter.starter.map(() => {
                    if (!pagestarter.starter) {
                      return <Grid>no data</Grid>;
                    } else {
                      if (error == 1) {
                        //1은정상그리드 -100은 로딩 그리드
                        return (
                          <DataGrid
                            components={{
                              NoRowsOverlay: () => (
                                <Grid container spacing={2}>
                                  <Grid
                                    sx={{
                                      textAlign: 'center',
                                      justifyContent: 'center',
                                      width: '120%',
                                      my: 25,
                                    }}
                                  >
                                    <Typography
                                      sx={{ fontSize: 14 }}
                                      color="text.secondary"
                                    >
                                      왼쪽 표에서 출력할 처방 정보를 선택하세요
                                    </Typography>
                                  </Grid>
                                </Grid>
                              ),
                            }}
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
                        );
                      } else {
                        return (
                          <DataGrid
                            components={{
                              NoRowsOverlay: () => (
                                <Grid container spacing={2}>
                                  <Grid
                                    sx={{
                                      textAlign: 'center',
                                      justifyContent: 'center',
                                      width: '120%',
                                      my: 25,
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
                            rows={rows3}
                            columns={columns2}
                          />
                        );
                      }
                    }
                  })}

                <br />
                <ReceptCollectionDialog
                  selectedValue={rows5}
                  open={open}
                  onClose={handleClose}
                  img={imageUrl}
                />
                <Button
                  sx={{ width: '100%' }}
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  채취버튼
                </Button>
              </Box>
              <Grid sx={{ my: 40, float: 'right' }}>
                <ArrowForwardIcon />
                &nbsp;&nbsp;
              </Grid>

              <Box
                sx={{
                  position: 'relative',
                  height: 500,
                  width: '58%',
                  float: 'left',
                  '& .super-app-theme--1': {
                    bgcolor: '#ABCBAD',
                    '&:hover': {
                      bgcolor: '#96BE98',
                    },
                  },
                  '& .super-app-theme--2': {
                    bgcolor: '#ABCBAD',
                    '&:hover': {
                      bgcolor: '#96BE98',
                    },
                  },
                }}
              >
                <h3>오더정보</h3>
                {pagestarter.starter &&
                  pagestarter.starter.map(() => {
                    if (!pagestarter.starter) {
                      return <Grid>no data</Grid>;
                    } else {
                      if (error == 1) {
                        //1은정상그리드 -100은 로딩 그리드
                        return (
                          <DataGrid
                            rows={rows1}
                            columns={columns}
                            getRowClassName={(params) =>
                              `super-app-theme--${params.row.status}`
                            }
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            onSelectionModelChange={(newSelectionModel) => {
                              setSelectionModel1(newSelectionModel);
                            }}
                            selectionModel={selectionModel1}
                            components={{
                              Toolbar: GridToolbar,
                              NoRowsOverlay: () => (
                                <Grid container spacing={2}>
                                  <Grid
                                    sx={{
                                      textAlign: 'center',
                                      justifyContent: 'center',
                                      width: '120%',
                                      my: 20,
                                    }}
                                  >
                                    <Typography
                                      sx={{ fontSize: 14 }}
                                      color="text.secondary"
                                    >
                                      환자 정보를 검색하세요
                                    </Typography>
                                  </Grid>
                                </Grid>
                              ),
                            }}
                          />
                        );
                      } else {
                        return (
                          <DataGrid
                            rows={rows1}
                            columns={columns}
                            components={{
                              Toolbar: GridToolbar,
                              NoRowsOverlay: () => (
                                <Grid container spacing={2}>
                                  <Grid
                                    sx={{
                                      textAlign: 'center',
                                      justifyContent: 'center',
                                      width: '120%',
                                      my: 20,
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
                          />
                        );
                      }
                    }
                  })}

                <br />
                <Button
                  sx={{ width: '100%' }}
                  variant="contained"
                  color="success"
                  onClick={grid1buttonclick}
                >
                  오더 선택
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
