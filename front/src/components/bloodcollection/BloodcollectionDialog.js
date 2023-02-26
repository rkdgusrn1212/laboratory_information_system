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

import { Swiper, SwiperSlide } from 'swiper/react';
//datagrid
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
//그리드

export default function BloodcollectionsDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    //
  }, []);

  return (
    <Dialog maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>채혈한 검체와 관련된 검사정보</DialogTitle>
      <List sx={{ pt: 0 }}>
        <Swiper
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {selectedValue.map((list) => {
            return (
              <SwiperSlide>
                <Typography sx={{ fontSize: 14, mx: 9 }}>검체 정보</Typography>
                <Grid sx={{ justifyContent: 'center', display: 'flex', mx: 9 }}>
                  <Grid item xs={4} sx={{ mx: 3 }}>
                    <TextField
                      sx={{ m: 1, width: '20ch' }}
                      disabled
                      id="filled-disabled"
                      label="검체번호"
                      variant="filled"
                      value={list.specimenNo}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ mx: 3 }}>
                    <TextField
                      sx={{ m: 1, width: '20ch' }}
                      disabled
                      id="filled-disabled"
                      label="용기코드"
                      variant="filled"
                      defaultValue={' '}
                      value={list.specimenContainerCode}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ mx: 3 }}>
                    <TextField
                      sx={{ m: 1, width: '20ch' }}
                      disabled
                      id="filled-disabled"
                      label="용기종류코드"
                      variant="filled"
                      defaultValue={' '}
                      value={list.specimenTypeCode}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Typography sx={{ fontSize: 14, mx: 9 }}>
                  채혈자 정보
                </Typography>
                <Grid sx={{ justifyContent: 'center', display: 'flex', mx: 9 }}>
                  <Grid item xs={4} sx={{ mx: 0.5 }}>
                    <TextField
                      sx={{ m: 1, width: '14ch' }}
                      disabled
                      id="filled-disabled"
                      label="바코드 출력자 번호"
                      variant="filled"
                      defaultValue={' '}
                      value={list.printstaffNo}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ mx: 0.5 }}>
                    <TextField
                      sx={{ m: 1, width: '20ch' }}
                      disabled
                      id="filled-disabled"
                      label="바코드 출력 일시"
                      variant="filled"
                      defaultValue={' '}
                      value={list.specimenDate}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ mx: 0.5 }}>
                    <TextField
                      sx={{ m: 1, width: '13ch' }}
                      disabled
                      id="filled-disabled"
                      label="채혈자 번호"
                      variant="filled"
                      defaultValue={' '}
                      value={list.staffNo}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ mx: 0.5 }}>
                    <TextField
                      sx={{ m: 1, width: '20ch' }}
                      disabled
                      id="filled-disabled"
                      label="채혈일시"
                      variant="filled"
                      defaultValue={' '}
                      value={list.collectDate}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Typography sx={{ fontSize: 14, mx: 9 }}>환자정보</Typography>
                <Grid sx={{ justifyContent: 'center', display: 'flex', mx: 9 }}>
                  <Grid item xs={4} sx={{ mx: 3 }}>
                    <TextField
                      sx={{ m: 1, width: '16ch' }}
                      disabled
                      id="filled-disabled"
                      label="환자번호"
                      variant="filled"
                      defaultValue={' '}
                      value={list.patientNo}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ mx: 3 }}>
                    <TextField
                      sx={{ m: 1, width: '18ch' }}
                      disabled
                      id="filled-disabled"
                      label="환자이름"
                      variant="filled"
                      defaultValue={' '}
                      value={list.patientName}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ mx: 3 }}>
                    <TextField
                      sx={{ m: 1, width: '25ch' }}
                      disabled
                      id="filled-disabled"
                      label="주민번호"
                      variant="filled"
                      defaultValue={' '}
                      value={list.patientRrn}
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Typography sx={{ fontSize: 14, mx: 9 }}>처방정보</Typography>
                <Grid sx={{ justifyContent: 'center', display: 'flex', mx: 9 }}>
                  <Grid item xs={4} sx={{ mx: 4 }}>
                    <TextField
                      sx={{ m: 1, width: '22ch' }}
                      disabled
                      id="filled-disabled"
                      label="처방번호"
                      variant="filled"
                      defaultValue={' '}
                      value={list.orderNo}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ mx: 4 }}>
                    <TextField
                      sx={{ m: 1, width: '42ch' }}
                      disabled
                      id="filled-disabled"
                      label="처방명"
                      variant="filled"
                      defaultValue={' '}
                      value={list.prescriptionName}
                      size="small"
                    />
                  </Grid>
                </Grid>

                <br />
                <br />
                <br />
              </SwiperSlide>
            );
          })}
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
  selectedValue: PropTypes.any.isRequired,
};
