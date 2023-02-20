import {
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
import { useEffect, useState } from 'react';
import { useLazyReadPrescriptionListQuery } from '../../services/prescriptionApi';
import { Prescription } from '../../services/types';

interface Column {
  id: keyof Prescription;
  label: string;
  minWidth?: number;
  align?: 'right';
  // eslint-disable-next-line no-unused-vars
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'prescriptionCode', label: '처방코드', minWidth: 100 },
  {
    id: 'prescriptionName',
    label: '처방명',
    minWidth: 170,
  },
  {
    id: 'prescriptionComment',
    label: '메모',
  },
  {
    id: 'prescriptionClassificationCode',
    label: '분류',
  },
];

const PrescriptionPicker: React.FC = () => {
  const [condition, setCondition] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [readPrescriptionList] = useLazyReadPrescriptionListQuery({
    pollingInterval: 20000,
  });
  const [rows, setRows] = useState<Prescription[]>([]);

  useEffect(() => {
    readPrescriptionList({
      pageStart: page * rowsPerPage,
      pageSize: rowsPerPage,
    })
      .unwrap()
      .then((data) => setRows(data));
  }, [page, readPrescriptionList, rowsPerPage]);

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

  const emptyRows = Math.max(0, rowsPerPage - rows.length);

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
          처방 검색
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
                      key={row.prescriptionCode}
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
          count={1000}
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
