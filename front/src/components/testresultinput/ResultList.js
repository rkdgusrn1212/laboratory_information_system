import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useAppSelector } from '../../hooks';
import { selectAccount } from '../../services/accountSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';

const columns = [
  { width: 120, headerName: '검체코드', field: 'specimenNo' },
  { width: 100, headerName: '환자이름', field: 'patientName' },
  { width: 100, headerName: '검사코드', field: 'testCode' },
  { width: 120, headerName: '오더일자', field: 'orderDate' },
  { width: 120, headerName: '채혈일자', field: 'collectDate' },
  { width: 120, headerName: '검사접수일자', field: 'receptionDate' }
];

export function InputDialog() {
  const [open, setOpen] = useState(false);

  const [barcode, setBarCode] = useState('');

  const handlebarcode = (e) => {
    setBarCode(e.target.value);
  }

  const handleClickOpen = (e) => {
    setOpen(true);

    searchbarcode(e.target.value)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickClose = (e) => {
    insertinput(e.target.value);

    setOpen(false);
  };

  const [specimenno, setSpecimenNo] = useState('');
  const [testspecimen, setTestSpecimen] = useState('');
  const [testcontainer, setTestContainer] = useState('');

  const [patientno, setPatientNo] = useState('');
  const [patientname, setPatientName] = useState('');
  const [patientrrn, setPatientRrn] = useState('');

  const [prescriptioncode, setPrescriptionCode] = useState('');
  const [prescriptionname, setPrescriptionName] = useState('');
  const [orderdate, setOrderDate] = useState('');

  const [receptteststaffno, setReceptTestStaffNo] = useState('');
  const [receptteststaffname, setReceptTestStaffName] = useState('');
  const [recepttestdate, setReceptTestDate] = useState('');

  const [testcode, setTestCode] = useState('');
  const [fieldname, setFieldName] = useState('');
  const [testname, setTestName] = useState('');

  const account = useAppSelector(selectAccount);
  const date = moment().format('YYYYMMDD');
  const showdate = moment().format('YYYY-MM-DD')

  const [testreference, setTestReference] = useState('');
  const [resultobserved, setResultObserved] = useState('');

  const handleresult = (e) => {
    setResultObserved(e.target.value);
    // console.log(e.target.value);
  }

  const searchbarcode = async () => {

    try {
      const searchSpecimenInfo = await axios.get(
        'http://localhost:8080/api/testresult/findspecimen',
        {
          params: {
            specimenNo: barcode
          }
        }
      );
      setSpecimenNo(searchSpecimenInfo.data.specimenNo);
      setTestSpecimen(searchSpecimenInfo.data.testSpecimen);
      setTestContainer(searchSpecimenInfo.data.testContainer);

      setPatientNo(searchSpecimenInfo.data.patientNo);
      setPatientName(searchSpecimenInfo.data.patientName);
      setPatientRrn(searchSpecimenInfo.data.patientRrn);

      setPrescriptionCode(searchSpecimenInfo.data.prescriptionCode);
      setPrescriptionName(searchSpecimenInfo.data.prescriptionName);
      setOrderDate(searchSpecimenInfo.data.orderDate);

      setReceptTestStaffNo(searchSpecimenInfo.data.receptTestStaffNo);
      setReceptTestStaffName(searchSpecimenInfo.data.receptTestStaffName);
      setReceptTestDate(searchSpecimenInfo.data.receptTestDate);

      setTestCode(searchSpecimenInfo.data.testCode);
      setFieldName(searchSpecimenInfo.data.fieldName);
      setTestName(searchSpecimenInfo.data.testName);

      setTestReference(searchSpecimenInfo.data.testReference);
    } catch (error) {
      console.log(error);
    }
  };

  const insertinput = () => {
    try {
      axios.post(
        'http://localhost:8080/api/testresult/testresultinput',
        {
          data: {
            specimenNo: barcode,
            testCode: testcode,
            staffNo: account.principal.staffVo.staffNo,
            resultObserved: resultobserved,
            resultDate: date
          }
        }
      );
      alert('검사결과 입력이 완료되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', mx: 2, gap: 2 }}>
          <Grid item xs={8} sx={{ mx: 2, mb: 2 }} display="flex" justifyContent="center">
            <TextField sx={{ width: '90%' }}
              size="small" value={barcode} onChange={handlebarcode}
            />
          </Grid>
          <Grid item xs={4} sx={{ mx: 2, mb: 2 }} display="flex" justifyContent="center" >
            <Button sx={{ width: '80%' }}
              variant="contained" color="success" onClick={handleClickOpen}
            >
              입력
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth="fullWidth"
        maxWidth="lg"
      >
        <DialogTitle >{"검체 정보"}</DialogTitle>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} >
            <DialogContent>
              <DialogContentText >
                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="검체번호" size="small" value={specimenno} disabled />
                    <TextField label="검체명" size="small" value={testspecimen} disabled />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="용기명" size="small" value={testcontainer} disabled />
                  </Grid>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="환자번호" size="small" value={patientno} disabled />
                    <TextField label="환자명" size="small" value={patientname} disabled />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="환자주민번호" size="small" value={patientrrn} disabled />
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="처방코드" size="small" value={prescriptioncode} disabled />
                    <TextField label="처방명" size="small" value={prescriptionname} disabled />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="처방날짜" size="small" value={orderdate} disabled />
                  </Grid>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="검사접수자번호" size="small" value={receptteststaffno} disabled />
                    <TextField label="검사접수자명" size="small" value={receptteststaffname} disabled />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="검사접수날짜" size="small" value={recepttestdate} disabled />
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="검사코드" size="small" value={testcode} disabled />
                    <TextField label="검사분야명" size="small" value={fieldname} disabled />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="검사명" size="small" value={testname} disabled />
                  </Grid>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="검사입력자번호" size="small" value={account.principal.staffVo.staffNo} disabled />
                    <TextField label="검사입력자명" size="small" value={account.principal.staffVo.staffName} disabled />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField label="검사입력날짜" size="small" value={showdate} disabled />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>

          </Grid>
        </Box>

        <DialogTitle >{"결과 입력"}</DialogTitle>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <DialogContent>
              <DialogContentText>
                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                  <Grid item xs={6} sx={{ display: 'flex', mx: 2 }}>
                    <TextField multiline rows={6} fullWidth label="결과 값" size="small"
                      value={resultobserved} onChange={handleresult} placeholder="내용을 입력해주세요" />
                  </Grid>
                  <Grid item xs={6} sx={{ display: 'flex', mx: 2 }}>
                    <TextField multiline rows={6} fullWidth label="참고치" size="small"
                      value={testreference} disabled />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
          </Grid>
        </Box>

        <DialogActions>
          <Button variant="contained" color="success" onClick={handleClickClose} sx={{ width: 400 }}>결과등록</Button>
        </DialogActions>

      </Dialog>
    </div >
  );
}

export function ResultList() {

  const [specimenlist, setSpecimenList] = useState('');

  const [barcode, setBarCode] = useState('');

  useEffect(() => {
    getReceptlist();
  }, []);

  const handlebarcode = (e) => {
    setBarCode(e.row.specimenNo)
  }

  async function getReceptlist() {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/test/selectspecimen'
      );

      response.data.map((specimenlist, i) => {
        specimenlist.id = i;
      });

      setSpecimenList(response.data)

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Paper style={{ height: 475, width: '100%' }}>
      <DataGrid
        rows={specimenlist}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onRowClick={handlebarcode}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Paper>

  );
}