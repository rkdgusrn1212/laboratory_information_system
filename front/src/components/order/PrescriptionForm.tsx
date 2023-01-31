import { useCallback, FormEventHandler, useMemo, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Patient } from '../../services/types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import OrderTable from './OrderTable';
import Button from '@mui/material/Button';

const PrescriptionForm: React.FC<{ patient: Patient | null }> = ({
  patient,
}) => {
  const [condition, setCondition] = useState('name');

  const handleChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value as string);
  };
  const handleSubmit: FormEventHandler = useCallback((event) => {
    event.preventDefault();
    return null;
  }, []);
  const age = useMemo(() => {
    if (patient) {
      return (
        new Date(new Date().getTime() - patient.birth.getTime()).getFullYear() -
        1970
      );
    }
    return 0;
  }, [patient]);
  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5">처방</Typography>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>
              처방 환자
            </Typography>
          </Grid>
          <Grid item xs={3} xl={1}>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="환자번호"
              disabled
              value={patient?.no}
            />
          </Grid>
          <Grid item xs={9} xl={3.5}>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="성명"
              disabled
              value={patient?.name}
            />
          </Grid>
          <Grid item xs={4} xl={1.5}>
            <TextField
              fullWidth
              type="number"
              size="small"
              disabled
              label="나이"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">만</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">세</InputAdornment>
                ),
              }}
              value={age}
            />
          </Grid>
          <Grid item xs={2} xl={1}>
            <TextField
              fullWidth
              type="text"
              size="small"
              label="성별"
              disabled
              value={patient?.male ? '남' : '여'}
            />
          </Grid>
          <Grid item xs={6} xl={5}>
            <TextField
              fullWidth
              type="text"
              size="small"
              label="주민번호"
              disabled
              value={patient?.rnn}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>
              처방 오더
            </Typography>
          </Grid>

          <Grid item xs={12} xl={4}>
            <Box
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FormControl sx={{ m: 1, width: '150px' }} size="small">
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
                  <MenuItem value={'name'}>질병코드</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={{ m: 1, width: '25ch' }}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  검색
                </InputLabel>
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
            </Box>
            <TreeView
              aria-label="multi-select"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              multiSelect
              sx={{
                height: 216,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: 'auto',
              }}
            >
              <TreeItem nodeId="1" label="간기능 및 담도계">
                <TreeItem nodeId="2" label="Total protein" />
                <TreeItem nodeId="3" label="Albumin" />
                <TreeItem nodeId="4" label="Globulin" />
                <TreeItem nodeId="5" label="A/G ratio" />
              </TreeItem>
              <TreeItem nodeId="6" label="신장기능">
                <TreeItem nodeId="7" label="BUN" />
                <TreeItem nodeId="8" label="Creatinine" />
                <TreeItem nodeId="9" label="B/C ratio" />
                <TreeItem nodeId="10" label="A/G ratio" />
              </TreeItem>
              <TreeItem nodeId="11" label="통풍">
                <TreeItem nodeId="12" label="Uric acid" />
              </TreeItem>
              <TreeItem nodeId="13" label="관절염">
                <TreeItem nodeId="14" label="RA factor" />
              </TreeItem>
              <TreeItem nodeId="15" label="혈당">
                <TreeItem nodeId="16" label="Glucose" />
                <TreeItem nodeId="17" label="HbA1c" />
              </TreeItem>
            </TreeView>
          </Grid>
          <Grid item xs={12} xl={8} height="500">
            <OrderTable />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained">
              처방 등록
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
export default PrescriptionForm;
