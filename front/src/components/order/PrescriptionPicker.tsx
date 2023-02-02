import TreeItem from '@mui/lab/TreeItem';
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface Column {
  id: 'code' | 'name';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'code', label: '처방코드', minWidth: 100 },
  {
    id: 'name',
    label: '처방명',
    minWidth: 170,
  },
];

interface Data {
  name: string;
  code: string;
}

function createData(code: string, name: string): Data {
  return { name, code };
}

const PrescriptionPicker: React.FC = () => {
  const [condition, setCondition] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value as string);
  };

  const rows = [
    createData('D0001', '일반혈액검사(CBC)-[혈구세포-현미경]'),
    createData('D0002', '일반혈액검사(CBC)-[혈구세포-장비측정]'),
    createData('D0003', '일반혈액검사(CBC)-혈색소[화학반응-육안검사]'),
    createData(
      'D0004',
      '일반혈액검사(CBC)-백혈구 수 [이미지분석법] - 간이검사',
    ),
    createData('D0011', '백혈구백분율(혈액)-[관찰판정-현미경]'),
    createData(
      'D0012',
      '백혈구백분율(혈액)-[혈구세포-현미경](Buffy Coat Smear)',
    ),
    createData('D0013', '호산구수(혈액)-[관찰판정-현미경]'),
    createData('D0021', '호산구수(혈액)-[혈구세포-장비측정]'),
  ];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Paper
      sx={{
        height: '100%',
        py: 3,
        minWidth: 400,
      }}
    >
      <Stack
        direction="column"
        alignContent="stretch"
        justifyContent="start"
        height="100%"
      >
        <Typography variant="h6" ml={3} mb={2}>
          처방 선택
        </Typography>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="stretch"
          spacing={1}
          px={1}
          mb={2}
        >
          <FormControl sx={{ width: 120 }} size="small">
            <InputLabel id="search-condition-label">검색조건</InputLabel>
            <Select
              variant="outlined"
              labelId="search-condition-label"
              id="search-condition"
              value={condition}
              label="검색조건"
              onChange={handleChange}
            >
              <MenuItem value={'panel'}>처방코드</MenuItem>
              <MenuItem value={'name'}>처방명</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }} variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">검색</InputLabel>
            <OutlinedInput
              id="search"
              type="search"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="검색"
            />
          </FormControl>
        </Stack>
        <TableContainer>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minHeight: 0 }}
            size="small"
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={2} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ overflow: 'unset' }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </Paper>
  );
};
export default PrescriptionPicker;
