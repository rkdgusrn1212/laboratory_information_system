import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useState, useEffect } from 'react';
import axios from 'axios';


const columns = [
  {
    width: 120,
    label: '검체코드',
    dataKey: 'specimenNo',
  },
  {
    width: 100,
    label: '환자이름',
    dataKey: 'patientName',

  },
  {
    width: 100,
    label: '검사코드',
    dataKey: 'testCode',

  },
  {
    width: 120,
    label: '오더일자',
    dataKey: 'orderDate',

  },
  {
    width: 120,
    label: '채혈일자',
    dataKey: 'collectDate',

  },
  {
    width: 120,
    label: '검사접수일자',
    dataKey: 'receptionDate',

  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => <Table {...props} style={{ borderCollapse: 'separate' }} />,
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ResultList() {

  const [specimenlist, setSpecimenList] = useState('');

  useEffect(() => {
    getReceptlist();
  }, []);

  async function getReceptlist() {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/test/selectspecimen'
      );

      setSpecimenList(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper style={{ height: 475, width: '100%' }}>
      <TableVirtuoso
        data={specimenlist}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}