import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';

const columns = [
  { flex: 1, width: 120, headerName: '검체코드', field: 'specimenNo' },
  { flex: 1, width: 100, headerName: '환자이름', field: 'patientName' },
  { flex: 1, width: 100, headerName: '검사코드', field: 'prescriptionCode' },
  {
    flex: 1,
    width: 120,
    headerName: '오더일자',
    field: 'prescriptionOrderTime',
  },
  { flex: 1, width: 120, headerName: '채혈일자', field: 'collectDate' },
  { flex: 1, width: 120, headerName: '검사접수일자', field: 'receptionDate' },
];

export default function ReceptList() {
  const [specimenlist, setSpecimenList] = useState('');

  useEffect(() => {
    getReceptlist();
  }, []);

  async function getReceptlist() {
    try {
      const response = await axios.get(
        'http://13.209.219.162/api/test/selectspecimen',
      );

      response.data.map((specimenlist, i) => {
        specimenlist.id = i;
      });

      setSpecimenList(response.data);
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={specimenlist}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        SelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Paper>
  );
}
