import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';
import axios from 'axios';

const columns = [
  { flex: 1, headerName: '검체코드', field: 'specimenNo' },
  { flex: 1, headerName: '환자이름', field: 'patientName' },
  { flex: 1, headerName: '검사코드', field: 'prescriptionCode' },
  { flex: 1, headerName: '오더일자', field: 'prescriptionOrderTime' },
  { flex: 1, headerName: '채혈일자', field: 'collectDate' },
  { flex: 1, headerName: '검사접수일자', field: 'receptionDate' },
];

export default function ResultList(props) {
  const [specimenlist, setSpecimenList] = useState('');
  const [resultlist, setResultList] = useState('');

  useEffect(() => {
    getReceptlist();
    getResultlist();
  }, []);

  function sendSpecimenList() {
    props.setCompletTest(specimenlist);
    props.setInCompletTest(resultlist);
  }

  useEffect(() => {
    sendSpecimenList();
  });

  async function getReceptlist() {
    try {
      const response = await axios.get(
        'http://13.209.219.162/api/test/selectspecimen',
      );

      response.data.map((specimenlist, i) => {
        specimenlist.id = i;
      });

      setSpecimenList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getResultlist() {
    try {
      const response = await axios.get(
        'http://13.209.219.162/api/testresult/selectresult',
      );

      setResultList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper style={{ height: 445, width: '100%' }}>
      <DataGrid
        rows={specimenlist}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // onRowClick={handlebarcode}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Paper>
  );
}
