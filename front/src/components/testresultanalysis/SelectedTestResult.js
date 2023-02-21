import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import Title from './Title';
import PrintIcon from '@mui/icons-material/Print';
import { useNavigate } from "react-router-dom";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    'WBC',
    'ml',
    '2022/03/09',
    10,
    '2433242342'
  ),
  createData(
    1,
    'WBC',
    'ml',
    '2022/03/10',
    11,
    '11'
  ),
  createData(
    2,
    'WBC',
    'ml',
    '2022/03/11',
    3,
    '42424'
  ),
  createData(
    3,
    'WBC',
    'n0/cl',
    '2022/03/12',
    13,
    '444'
  ),
  createData(
    4,
    'WBC',
    'ml',
    '2022/03/13',
    12,
    'aaaaa'
  ),
];



export default function SelectedTestResult() {
  const navigate = useNavigate();

  const navigateToPurchase = () => {
    navigate("/test/result");
  };
  return (
    <React.Fragment>
      <Title>선택된 검사</Title>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}><PrintIcon></PrintIcon></div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>검사명</TableCell>
            <TableCell>단위</TableCell>
            <TableCell>날짜</TableCell>
            <TableCell>결과</TableCell>
            <TableCell>하하</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href='#' onClick={navigateToPurchase} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment >
  );
}