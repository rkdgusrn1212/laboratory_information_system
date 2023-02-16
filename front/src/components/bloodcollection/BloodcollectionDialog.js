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
import axios from 'axios';

export default function BloodcollectionsDialog(props) {
  const [collect, setCollect] = useState([]);

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    //
  }, []);

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
          {selectedValue.map((list, i) => {
            axios({
              method: 'get',
              url: `http://localhost:8080/api/collect/collectlistbyno?specimenNo=${list}`,
            }).then(function (response) {
              setCollect(response.data);
            });

            return (
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
                      value={list}
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
                      value={collect.testName}
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
                      value={collect.testContainer}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Typography sx={{ fontSize: 14, mx: 9 }}>
                  채혈자 정보
                </Typography>
                <Grid sx={{ display: 'flex', justifyContent: 'center', mx: 9 }}>
                  <Grid item xs={4} sx={{ mx: 2 }}>
                    <TextField
                      sx={{ m: 1, width: '34ch' }}
                      disabled
                      id="filled-disabled"
                      label="채혈자"
                      variant="filled"
                      value={''}
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
                      value={collect.staffNo}
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
                      value={collect.collectDate}
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
                      value={collect.patientNo}
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
                      value={''}
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
                      value={''}
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
                      value={''}
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
                      value={''}
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
                      value={''}
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
                      value={collect.fieldName}
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
                      value={collect.testName}
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
                      value={''}
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
