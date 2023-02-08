import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
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










export default function Inadequate() {
    //----검색기능
    const [search, setSearch] = useState("");
    const [find, setFind] = useState("");
    const [plength, setPLength] = useState(0);


    const onSearchHandler = (event) => {
        setSearch(event.currentTarget.value)
    }
    const handleOnKeyPress = e => {
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
        console.log(search)

        // setState(json);
        // setPLength(json.products.length);
        setFind(search);
    }
    //---검색끝
    // const Importiadeq = (event) => {

    // }


    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 10,
        maxColumns: 8,
    });
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    const columns = React.useMemo(
        () =>
            [
                ...data.columns,
                {
                    ...GRID_CHECKBOX_SELECTION_COL_DEF,
                    width: 100,
                },

            ],
        [data.columns],
    );

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

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
        <Grid><br />
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
                                            placeholder="검체번호(바코드 번호)"
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
            <Grid sx={{ display: 'flex' }}>
                <Grid sx={{ minWidth: 275, width: '28%', mx: 3 }}>
                    <Card >
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
                                            /></Grid>
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
                                            <TextField sx={{}}
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
                                            <FormControl item xs={3} sx={{ m: 1, minWidth: 120, width: '98%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">부적합사유 코드</InputLabel>
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
                                                    <MenuItem value={10}>부적합 사유1</MenuItem>
                                                    <MenuItem value={20}>부적합 사유2</MenuItem>
                                                    <MenuItem value={30}>부적합 사유3</MenuItem>
                                                </Select>
                                                <FormHelperText>부적합 사유를 선택하세요</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} sx={{}}>
                                            <TextField
                                                disabled
                                                id="filled-disabled"
                                                label="부적합사유 상세"
                                                variant="filled"
                                                value={find}
                                                size="small"
                                            /></Grid>
                                        <Grid item xs={3} sx={{}}>
                                            <FormControl item xs={3} sx={{ m: 1, minWidth: 120, width: '98%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">피통보자</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={listener}
                                                    label="부적합사유"
                                                    onChange={handleChange2}
                                                    size='medium'
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>김의사</MenuItem>
                                                    <MenuItem value={20}>박의사</MenuItem>
                                                    <MenuItem value={30}>나의사</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} sx={{ display: 'flex' }}>
                                            <TextField
                                                disabled
                                                id="filled-disabled"
                                                label="통보자"
                                                variant="filled"
                                                value={find}
                                                size="small"
                                            />
                                            <TextField
                                                disabled
                                                id="filled-disabled"
                                                label="통보자코드"
                                                variant="filled"
                                                value={find}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={{ textAlign: 'right' }}>
                                            <Button sx={{ mx: 1, minWidth: 120, width: '100%' }} variant="contained" onClick={Importiadeq}>
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
                                    {...data}

                                />
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    );
}