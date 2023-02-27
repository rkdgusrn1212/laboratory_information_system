import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

// const columns = [
//   { field: 'specimenNo', headerName: '검체번호', flex: 1 },
//   { field: 'specimeTypeName', headerName: '검체명', flex: 1 },
//   { field: 'patientNo', headerName: '환자번호', flex: 1 },
//   { field: 'patientName', headerName: '환자명', flex: 1 },
//   { field: 'prescriptionCode', headerName: '검사코드', flex: 1 },
//   { field: 'prescriptionName', headerName: '검사명', flex: 1 },
//   { field: 'receptionDate', headerName: '검사접수일자', flex: 1 },
// ];

const columns = [
  { field: 'patientNo', headerName: '환자번호', flex: 1 },
  { field: 'patientName', headerName: '환자명', flex: 1 },
  { field: 'prescriptionCode', headerName: '검사코드', flex: 1 },
  { field: 'prescriptionName', headerName: '검사명', flex: 1 },
  { field: 'specimeTypeName', headerName: '검체명', flex: 1 },
  { field: 'receptionDate', headerName: '검사접수일자', flex: 1 },
];

export default function ResultSearchList(props) {
  const navigate = useNavigate();

  const navigateToPurchase = () => {
    navigate('/test/analysis', {
      state: {
        a: selectedspecimenno,
        b: selectedpatientno,
        c: selectedpatientname,
        d: selectedprescriptioncode,
        e: selectedstartdate,
        f: selectedenddate,
      },
    });
  };

  // a = { selectedspecimenno }
  // b = { selectedpatientno }
  // c = { selectedpatientname }
  // d = { selectedprescriptioncode }
  // e = { selectedstartdate }
  // f = { selectedenddate }

  const [testresultlist, setTestResultList] = useState('');
  const [selectedstartdate, setSelectedStartDate] = useState('');
  const [selectedenddate, setSelectedEndDate] = useState('');
  useEffect(() => {
    getTestResultList();
  }, []);

  useEffect(() => {
    if (props.value.length != 0) {
      setTestResultList(props.value);
      setSelectedStartDate(props.value2);
      setSelectedEndDate(props.value3);
    }
  }, [props.value, setTestResultList]);

  async function getTestResultList() {
    try {
      const response = await axios.get(
        'http://13.209.219.162/api/result/findresultlist',
      );

      response.data.map((testresultlist, i) => {
        testresultlist.id = i;
      });
      setTestResultList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const [selectedmodel, setSelectedmodel] = useState([]); // 첫번째 그리드에서 선택한 값들

  const [selectedspecimenno, setSelectedSpecimenNo] = useState([]);
  const [selectedpatientno, setSelectedPatientNo] = useState([]);
  const [selectedpatientname, setSelectedPatientName] = useState([]);
  const [selectedprescriptioncode, setSelectedPrescriptionCode] = useState([]);

  return (
    <Box sx={{ height: 400 }} xs={12}>
      <DataGrid
        rows={testresultlist}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        isRowSelectable={(params) => {
          if (selectedmodel.length == 0) {
            return true;
          } else {
            if (params.row.patientName == selectedpatientname) return true;
            else return false;
          }
        }} //true or false
        onSelectionModelChange={(newSelectionModel) => {
          testresultlist.map((a) => {
            if (a.id == newSelectionModel) {
              setSelectedSpecimenNo(a.specimenNo);
              setSelectedPatientNo(a.patientNo);
              setSelectedPatientName(a.patientName);
              setSelectedPrescriptionCode(a.prescriptionCode);
            }
          });
          setSelectedmodel(newSelectionModel);
        }}
        selectionModel={selectedmodel}
        disableSelectionOnClick //체크박스만 클릭했을때 가능
        experimentalFeatures={{ newEditingApi: true }}
      ></DataGrid>

      <Grid
        item
        xs={12}
        sx={{ mx: 2, my: 2 }}
        display="flex"
        justifyContent="center"
      >
        <Button
          variant="contained"
          color="success"
          sx={{ width: 500 }}
          onClick={navigateToPurchase}
        >
          분석
        </Button>
      </Grid>
    </Box>
  );
}
