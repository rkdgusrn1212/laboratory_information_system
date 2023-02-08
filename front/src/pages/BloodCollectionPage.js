import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
// Import Swiper React components
import { useState, useEffect } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
import BloodcollectionsDialog from '../components/bloodCollection/Bloodcollectiondialog';

const testcodes = ['23012600001', '23012600002', '23012600003', '23012600004'];


export default function BloodCollectionPage() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(testcodes[1]);
    //----검색기능
    const [search, setSearch] = useState("");//검색하는 단어
    const [state, setState] = useState([]);//검색 결과 
    const [find, setFind] = useState("");  //검색하는 단어 


    useEffect(() => {
        //기존의 채혈정보 불러오기
    });

    const onSearchHandler = (event) => {
        setSearch(event.currentTarget.value)
    }
    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            onSearch(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    const onSearch = (event) => {

        setState({});
        setFind(search);

        //ROW에 검체번호를 기준으로 내원번호,오더일자,용기명,담담의 이름,진료과,검사명를 불러 
        //행을 추가하고 색깔을 넣어준다
    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };


    //받아온 json파일 전처리
    function rowsbeforesetting(rows) {
        rows.map((a) => {
            a.status = 0;
        })
    }

    const rows1 = [
        {
            //처방 정보
            id: 2211150001,
            visit_no: 1,
            order_date: "22-11-15",
            specimen_no: "2211150001",
            test_container: "용기명1",
            staff_name: "김의사",
            department_name: "소화기내과(GI) - 제2병동",
            test_name: "검사명1",
        },
        {
            id: 2211150002,
            visit_no: 1,
            order_date: "22-11-15",
            specimen_no: "2211150002",
            test_container: "용기명2",
            staff_name: "김의사",
            department_name: "소화기내과(GI) - 제2병동",
            test_name: "검사명2",
        },
        {
            id: 2212160003,
            visit_no: 2,
            order_date: "22-12-16",
            specimen_no: "2212160003",
            test_container: "용기명3",
            staff_name: "김의사",
            department_name: "소화기내과(GI) - 제2병동",
            test_name: "검사명3",
        },
        {
            id: 2301050004,
            visit_no: 3,
            order_date: "23-01-05",
            specimen_no: "2301050004",
            test_container: "용기명4",
            staff_name: "나의사",
            department_name: "신경외과(NS) - 제1병동",
            test_name: "검사명5",
        },
        {
            id: 2301180005,
            visit_no: 4,
            order_date: "23-01-18",
            specimen_no: "2301180005",
            test_container: "용기명4",
            staff_name: "나의사",
            department_name: "신경외과(NS) - 제1병동",
            test_name: "검사명5",
        },
        {
            id: 2301870003,
            visit_no: 5,
            order_date: "23-01-27",
            specimen_no: "2301870003",
            test_container: "용기명3",
            staff_name: "김의사",
            department_name: "소화기내과(GI) - 제2병동",
            test_name: "검사명3",
        },
    ];
    const columns = [
        {
            field: 'id',
            headerName: '검체번호',
            headerAlign: 'center',

        },
        {
            field: 'visit_no',
            headerName: '내원번호',
            headerAlign: 'center',

        },
        {
            field: 'visit_no',
            headerName: '내원번호',
            headerAlign: 'center',

        },
        {
            field: 'order_date',
            headerName: '오더일자',
            headerAlign: 'center',
            type: 'date'
        },
        {
            field: 'test_container',
            headerName: '용기명',
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
            width: 300
        },
        {
            headerName: '검사명',
            field: 'test_name',
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
            type: 'dateTime'
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
                                <Typography variant="subtitle1" component="div" >
                                    바코드 수기입력
                                </Typography>
                                <Typography variant="subtitle2" component="div" >
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
                                    <Grid >
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
                        </Box >

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
                        <Grid sx={{ height: '400px', width: '98%', mx: 2 }}>
                            <BloodcollectionsDialog
                                selectedValue={selectedValue}
                                open={open}
                                onClose={handleClose}
                            />
                            <DataGrid
                                rows={rows1}
                                columns={columns}
                                pageSize={7}
                                rowsPerPageOptions={[7]}
                                disableSelectionOnClick//셀렉트 금지
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                            />
                        </Grid>
                        <br />
                        <Grid sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', mx: 3 }}>
                            <Button variant="contained" sx={{ width: '100%', mx: 2 }} onClick={handleClickOpen}>
                                채혈자 및 채혈시간 업데이트
                            </Button>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Grid >
    );
}