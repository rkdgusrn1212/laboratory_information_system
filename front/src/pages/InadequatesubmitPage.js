import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState, useEffect } from 'react';
//datagrid
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
//
import VaccinesIcon from '@mui/icons-material/Vaccines';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
//카드
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//그리드
import Grid from '@mui/material/Grid';
//셀렉트
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { inadequate_typeList } from '../components/inadequate/InadequateTypeList';
import { staffList } from '../components/inadequate/StaffList';



export default function InadequatePage() {
  //----검색기능
  const [search, setSearch] = useState('');
  const [find, setFind] = useState('');
  const [plength, setPLength] = useState(0);

  const [typelist, setTypelist] = useState([]); //부적합 데이터 백에서 받아와서 저장
  const [stafflist, setStafflist] = useState([]);


  useEffect(() => {
    staffList()
      .then(res => setStafflist(res))

    inadequate_typeList()
      .then(res => setTypelist(res))
  }, [])


  const onSearchHandler = (event) => {
    setSearch(event.currentTarget.value);
  };
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const onSearch = (event) => {
    // fetch("/api/search", {
    //     method: "post",
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //         Accept: "application / json",
    //     }, body: JSON.stringify({
    //         "search": search,

    //     })

    // })
    //     .then((res) => res.json())
    //     .then(json => {
    //         setState(json);

    //         setPLength(json.products.length);
    //         setFind(search);
    //     });
    console.log(search);

    // setState(json);
    // setPLength(json.products.length);
    setFind(search);


  };
  //---검색끝
  // const Importiadeq = (event) => {

  // }

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 8,
  });
  const rows = [
    {
      //처방 정보
      id: 2211150001,
      visit_no: 1,
      order_date: '22-11-15',
      specimen_no: '2211150001',
      test_container: '용기명1',
      staff_name: '김의사',
      department_name: '소화기내과(GI) - 제2병동',
      test_name: '검사명1',
    },
    {
      id: 2211150002,
      visit_no: 1,
      order_date: '22-11-15',
      specimen_no: '2211150002',
      test_container: '용기명2',
      staff_name: '김의사',
      department_name: '소화기내과(GI) - 제2병동',
      test_name: '검사명2',
    },
    {
      id: 2212160003,
      visit_no: 2,
      order_date: '22-12-16',
      specimen_no: '2212160003',
      test_container: '용기명3',
      staff_name: '김의사',
      department_name: '소화기내과(GI) - 제2병동',
      test_name: '검사명3',
    },
    {
      id: 2301050004,
      visit_no: 3,
      order_date: '23-01-05',
      specimen_no: '2301050004',
      test_container: '용기명4',
      staff_name: '나의사',
      department_name: '신경외과(NS) - 제1병동',
      test_name: '검사명5',
    },
    {
      id: 2301180005,
      visit_no: 4,
      order_date: '23-01-18',
      specimen_no: '2301180005',
      test_container: '용기명4',
      staff_name: '나의사',
      department_name: '신경외과(NS) - 제1병동',
      test_name: '검사명5',
    },
    {
      id: 2301870003,
      visit_no: 5,
      order_date: '23-01-27',
      specimen_no: '2301870003',
      test_container: '용기명3',
      staff_name: '김의사',
      department_name: '소화기내과(GI) - 제2병동',
      test_name: '검사명3',
    },
  ];
  const columns = [
    {
      field: 'id',
      headerName: '검체번호',
      headerAlign: 'center',
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
      headerName: '부적합사유 코드',
      field: 'Inadequate_type_code',
      headerAlign: 'center',
    },
    {
      headerName: '통보자',
      field: 'Submit_Inadequate_from',
      headerAlign: 'center',
    },
    {
      headerName: '피통보자',
      field: 'Submit_Inadequate_to',
      headerAlign: 'center',
    },

    {
      headerName: '채혈자',
      field: 'collect_staff_no',
      headerAlign: 'center',
    },
    {
      headerName: '채혈일시',
      field: 'collect_date',
      headerAlign: 'center',
      type: 'dateTime',
    }, {
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

  //  셀렉트
  const [reason, setReason] = React.useState('');
  const handleChange1 = (event) => {
    setReason(event.target.value);
  };

  const [listener, setListener] = React.useState('');
  const handleChange2 = (event) => {
    setListener(event.target.value);
  };

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
            <h3>검체조회</h3>
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
                      placeholder="검체번호(바코드 번호)"
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
      <Grid sx={{ display: 'flex' }}>
        <Grid sx={{ minWidth: 275, width: '28%', mx: 3 }}>
          <Card>
            <CardContent>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '98%' },
                }}
                noValidate
                autoComplete="off"
              >
                <Grid>
                  <h3>부적합 검체 등록</h3>
                  <Grid sx={{ mx: 1 }}>
                    <Grid item xs={3} sx={{}}>
                      <TextField
                        sx={{ m: 1, width: '50ch' }}
                        disabled
                        id="filled-disabled"
                        label="검체번호"
                        variant="filled"
                        value={find}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={3} sx={{ display: 'flex' }}>
                      <TextField
                        disabled
                        id="filled-disabled"
                        label="진료의"
                        sx={{ m: 1, width: '34ch' }}
                        variant="filled"
                        value={find}
                        size="small"
                      />
                      <TextField
                        sx={{}}
                        disabled
                        id="filled-disabled"
                        label="진료의코드"
                        variant="filled"
                        value={find}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={3} sx={{ display: 'flex' }}>
                      <TextField
                        disabled
                        id="filled-disabled"
                        label="채혈자"
                        variant="filled"
                        value={find}
                        size="small"
                      />
                      <TextField
                        disabled
                        id="filled-disabled"
                        label="채혈자코드"
                        variant="filled"
                        value={find}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={3} sx={{}}>
                      <FormControl
                        item
                        xs={3}
                        sx={{ m: 1, minWidth: 120, width: '98%' }}
                      >
                        <InputLabel id="demo-simple-select-helper-label">
                          부적합사유 코드
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={reason}
                          label="부적합사유 코드"
                          onChange={handleChange1}
                          size="medium"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {typelist.map((inadequateType, i) => {
                            return <MenuItem value={i}>{inadequateType.inadequateTypeCode} - {inadequateType.inadequateTypeName}</MenuItem>
                          })}

                        </Select>
                        <FormHelperText>
                          부적합 사유를 선택하세요
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3} sx={{}}>

                      {typelist.map((inadequateType, i) => {
                        if (i === reason)
                          return <TextField
                            disabled
                            multiline
                            id="filled-disabled"
                            label="부적합사유 상세"
                            variant="filled"
                            value={inadequateType.inadequateTypeBriefExplanation}
                            size="small"
                          />
                      })}


                    </Grid>
                    <Grid item xs={3} sx={{}}>
                      <FormControl
                        item
                        xs={3}
                        sx={{ m: 1, minWidth: 120, width: '98%' }}
                      >
                        <InputLabel id="demo-simple-select-helper-label">
                          피통보자
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={listener}
                          label="부적합사유"
                          onChange={handleChange2}
                          size="medium"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {stafflist.map((staff, i) => {
                            return <MenuItem value={i}>{staff.staffName} - {staff.staffType}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                    </Grid>

                    {stafflist.map((staff, i) => {
                      if (i === listener)
                        return <Grid item xs={3} sx={{ display: 'flex' }}>
                          <TextField
                            disabled
                            id="filled-disabled"
                            label="통보자"
                            variant="filled"
                            value={staff.staffName}
                            size="small"
                          />
                          <TextField
                            disabled
                            id="filled-disabled"
                            label="통보자코드"
                            variant="filled"
                            value={staff.staffNo}
                            size="small"
                          />
                        </Grid>

                    })}

                    <Grid item xs={3} sx={{ textAlign: 'right' }}>
                      <Button
                        sx={{ mx: 1, minWidth: 120, width: '100%' }}
                        variant="contained"
                        onClick={null}
                      >
                        입력
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Card sx={{ float: 'right', width: '70%', mx: 2 }}>
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <Grid sx={{ height: '600px', width: '100%', float: 'left' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={7}
                  rowsPerPageOptions={[7]}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
