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

const testcodes = ['23012600001', '23012600002', '23012600003', '23012600004'];

export default function BloodCollectionPage() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(testcodes[1]);
  const [inputlist, setInputlist] = useState([]);
  const [list, setList] = useState([]); //get
  //----검색기능
  const [search, setSearch] = useState(''); //검색하는 단어
  const [state, setState] = useState([]); //검색 결과
  const [pagestarter, setPagestarter] = useState([]); //반응형 그리드를 만들기위한 변수설정

  useEffect(() => {
    try {
      collectlist().then((res) => setList(res));
    } catch {
      return <h1>no backend</h1>;
    }
    setPagestarter({
      starter: [{ id: 1 }],
    });
  }, []);

  function postdata() {
    fetch(`http://localhost:8080/api/collect/insertcollectbypost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        specimenNo: search,
        staffNo: '72',
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert('생성이 완료되었습니다.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
    fetch(
      `http://localhost:8080/api/collect/collectlistbyno?specimenNo=${search}`,
      {
        method: 'GET',
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //전처리
        setFlag(3);
        submitInadequateList.map((a) => {
          if (a.specimenNo == search) setFlag(4);
        });
        setFind(data);
        console.log(data);
      });

    console.log(falg);
  };
  //post 방식으로 제출
  const handleClickOpen = () => {
    postdata();

    setOpen(true);
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
      <br />
      <Card sx={{ minWidth: 275, width: '95%', mx: 3 }}>
        <CardContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <h3>채혈정보</h3>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <Grid sx={{ float: 'left' }}>
                <Typography variant="subtitle1" component="div">
                  바코드 수기입력
                </Typography>
                <Typography variant="subtitle2" component="div">
                  입력된 바코드 : {find}
                </Typography>
              </Grid>

              <Grid sx={{ float: 'right' }}>
                <Button variant="outlined" onClick={onSearch}>
                  입력
                </Button>
                {/* 왜인지 모르만 인풋이 없으면 엔터시 페이지가 초기화된다.*/}
                {/* <input className="search" type="hidden" value={search} onChange={onSearchHandler} onKeyPress={handleOnKeyPress} /> */}
              </Grid>
              <Grid sx={{ display: 'flex', justifyContent: 'right', mx: 3 }}>
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
                    />
                  </Grid>
                </FormControl>
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <br />
      <Card sx={{ minWidth: 275, width: '95%', mx: 3 }}>
        <CardContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid sx={{ height: '500px', width: '98%', mx: 2 }}>
              {pagestarter.starter &&
                pagestarter.starter.map(() => {
                  if (!pagestarter.starter) {
                    return <Grid>no data</Grid>;
                  } else {
                    return (
                      <DataGrid
                        rows={list}
                        columns={columns}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        disableSelectionOnClick //셀렉트 금지
                        components={{
                          Toolbar: GridToolbar,
                        }}
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
                mx: 3,
              }}
            >
              <BloodcollectionsDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
              />
              <Button
                variant="contained"
                sx={{ width: '100%', mx: 2 }}
                onClick={handleClickOpen}
              >
                채혈자 및 채혈시간 업데이트
              </Button>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
