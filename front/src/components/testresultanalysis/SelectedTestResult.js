import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useNavigate } from 'react-router-dom';
import Title from './Title';
import axios from 'axios';
import * as React from 'react';

export default function SelectedTestResult(props) {
  const navigate = useNavigate();

  const navigateToPurchase = () => {
    navigate('/test/result');
  };

  const [selectedpatientlist, setSelectedPatientList] = React.useState([]);

  React.useEffect(() => {
    getReceptlist();
  }, []);

  console.log(props.c);
  console.log(props.d);
  console.log(props.e);
  console.log(props.f);

  async function getReceptlist() {
    try {
      const searchpatientInfo = await axios.get(
        'http://13.209.219.162/api/analysis/analysischart',
        {
          params: {
            patientName: props.c,
            prescriptionCode: props.d,
            startDate: props.e,
            endDate: props.f,
          },
        },
      );

      searchpatientInfo.data.map((selectedpatientlist, i) => {
        selectedpatientlist.id = i;
      });

      setSelectedPatientList(searchpatientInfo.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <Title>선택된 검사</Title>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>검사 접수 날짜</TableCell>
            <TableCell>검사 코드</TableCell>
            <TableCell>검사명</TableCell>
            <TableCell>검사 결과</TableCell>
            <TableCell>참고치</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedpatientlist.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.receptionDate}</TableCell>
              <TableCell>{row.prescriptionCode}</TableCell>
              <TableCell>{row.prescriptionName}</TableCell>
              <TableCell>{row.resultObserved}</TableCell>
              <TableCell>{row.testPrescriptionReference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        href="#"
        onClick={navigateToPurchase}
        sx={{ mt: 3 }}
      >
        Orders
      </Link>
    </React.Fragment>
  );
}
