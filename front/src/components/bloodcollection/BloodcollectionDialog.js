import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
// Import Swiper React components
import { useEffect, useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
//datagrid
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
//그리드
const testcodes = ['23012600001', '23012600002', '23012600003', '23012600004'];
var search1 = 'test';
// ----검체정보
// 검체번호 specimen_no
// 검체명 test_name
// 용기명 test_container

// ---환자정보
// 환자번호 patient_no
// 환자이름 patient_name
// 주민번호 patient_rrn

// ---처방정보
// 처방번호 order_no
// 진료의 staff_name
// 처방일자 ordr_date

// ---검사분류
// 검사분류명  field_name
// 검사명 test_name
// 진료과 department_code
const specimens = [
  {
    specimen: [
      {
        specimen_no: 'specimen_no1',
        test_name: 'test_name1',
        test_container: 'test_container1',
        patient_no: ' patient_no1',
        patient_name: 'patient_name1',
        patient_rrn: 'patient_rrn1',
        order_no: 'order_no1',
        staff_name: 'staff_name1',
        ordr_date: 'ordr_date1',
        field_name: 'field_name1',
        test_name: 'test_name1',
        department_code: 'department_code1',
      },
      {
        specimen_no: 'specimen_no2',
        test_name: 'test_name2',
        test_container: 'test_container2',
        patient_no: ' patient_no2',
        patient_name: 'patient_name2',
        patient_rrn: 'patient_rrn2',
        order_no: 'order_no2',
        staff_name: 'staff_name2',
        ordr_date: 'ordr_date2',
        field_name: 'field_name2',
        test_name: 'test_name2',
        department_code: 'department_code2',
      },
      {
        specimen_no: 'specimen_no3',
        test_name: 'test_name3',
        test_container: 'test_container3',
        patient_no: ' patient_no3',
        patient_name: 'patient_name3',
        patient_rrn: 'patient_rrn3',
        order_no: 'order_no3',
        staff_name: 'staff_name3',
        ordr_date: 'ordr_date3',
        field_name: 'field_name3',
        test_name: 'test_name3',
        department_code: 'department_code3',
      },
    ],
  },
];

export default function BloodcollectionsDialog(props) {
  const [find, setFind] = useState([]);
  const [search, setSearch] = useState('');

  const onSearchtest = (event) => {
    setSearch(search1);
  };
  useEffect(() => {
    onSearchtest();
  });

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };
  return (
    <Dialog maxWidth="lg" onClose={handleClose} open={open}>
      <DialogTitle>검체 정보</DialogTitle>
      <List sx={{ pt: 0 }}>
        <Swiper
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {testcodes.map((testcode, i) => (
            <SwiperSlide>
              <Typography sx={{ fontSize: 14, mx: 9 }}>검체정보</Typography>
              <Grid sx={{ display: 'flex', justifyContent: 'center', mx: 9 }}>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="검체번호"
                    variant="filled"
                    value={search1}
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="검체명"
                    variant="filled"
                    value={search1}
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="용기명"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
              </Grid>
              <Typography sx={{ fontSize: 14, mx: 9 }}>채혈자 정보</Typography>
              <Grid sx={{ display: 'flex', justifyContent: 'center', mx: 9 }}>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="채혈자"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="채혈자 번호"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="채혈일시"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
              </Grid>
              <Typography sx={{ fontSize: 14, mx: 9 }}>환자정보</Typography>
              <Grid sx={{ display: 'flex', justifyContent: 'center', mx: 9 }}>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="환자번호"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="환자이름"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="주민번호"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
              </Grid>

              <Typography sx={{ fontSize: 14, mx: 9 }}>처방정보</Typography>
              <Grid sx={{ display: 'flex', justifyContent: 'center', mx: 9 }}>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="처방번호"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="진료의"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="처방일자"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
              </Grid>
              <Typography sx={{ fontSize: 14, mx: 9 }}>검사분류</Typography>
              <Grid sx={{ display: 'flex', justifyContent: 'center', mx: 9 }}>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="검사분류명"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="검사명"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sx={{ mx: 2 }}>
                  <TextField
                    sx={{ m: 1, width: '34ch' }}
                    disabled
                    id="filled-disabled"
                    label="진료과"
                    variant="filled"
                    value={search}
                    size="small"
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <br />
            </SwiperSlide>
          ))}
        </Swiper>
      </List>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
BloodcollectionsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
