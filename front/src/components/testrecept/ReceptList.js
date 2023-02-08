import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const sample = [
  ['22122300001', '강현구', 'LX20221', '2022/12/12', '2022/12/22'],
  ['22122300002', '김동신', 'LX20331', '2022/12/11', '2022/12/23'],
  ['22122300003', '류호진', 'KY20221', '2022/12/13', '2022/12/22'],
  ['22122300004', '서민석', 'LX00221', '2022/12/09', '2022/12/24'],
  ['22122300005', '홍건호', 'UX89002', '2022/11/30', '2022/12/21'],
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const columns = [
  {
    width: 200,
    label: '검체코드',
    dataKey: 'dessert',
  },
  {
    width: 120,
    label: '환자이름',
    dataKey: 'calories',
    
  },
  {
    width: 120,
    label: '검사코드',
    dataKey: 'fat',
    
  },
  {
    width: 120,
    label: '오더일자',
    dataKey: 'carbs',
   
  },
  {
    width: 120,
    label: '채혈일자',
    dataKey: 'protein',
    
  },
];

//const columns = [
//   {
//     width: 200,
//     label: 'Dessert',
//     dataKey: 'dessert',
//   },
//   {
//     width: 120,
//     label: 'Calories\u00A0(g)',
//     dataKey: 'calories',
//     numeric: true,
//   },
//   {
//     width: 120,
//     label: 'Fat\u00A0(g)',
//     dataKey: 'fat',
//     numeric: true,
//   },
//   {
//     width: 120,
//     label: 'Carbs\u00A0(g)',
//     dataKey: 'carbs',
//     numeric: true,
//   },
//   {
//     width: 120,
//     label: 'Protein\u00A0(g)',
//     dataKey: 'protein',
//     numeric: true,
//   },
// ];

const rows = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

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

export default function ReceptList() {
  return (
    <Paper style={{ height: 460, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}