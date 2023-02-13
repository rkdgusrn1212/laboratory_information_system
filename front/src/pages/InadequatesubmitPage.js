import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState, useEffect } from 'react';
//datagrid
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
import { SubmitInadequateList } from '../components/inadequate/SubmitInadequateList';

export default function InadequatePage() {
  //----검색기능
  const [search, setSearch] = useState(''); //검색하는 검체번호
  const [find, setFind] = useState(1); //검색 결과

  const [flag, setFlag] = useState(1); //검색 결과
  const [typelist, setTypelist] = useState([]); //부적합 데이터 백에서 받아와서 저장
  const [stafflist, setStafflist] = useState([]); //스태프 리스트
  const [submitInadequateList, setSubmitInadequateList] = useState([]); //스태프 리스트

  const [make, setMake] = useState([]); //반응형 그리드를 만들기위한 변수설정

  useEffect(() => {
    SubmitInadequateList().then((res) => setSubmitInadequateList(res));

    staffList().then((res) => setStafflist(res));

    inadequate_typeList().then((res) => setTypelist(res));

    setMake({
      specimen: [{ id: 1 }],
    });
  }, []);

  const onSearchHandler = (event) => {
    setSearch(event.currentTarget.value);
  };
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const onSearch = (event) => {
    setFlag(2);

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
      field: 'inadequateTypeCode',
      headerAlign: 'center',
    },
    {
      headerName: '통보자',
      field: 'submitInadequateFrom',
      headerAlign: 'center',
    },
    {
      headerName: '피통보자',
      field: 'submitInadequateTo',
      headerAlign: 'center',
    },

    {
      headerName: '채혈자',
      field: 'bloodCollectStaffNo',
      headerAlign: 'center',
    },
    {
      headerName: '채혈일시',
      field: 'collectDate',
      headerAlign: 'center',
      type: 'dateTime',
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
                  입력된 바코드 : {search}
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
                <h3>부적합 검체 등록</h3>
                {make.specimen &&
                  make.specimen.map((sapecimen) => {
                    if (!make.specimen) {
                      return <Grid>no data</Grid>;
                    }
                    if (flag === 1) {
                      return <Grid>검색을 진행하세요</Grid>;
                    } else if (flag === 2) {
                      return <Grid>잘못된 검체번호입니다.</Grid>;
                    } else if (flag === 3) {
                      return (
                        <Grid>
                          <Grid sx={{ mx: 1 }}>
                            <Grid item xs={3} sx={{}}>
                              <TextField
                                sx={{ m: 1, width: '50ch' }}
                                disabled
                                id="filled-disabled"
                                label="검체번호"
                                variant="filled"
                                value={find.specimenNo}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex' }}>
                              <TextField
                                disabled
                                id="filled-disabled"
                                label="채혈자"
                                variant="filled"
                                value={find.staffNo}
                                size="small"
                              />
                              <TextField
                                disabled
                                id="filled-disabled"
                                label="채혈자코드"
                                variant="filled"
                                value={find.staffNo}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={3} sx={{}}>
                              <TextField
                                sx={{ m: 1, width: '50ch' }}
                                disabled
                                id="filled-disabled"
                                label="채혈시간"
                                variant="filled"
                                value={find.collectDate}
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
                                  {typelist.map((inadequateType) => {
                                    return (
                                      <MenuItem
                                        value={
                                          inadequateType.inadequateTypeCode
                                        }
                                      >
                                        {inadequateType.inadequateTypeCode} -{' '}
                                        {inadequateType.inadequateTypeName}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                                <FormHelperText>
                                  부적합 사유를 선택하세요
                                </FormHelperText>
                              </FormControl>
                            </Grid>
                            <Grid item xs={3} sx={{}}>
                              {typelist.map((inadequateType) => {
                                if (
                                  inadequateType.inadequateTypeCode === reason
                                )
                                  return (
                                    <TextField
                                      disabled
                                      multiline
                                      id="filled-disabled"
                                      label="부적합사유 상세"
                                      variant="filled"
                                      value={
                                        inadequateType.inadequateTypeBriefExplanation
                                      }
                                      size="small"
                                    />
                                  );
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
                                  {stafflist.map((staff) => {
                                    return (
                                      <MenuItem value={staff.staffNo}>
                                        {staff.staffName} - {staff.staffType}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>

                            {stafflist.map((staff) => {
                              if (staff.staffNo === listener)
                                return (
                                  <Grid item xs={3} sx={{ display: 'flex' }}>
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
                                );
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
                      );
                    } else if (flag === 4) {
                      return <Grid>이미 등록된 검체번호입니다.</Grid>;
                    }
                  })}
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
              <Grid>부적합 검체 리스트</Grid>
              <Grid sx={{ height: '600px', width: '100%', float: 'left' }}>
                <DataGrid
                  rows={submitInadequateList}
                  columns={columns}
                  pageSize={7}
                  rowsPerPageOptions={[7]}
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                />
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
