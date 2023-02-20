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
import { Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';
//그리드에 색깔 넣기
import { PatientList } from '../components/receptcollection/PatientList';
import axios from 'axios';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { selectAccount } from '../services/accountSlice';
import { useAppSelector } from '../hooks';
import JsBarcode from 'jsbarcode';

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
  const rows2 = [];
  //검색창 미리보기 구현

  //db연결 오류
  const [error, setError] = useState(1); //

  const [loginstaffno, setLoginstaffno] = useState(1);
  const account = useAppSelector(selectAccount); //로그인한  계정 정보

  const [specimenlist, setSpecimenlist] = useState(1); //
  const [imageUrl1, setImageUrl1] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  //만약 선택한 처방 정보의 해당하는 오더에 검체가 이미 있을때
  //다잉얼로그 열기

  useEffect(() => {
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
      url: `http://localhost:8080/api/patient/list?pageSize=1000&pageStart=0&patientNameKey=${search}`,
    }).then(function (response) {
      if (response.data != '') {
        console.log(response.data);
        error == 1 &&
          response.data.map((patient) => {
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

  //검체를 생성하는 함수
  function createspecimen() {
    rows4.map((postdata) => {
      axios({
        method: 'post',
        url: `http://localhost:8080/api/collect/insertspecimenpost`,
        data: {
          staffNo: loginstaffno,
          orderNo: postdata.orderNo,
        },
      })
        .then(function () {
          //
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  function onvisit(patientNo) {
    //환자no로  내원 볼러오기
    axios({
      method: 'get',
      url: `http://localhost:8080/api/consultation/full-consultation/list?pageSize=10&pageStart=0&patientNoKey=${patientNo}`,
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

  function onpre(patientNo) {
    //환자no로  처방 볼러오기
    axios({
      method: 'get',
      url: `http://localhost:8080/api/prescription-order/full-test-prescription-order/list?pageSize=10&pageStart=0&PatientNo=${patientNo}`,
    }).then(function (response) {
      if (response.data != '') {
        console.log(response.data);
        error == 1 &&
          response.data.map((pre, testid) => {
            pre.id = pre.prescriptionOrderNo;
            pre.status = 0;
            pre.patientName = callpatient.patients[0].patientName;
          });

        setRows1(response.data);
      } else {
        setRows1({ id: -100 });
      }
    });
  }

  //선택한정보의 오더 no로 이미 뽑은 검체 인지검사 reception-collection에 데이터가 있다면 여기서 표시를 해줘야한다.
  function checkReCobyorder(selectedpre) {
    selectedpre.map((pre) => {
      //pre.orderNo
      console.log('pre.orderNo: ' + pre.orderNo);
      axios({
        method: 'get',
        url: `http://localhost:8080/api/collect/getrecobyorderno?orderNo=${pre.orderNo}`,
      }).then(function (response) {
        if (response.data != '') {
          console.log(
            'warning!!!!!!!!!!!!!!!!! 이미 데이터가 테이블에 있습니다.',
          );
          console.log(response.data);
          //이미 orderno가 검체접수 목록에 있다.
          //진행 여부만 확인 하면 된다.
        } else {
        }
      });
    });
  }
  //검체번호로 바코드 만들기

  function makebarcord() {
    rows4.map((a, i) => {
      axios({
        method: 'get',
        url: `http://localhost:8080/api/collect/getPrebyOrderNo?orderNo=${a.orderNo}`,
      }).then(function (response) {
        if (response.data != '') {
          console.log(i + '번째 검체번호' + response.data[0].specimenNo);
          a.specimenNo = response.data[0].specimenNo;
          const canvas = document.createElement('canvas');
          JsBarcode(canvas, a.specimenNo, { height: 50, displayValue: true });
          setImageUrl(canvas.toDataURL('image/png'));
          imageUrl1[i] = canvas.toDataURL('image/png');
        }
      });
    });
  }

  const setimg123 = () => {
    rows4.map((a, idx) => {
      console.log('idx:' + a.specimenNo);
    });
  };

  //환자 검색 파트
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
    console.log(nawon);
    setSelectedn(i + 1); //i는 0부터 시작 로넘은 1부터 시작함
    error == 1 &&
      rows1.map((a, b) => {
        if (nawon[i].consultationNo === a.consultationNo) {
          rows1[b].status = 1;
        } else rows1[b].status = 0;
      });
    //선택한 내원정보가 있는 처방정보의 상태값을 전부 바꿔야함
  };

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
              prescriptionTypeCode: row.prescriptionTypeCode,
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
      // checkReCobyorder(rows4);
      //검체생성
      createspecimen();
      console.log(rows4);
      //다이얼로그 오픈

      makebarcord(); //rows4에 검체 번호 들어가 있음

      console.log(specimenlist);
      setimg123();
      setOpen(true);
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
            prescriptionTypeCode: row.prescriptionTypeCode,
            prescriptionName: row.prescriptionName,
            prescriptionClassificationCode: row.prescriptionClassificationCode,
            prescriptionCode: row.prescriptionCode,
            prescriptionSlipCode: row.prescriptionSlipCode,
            prescriptionComment: row.prescriptionComment,
          });
        }
      });
    });
    setRows5(rows4);
    //바코드 출력시간의 현재시간으로 입력해야 함
    //db에 이정보들을 입력하여야 함
  }

  const columns = [
    {
      field: 'prescriptionCode',
      headerName: '처방코드',
      headerAlign: 'center',
    },
    {
      field: 'prescriptionOrderNo',
      headerName: '오더번호',
      headerAlign: 'center',
      type: 'date',
    },
    {
      field: 'prescriptionName',
      headerName: '처방명',
      headerAlign: 'center',
    },
    {
      field: 'specimenContainerCode',
      headerName: '용기코드',
      headerAlign: 'center',
    },
    {
      field: 'prescriptionTypeCode',
      headerName: '처방타입코드',
      headerAlign: 'center',
    },
    {
      field: 'staffNo',
      headerName: '담당의',
      headerAlign: 'center',
    },
    {
      field: 'prescriptionName',
      headerName: '처방이름',
      headerAlign: 'center',
    },
  ];

  const columns2 = [
    {
      headerName: 'prescriptionOrderNo',
      field: '오더번호',
      headerAlign: 'center',
    },
    {
      field: 'specimenContainerCode',
      headerName: '용기코드',
      headerAlign: 'center',
    },
    {
      field: 'prescriptionCode',
      headerName: '처방코드',
      headerAlign: 'center',
    },
    {
      field: 'prescriptionName',
      headerName: '처방이름',
      headerAlign: 'center',
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
                  {/* <Grid sx={{ textAlign: 'right' }}>
                    <Autocomplete
                      onKeyPress={handleOnKeyPress}
                      disablePortal
                      options={
                        error == 1 &&
                        patientlist.map((item) => item.patientName)
                      }
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
                  </Grid> */}
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
                                    'linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
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
                                    진료의: {visit.staffNo}
                                  </Typography>
                                  <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                  >
                                    진료시간: {visit.consultationTime}
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
                                    진료의: {visit.staffNo}
                                  </Typography>
                                  <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                  >
                                    진료시간: {visit.consultationTime}
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
                            pageSize={7}
                            rowsPerPageOptions={[7]}
                            checkboxSelection
                            onSelectionModelChange={(newSelectionModel) => {
                              setSelectionModel2(newSelectionModel);
                            }}
                            selectionModel={selectionModel2}
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
                  img={imageUrl1}
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
                }}
              >
                <h3>처방정보</h3>
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
                  리스트 등록
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
