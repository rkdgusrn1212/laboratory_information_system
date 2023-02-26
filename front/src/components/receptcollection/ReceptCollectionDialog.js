import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
// 여기까진 데이타 그리드 +검색
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
// Import Swiper React components
import JsBarcode from 'jsbarcode';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
//카드
import Typography from '@mui/material/Typography';
//그리드
import Grid from '@mui/material/Grid';
//체크박스

//receptcollection 에서 rows5값으로 출력 진행하면 됨

export default function ReceptCollectionDialog(props) {
  useEffect(() => {
    //
  }, []);

  const { onClose, selectedValue, open, img } = props;
  const [collect, setCollect] = useState([]);
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>채혈 바코드 출력</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          아래의 바코드를 출력하시어 용기에 부착하십시오.
        </DialogContentText>
      </DialogContent>
      <List sx={{ pt: 0 }}>
        <Swiper
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {selectedValue.map((pre, i) => {
            return (
              <SwiperSlide>
                <div className="testcodetop">
                  <Grid
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      mx: 3,
                    }}
                  >
                    <Grid item xs={4} sx={{ mx: 2 }}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        환자번호: {pre.patientNo}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: 2 }}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        오더번호: {pre.prescriptionOrderNo}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: 2 }}>
                      <Typography
                        sx={{ fontSize: 14 }}
                        item
                        xs={4}
                        color="text.secondary"
                      >
                        처방코드: {pre.prescriptionCode}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <p></p>
                <div className="barcord">
                  <Grid
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Grid item xs={1} sx={{}}>
                      <Typography
                        sx={{ fontSize: 14, my: 3 }}
                        color="text.secondary"
                      >
                        용기코드:{' '}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14, my: 3 }}
                        color="text.secondary"
                      >
                        {pre.specimenContainerCode}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{}}>
                      {img[i] && <img src={img[i]} />}
                    </Grid>
                  </Grid>
                </div>
                <div className="testcodebottom">
                  <Grid
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Grid item xs={4} sx={{ mx: 2 }}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        검사명:{pre.prescriptionName}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
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

ReceptCollectionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.any.isRequired,
  img: PropTypes.any.isRequired,
};
//------------------------다이얼로그
