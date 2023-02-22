import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

import * as React from 'react';

const columns = [
  { field: 'id', headerName: '검체코드', flex: 1 },
  { field: 'b', headerName: '검체명', flex: 1 },
  { field: 'c', headerName: '환자번호', flex: 1 },
  { field: 'd', headerName: '환자명', flex: 1 },
  { field: 'e', headerName: '검사코드', flex: 1 },
  { field: 'f', headerName: '검사명', flex: 1 },
  { field: 'g', headerName: 'H/L', flex: 1 },
  { field: 'h', headerName: '상태', flex: 1 },
  { field: 'i', headerName: '접수일', flex: 1 },
];

const testresultlist = [
  { id: 2212110001, b: 'EDT A', c: 'no01', d: '강현구', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
  { id: 2212110002, b: 'EDT B', c: 'no02', d: '김동신', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
  { id: 2212110003, b: 'EDT C', c: 'no03', d: '류호진', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/22' },
  { id: 2212110004, b: 'SRM A', c: 'no04', d: '홍길동', e: 'LB2130', f: 'a', g: '0', h: '보고', i: '2022/03/24' },
  { id: 2212110005, b: 'EDT A', c: 'no05', d: '이정재', e: 'LB2130', f: 'b', g: '0', h: '보고', i: '2022/03/20' },
  { id: 2212110006, b: 'EDT A', c: 'no06', d: '정우성', e: 'LB2130', f: 'c', g: '0', h: '보고', i: '2022/03/11' },
  { id: 2212110007, b: 'SRM B', c: 'no07', d: '한소희', e: 'LB2130', f: 'd', g: '0', h: '보고', i: '2022/03/13' },
  { id: 2212110008, b: 'EDT A', c: 'no08', d: '박지성', e: 'LB2130', f: 'e', g: '0', h: '보고', i: '2022/03/14' },
  { id: 2212110009, b: 'SRM A', c: 'no09', d: '김연아', e: 'LB2130', f: 'f', g: '0', h: '보고', i: '2022/03/25' },
  { id: 2212110010, b: 'SRM A', c: 'no10', d: '손흥민', e: 'LB2130', f: 'ddd', g: '0', h: '보고', i: '2022/03/22' },
  { id: 2212110011, b: 'EDT A', c: 'no11', d: '권지용', e: 'LB2130', f: 'ddd', g: '0', h: '보고', i: '2022/03/01' },
  { id: 2212110012, b: 'SRM B', c: 'no12', d: '하정우', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
  { id: 2212110013, b: 'SRM B', c: 'no13', d: '김민재', e: 'LB2130', f: 'qqq', g: '0', h: '보고', i: '2022/03/21' },
  { id: 2212110014, b: 'EDT A', c: 'no14', d: '전태풍', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
  { id: 2212110015, b: 'SRM A', c: 'no15', d: '줄리엔강', e: 'LB2130', f: 'WBC', g: '0', h: '보고', i: '2022/03/21' },
];

export default function ResultSearchList(props) {
  const navigate = useNavigate();

  const navigateToPurchase = () => {
    navigate("/test/analysis");
  };

  // const [testresultlist, setTestResultList] = useState('');

  // useEffect(() => {

  //   if (testresultlist.length == null) {
  //      getTestResultList(); 
  //   }else if(testresultlist != null){
  //     setTestResultList(props.value)
  //   }

  // }, []);

  // async function getTestResultList() {
  //   try {
  //     const response = await axios.get(
  //       'http://localhost:8080/api/test/selectspecimen'
  //     );

  //     response.data.map((testresultlist, i) => {
  //       testresultlist.id = i;
  //     });
  //     setTestResultList(response.data)

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const [selectionModel1, setSelectionModel1] = React.useState([]); // 첫번째 그리드에서 선택한 값들
  const [selectedtestname, setSelectedtestname] = React.useState([]);

  return (
    <Box sx={{ height: 450 }} xs={12}>
      <DataGrid
        rows={testresultlist}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        isRowSelectable={(params) => {
          if (selectionModel1.length == 0) {
            return true;
          } else {
            if (params.row.f == selectedtestname) return true;
            else return false;
          }
        }} //true or false
        onSelectionModelChange={(newSelectionModel) => {
          testresultlist.map((a) => {
            if (a.id == newSelectionModel) setSelectedtestname(a.f);
          });
          setSelectionModel1(newSelectionModel);
        }}
        selectionModel={selectionModel1}
        disableSelectionOnClick //체크박스만 클릭했을때 가능
        experimentalFeatures={{ newEditingApi: true }}
      ></DataGrid>

      <Grid item xs={12} sx={{ mx: 2, my: 2 }} display="flex" justifyContent="center">
        <Button variant="contained" color="success" sx={{ width: 500 }} onClick={navigateToPurchase} >분석</Button>
      </Grid>

    </Box >
  );
}