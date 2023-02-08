import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import Title from './Title';
import PrintIcon from '@mui/icons-material/Print';

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
    ''
  ),
  createData(
    1,
    'WBC',
    'ml',
    '2022/03/10',
    11,
    ''
  ),
  createData(
    2,
    'WBC',
    'ml',
    '2022/03/11',
    3,
    ''
  ),
  createData(
    3,
    'WBC',
    'n0/cl',
    '2022/03/12',
    13,
    ''
  ),
  createData(
    4,
    'WBC',
    'ml',
    '2022/03/13',
    12,
    ''
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>선택된 검사</Title>
      <div style={{ display:'flex', justifyContent:'flex-end'}}><PrintIcon></PrintIcon></div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>검사명</TableCell>
            <TableCell>단위</TableCell>
            <TableCell>날짜</TableCell>
            <TableCell>결과</TableCell>
            <TableCell align="right">하하</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment >
  );
}