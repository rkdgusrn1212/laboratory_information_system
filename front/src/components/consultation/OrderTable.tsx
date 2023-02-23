import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Skeleton from '@mui/material/Skeleton';
import { Stack } from '@mui/material';
import { Prescription } from '../../services/types';

const tableMinWidth = 600;

const ROW_PER_PAGE = 12;
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof Prescription>(
  order: Order,
  orderBy: Key,
): (
  // eslint-disable-next-line no-unused-vars
  a: { [key in Key]: number | string | null },
  // eslint-disable-next-line no-unused-vars
  b: { [key in Key]: number | string | null },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  // eslint-disable-next-line no-unused-vars
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Prescription;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'prescriptionCode',
    numeric: false,
    disablePadding: false,
    label: '처방코드',
  },
  {
    id: 'prescriptionName',
    numeric: false,
    disablePadding: false,
    label: '처방명',
  },
  {
    id: 'prescriptionClassificationCode',
    numeric: false,
    disablePadding: false,
    label: '처방분류',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<unknown>,
    // eslint-disable-next-line no-unused-vars
    property: keyof Prescription,
  ) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Prescription) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDeleteClick: () => void;
}

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = ({
  numSelected,
  onDeleteClick,
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} 선택
        </Typography>
      ) : (
        <></>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export const OrderTable: React.FC<{
  disabled: boolean;
  prescriptionList: Prescription[];
  // eslint-disable-next-line no-unused-vars
  onPrescriptionListChanged: (prescriptionList: Prescription[]) => void;
}> = ({ disabled, prescriptionList, onPrescriptionListChanged }) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] =
    React.useState<keyof Prescription>('prescriptionCode');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Prescription,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = prescriptionList.map((n) => n.prescriptionCode);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, code: string) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * ROW_PER_PAGE - prescriptionList.length)
      : 0;

  const handleDeleteClick = () => {
    const resultList = [];
    for (const prescription of prescriptionList) {
      let isSelected = false;
      for (const selectedItem of selected) {
        if (prescription.prescriptionCode === selectedItem) {
          isSelected = true;
          break;
        }
      }
      if (!isSelected) {
        resultList.push(prescription);
      }
    }
    onPrescriptionListChanged(resultList);
    setSelected([]);
  };

  return (
    <Stack width="100%" height="100%">
      {disabled ? (
        <Skeleton sx={{ height: 40, m: 1 }} />
      ) : (
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDeleteClick={handleDeleteClick}
        />
      )}
      {disabled ? (
        <Skeleton
          variant="rectangular"
          sx={{ mb: 3, flexGrow: 1, minWidth: tableMinWidth }}
        />
      ) : (
        <TableContainer
          sx={{ flexGrow: 1, minWidth: tableMinWidth, height: 100 }}
        >
          <Table stickyHeader aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={prescriptionList.length}
            />
            <TableBody>
              {stableSort(prescriptionList, getComparator(order, orderBy))
                .slice(page * ROW_PER_PAGE, page * ROW_PER_PAGE + ROW_PER_PAGE)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.prescriptionCode);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.prescriptionCode)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.prescriptionCode}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.prescriptionCode}
                      </TableCell>
                      <TableCell align="left">{row.prescriptionName}</TableCell>
                      <TableCell align="left">
                        {row.prescriptionClassificationCode}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {disabled ? (
        <Skeleton
          sx={{ alignSelf: 'end', m: 1 }}
          variant="rounded"
          width={300}
        />
      ) : (
        <TablePagination
          rowsPerPageOptions={[ROW_PER_PAGE]}
          component="div"
          count={prescriptionList.length}
          rowsPerPage={ROW_PER_PAGE}
          page={page}
          onPageChange={handleChangePage}
        />
      )}
    </Stack>
  );
};
export default OrderTable;
