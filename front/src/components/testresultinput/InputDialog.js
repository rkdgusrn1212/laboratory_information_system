import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { selectAccount } from '../../services/accountSlice';

export default function InputDialog() {
  const [open, setOpen] = useState(false);

  const [barcode, setBarCode] = useState('');

  const handlebarcode = (e) => {
    setBarCode(e.target.value);
  };

  const handleClickOpen = (e) => {
    setOpen(true);
    searchbarcode(e.target.value);
  };

  const handleClickClose = (e) => {
    insertinput(e.target.value);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [specimenno, setSpecimenNo] = useState('');
  const [specimentypename, setSpecimenTypeName] = useState('');
  const [specimencontainername, setSpecimenContainerName] = useState('');

  const [patientno, setPatientNo] = useState('');
  const [patientname, setPatientName] = useState('');
  const [patientrrn, setPatientRrn] = useState('');

  const [prescriptioncode, setPrescriptionCode] = useState('');
  const [prescriptionname, setPrescriptionName] = useState('');
  const [prescriptionordertime, setPrescriptionOrderTime] = useState('');

  const [receptteststaffno, setReceptTestStaffNo] = useState('');
  const [receptteststaffname, setReceptTestStaffName] = useState('');
  const [receptiondate, setReceptionDate] = useState('');

  const [testfieldname, setTestFieldName] = useState('');

  const account = useAppSelector(selectAccount);
  const date = moment().format('YYYYMMDD');
  const showdate = moment().format('YYYY-MM-DD');

  const [testprescriptionreference, setTestPrescriptionReference] =
    useState('');
  const [resultobserved, setResultObserved] = useState('');

  const handleresult = (e) => {
    setResultObserved(e.target.value);
    // console.log(e.target.value);
  };

  const searchbarcode = async () => {
    try {
      const searchSpecimenInfo = await axios.get(
        'http://13.209.219.162/api/testresult/findspecimen',
        {
          params: {
            specimenNo: barcode,
          },
        },
      );

      setSpecimenNo(searchSpecimenInfo.data.specimenNo);
      setSpecimenTypeName(searchSpecimenInfo.data.specimenTypeName);
      setSpecimenContainerName(searchSpecimenInfo.data.specimenContainerName);

      setPatientNo(searchSpecimenInfo.data.patientNo);
      setPatientName(searchSpecimenInfo.data.patientName);
      setPatientRrn(searchSpecimenInfo.data.patientRrn);

      setPrescriptionCode(searchSpecimenInfo.data.prescriptionCode);
      setPrescriptionName(searchSpecimenInfo.data.prescriptionName);
      setPrescriptionOrderTime(searchSpecimenInfo.data.prescriptionOrderTime);

      setReceptTestStaffNo(searchSpecimenInfo.data.receptTestStaffNo);
      setReceptTestStaffName(searchSpecimenInfo.data.receptTestStaffName);
      setReceptionDate(searchSpecimenInfo.data.receptionDate);

      setTestFieldName(searchSpecimenInfo.data.testFieldName);
      setTestPrescriptionReference(
        searchSpecimenInfo.data.testPrescriptionReference,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const insertinput = () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      url: 'http://13.209.219.162/api/testresult/testresultinput',
      data: JSON.stringify({
        specimenNo: barcode,
        prescriptionCode: prescriptioncode,
        staffNo: account.principal.staffVo.staffNo,
        resultObserved: resultobserved,
        resultDate: date,
      }),
    }).then(function () {
      alert('검사결과 입력이 완료되었습니다.');
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', mx: 2, gap: 2 }}>
          <Grid
            item
            xs={8}
            sx={{ mx: 2, mb: 2 }}
            display="flex"
            justifyContent="center"
          >
            <TextField
              sx={{ width: '90%' }}
              label="바코드 수기 입력"
              size="small"
              value={barcode}
              onChange={handlebarcode}
            />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ mx: 2, mb: 2 }}
            display="flex"
            justifyContent="center"
          >
            <Button
              sx={{ width: '80%' }}
              variant="contained"
              color="success"
              onClick={handleClickOpen}
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
        <DialogTitle>{'검체 정보'}</DialogTitle>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <DialogContent>
              <DialogContentText>
                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="검체번호"
                      size="small"
                      value={specimenno}
                      disabled
                    />
                    <TextField
                      label="검체명"
                      size="small"
                      value={specimentypename}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="용기명"
                      size="small"
                      value={specimencontainername}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="환자번호"
                      size="small"
                      value={patientno}
                      disabled
                    />
                    <TextField
                      label="환자명"
                      size="small"
                      value={patientname}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="환자주민번호"
                      size="small"
                      value={patientrrn}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="처방코드"
                      size="small"
                      value={prescriptioncode}
                      disabled
                    />
                    <TextField
                      label="처방명"
                      size="small"
                      value={prescriptionname}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="처방날짜"
                      size="small"
                      value={prescriptionordertime}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="검사접수자번호"
                      size="small"
                      value={receptteststaffno}
                      disabled
                    />
                    <TextField
                      label="검사접수자명"
                      size="small"
                      value={receptteststaffname}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="검사접수날짜"
                      size="small"
                      value={receptiondate}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="검사코드"
                      size="small"
                      value={prescriptioncode}
                      disabled
                    />
                    <TextField
                      label="검사분야명"
                      size="small"
                      value={testfieldname}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="검사명"
                      size="small"
                      value={prescriptionname}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="검사입력자번호"
                      size="small"
                      value={account.principal.staffVo.staffNo}
                      disabled
                    />
                    <TextField
                      label="검사입력자명"
                      size="small"
                      value={account.principal.staffVo.staffName}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2.5} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                    <TextField
                      label="검사입력날짜"
                      size="small"
                      value={showdate}
                      disabled
                    />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
          </Grid>
        </Box>

        <DialogTitle>{'결과 입력'}</DialogTitle>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <DialogContent>
              <DialogContentText>
                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                  <Grid item xs={6} sx={{ display: 'flex', mx: 2 }}>
                    <TextField
                      multiline
                      rows={6}
                      fullWidth
                      label="결과 값"
                      size="small"
                      value={resultobserved}
                      onChange={handleresult}
                      placeholder="내용을 입력해주세요"
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ display: 'flex', mx: 2 }}>
                    <TextField
                      multiline
                      rows={6}
                      fullWidth
                      label="참고치"
                      size="small"
                      value={testprescriptionreference}
                      disabled
                    />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
          </Grid>
        </Box>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={handleClickClose}
            sx={{ width: 400 }}
          >
            결과등록
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
