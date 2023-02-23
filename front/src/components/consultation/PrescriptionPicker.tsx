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
import { ChangeEvent, useEffect, useState } from 'react';
import {
  ReadPrescriptionListRequest,
  useLazyCountPrescriptionQuery,
  useLazyReadPrescriptionListQuery,
} from '../../services/prescriptionApi';
import { Prescription } from '../../services/types';

interface Column {
  id: keyof Prescription;
  label: string;
  width?: number;
  align?: 'right';
  // eslint-disable-next-line no-unused-vars
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'prescriptionCode', label: '처방코드', width: 100 },
  {
    id: 'prescriptionName',
    label: '처방명',
  },
  {
    id: 'prescriptionClassificationCode',
    label: '분류',
    width: 80,
  },
];

const ROW_PER_PAGE = 5;

type ConditionStates = keyof Pick<
  ReadPrescriptionListRequest,
  'prescriptionCodeKey' | 'prescriptionNameKey'
>;

const PrescriptionPicker: React.FC<{
  // eslint-disable-next-line no-unused-vars
  onPrescriptionPick: (prescription: Prescription) => void;
}> = ({ onPrescriptionPick }) => {
  const [condition, setCondition] = useState<ConditionStates>(
    'prescriptionCodeKey',
  );
  const [page, setPage] = useState(0);
  const [searchKey, setSearchKey] = useState('');
  const [readPrescriptionList] = useLazyReadPrescriptionListQuery({
    pollingInterval: 20000,
  });
  const [countPrescription, countPrescriptionResult] =
    useLazyCountPrescriptionQuery({
      pollingInterval: 20000,
    });
  const [rows, setRows] = useState<Prescription[]>([]);

  useEffect(() => {
    countPrescription();
    readPrescriptionList({
      pageStart: page * ROW_PER_PAGE,
      pageSize: ROW_PER_PAGE,
      [condition]: searchKey,
    })
      .unwrap()
      .then((data) => setRows(data));
  }, [page, countPrescription, readPrescriptionList, condition, searchKey]);

  const handleSearchKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value as ConditionStates);
  };

  const emptyRows = Math.max(0, ROW_PER_PAGE - rows.length);

  return (
    <Paper
      sx={{
        height: '100%',
        pt: 3,
      }}
    >
      <Stack
        direction="column"
        alignContent="stretch"
        justifyContent="start"
        width={500}
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
              <MenuItem value={'prescriptionCodeKey'}>처방코드</MenuItem>
              <MenuItem value={'prescriptionNameKey'}>처방명</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }} variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">검색</InputLabel>
            <OutlinedInput
              id="search"
              type="search"
              value={searchKey}
              onChange={handleSearchKeyChange}
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
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    onClick={() => onPrescriptionPick(row)}
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
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ overflow: 'unset' }}
          component="div"
          count={
            countPrescriptionResult.data ? countPrescriptionResult.data : 0
          }
          rowsPerPage={ROW_PER_PAGE}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[ROW_PER_PAGE]}
        />
      </Stack>
    </Paper>
  );
};
export default PrescriptionPicker;
