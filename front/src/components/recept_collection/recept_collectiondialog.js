import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from "react";
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
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
//카드
import Typography from '@mui/material/Typography';
//그리드
import Grid from '@mui/material/Grid';
//체크박스

const testcodes = ['23012600001', '23012600002', '23012600003', '23012600004'];
const nawon = ['소화기내과(GI) - 제2병동', '신경외과(NS) - 제1병동', '소화기내과(GI) - 제2병동', '신경외과(NS) - 제1병동'];
//receptcollection 에서 rows5값으로 출력 진행하면 됨




export default function ReceptCollectionDialog(props) {
    const [imageUrl1, setImageUrl1] = useState([])
    const [imageUrl, setImageUrl] = useState([])

    useEffect(() => {
        setimg123();
    }, [])


    const setimg123 = () => {
        testcodes.map((testcode, idx) => {
            const canvas = document.createElement('canvas')
            JsBarcode(canvas, testcode, { height: 50, displayValue: true })
            setImageUrl(canvas.toDataURL('image/png'))
            imageUrl1[idx] = canvas.toDataURL('image/png');
        })

    }



    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
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
                        type: "fraction",
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        testcodes.map((testcode, i) => (
                            <SwiperSlide>
                                <div className='testcodetop' >
                                    <Grid sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', mx: 3 }}>
                                        <Grid item xs={4} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                환자이름
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                진료과
                                            </Typography></Grid>
                                        <Grid item xs={4} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14 }} item xs={4} color="text.secondary" gutterBottom>
                                                처방코드
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <p></p>
                                <div className='barcord'>
                                    <Grid sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                        <Grid item xs={3} sx={{}}>
                                            <Typography sx={{ fontSize: 14, my: 3 }} color="text.secondary" gutterBottom>
                                                용기명
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9} sx={{}}>
                                            {imageUrl[i] && <img src={imageUrl1[i]} />}
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className='testcodebottom'>
                                    <Grid sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                        <Grid item xs={4} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                검사명
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                검사실
                                            </Typography></Grid>

                                    </Grid>
                                </div>
                            </SwiperSlide>
                        ))}

                    <br /><br /><br />
                </Swiper>

            </List>

            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    확인
                </Button>
            </DialogActions>

        </Dialog >

    );
}

ReceptCollectionDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
//------------------------다이얼로그