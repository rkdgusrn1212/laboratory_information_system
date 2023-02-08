import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: '검체코드', width: 140 },
  {
    field: 'b',
    headerName: '검체명',
    width: 90,
    editable: true,
  },
  {
    field: 'c',
    headerName: '환자번호',
    width: 90,
    editable: true,
  },
  {
    field: 'd',
    headerName: '환자명',

    width: 90,
    editable: true,
  },
  {
    field: 'e',
    headerName: '검사코드',

    width: 90,
    editable: true,
  },
  {
    field: 'f',
    headerName: '검사명',

    width: 90,
    editable: true,
  },
  {
    field: 'g',
    headerName: 'H/L',

    width: 90,
    editable: true,
  },
  {
    field: 'h',
    headerName: '상태',

    width: 90,
    editable: true,
  },
  {
    field: 'i',
    headerName: '접수일',

    width: 140,
    editable: true,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  { id: 2212110001, b: 'EDT A', c: 'no01', d: '강현구', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
  { id: 2212110002, b: 'EDT B', c: 'no02', d: '김동신', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
  { id: 2212110003, b: 'EDT C', c: 'no03', d: '류호진', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/22' },
  { id: 2212110004, b: 'SRM A', c: 'no04', d: '홍길동', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/24' },
  { id: 2212110005, b: 'EDT A', c: 'no05', d: '이정재', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/20' },
  { id: 2212110006, b: 'EDT A', c: 'no06', d: '정우성', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/11' },
  { id: 2212110007, b: 'SRM B', c: 'no07', d: '한소희', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/13' },
  { id: 2212110008, b: 'EDT A', c: 'no08', d: '박지성', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/14' },
  { id: 2212110009, b: 'SRM A', c: 'no09', d: '김연아', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/25' },
  { id: 2212110010, b: 'SRM A', c: 'no10', d: '손흥민', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/22' },
  { id: 2212110011, b: 'EDT A', c: 'no11', d: '권지용', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/01' },
  { id: 2212110012, b: 'SRM B', c: 'no12', d: '하정우', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
  { id: 2212110013, b: 'SRM B', c: 'no13', d: '김민재', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
  { id: 2212110014, b: 'EDT A', c: 'no14', d: '전태풍', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
  { id: 2212110015, b: 'SRM A', c: 'no15', d: '줄리엔강', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
];

export default function ResultSearchList() {


  return (

    <Box sx={{ height: 371 }} xs={10}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}

      ></DataGrid>
      <Button variant="contained" color="success" sx={{width:400}} >분석</Button>
      

    </Box >
  );
}