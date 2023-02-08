import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

export default function InputDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const currencies = [
        {
            value: 'ml',
            label: 'ml',
        },
        {
            value: 'g',
            label: 'g',
        },
        {
            value: 'oz',
            label: 'oz',
        },
        {
            value: 'mc',
            label: 'mc',
        },
        {
            value: 'n0/c',
            label: 'n0/c',
        },
    ];

    return (
        <div>
            <Button variant="contained" color="success" onClick={handleClickOpen} sx={{
                width: 200,
                maxWidth: '100%'
            }}>
                입력
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth="fullWidth"
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">
                    {"검체 정보"}
                </DialogTitle>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} >

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                                    <Grid item xs={3} sx={{ mx: 2 }}>
                                        <TextField label="검체번호" size="small" id="outlined-size-normal" placeholder="검체번호" />
                                    </Grid>

                                    <Grid item xs={3} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                                        <TextField label="처방코드" size="small" id="outlined-size-normal" placeholder="처방코드" />
                                        <TextField label="처방명" size="small" id="outlined-size-normal" placeholder="처방명" />
                                    </Grid>

                                    <Grid item xs={3} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                                        <TextField label="직원번호" size="small" id="outlined-size-normal" placeholder="직원번호" />
                                        <TextField label="직원이름" size="small" id="outlined-size-normal" placeholder="직원이름" />
                                    </Grid>
                                    <Grid item xs={3} sx={{ display: 'flex', mx: 2 }}>
                                        <TextField label="처방일자" size="small" id="outlined-size-normal" placeholder="처방일자" />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                                    <Grid item xs={3} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                                        <TextField label="환자번호" size="small" id="outlined-size-normal" placeholder="환자번호" />
                                        <TextField label="환자이름" size="small" id="outlined-size-normal" placeholder="환자이름" />
                                    </Grid>
                                    <Grid item xs={3} sx={{ display: 'flex', mx: 2 }}>
                                        <TextField label="용기명" size="small" id="outlined-size-normal" placeholder="용기명" />
                                    </Grid>

                                    <Grid item xs={3} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                                        <TextField label="검사분류" size="small" id="outlined-size-normal" placeholder="검사분류" />
                                        <TextField label="검사분류코드" size="small" id="outlined-size-normal" placeholder="검사분류코드" />
                                    </Grid>
                                    <Grid item xs={3} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                                        <TextField label="검사코드" size="small" id="outlined-size-normal" placeholder="검사코드" />
                                        <TextField label="검사명" size="small" id="outlined-size-normal" placeholder="검사명" />
                                    </Grid>
                                </Grid>
                            </DialogContentText>
                        </DialogContent>

                    </Grid>
                </Box>

                <DialogTitle id="alert-dialog-title">
                    {"결과 입력"}
                </DialogTitle>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">

                                <Grid item xs={12} sx={{ display: 'flex', mx: 2, py: 2 }}>
                                    <Grid item xs={3} sx={{ display: 'flex', mx: 2 }}>
                                        <TextField multiline rows={6} label="결과 값" size="small" id="outlined-size-normal" placeholder="내용을 입력해주세요" />
                                    </Grid>
                                    <Grid item xs={3} sx={{ display: 'flex' }}>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Select"
                                            defaultValue="oz"
                                            helperText="Please select your unit"
                                            size="small"
                                        >
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6} sx={{ display: 'flex', mx: 2 }}>
                                        <TextField multiline rows={6} fullWidth sx={{ m: 1 }} label="참고치" size="small" id="outlined-size-normal" placeholder="내용을 입력해주세요" />
                                    </Grid>
                                </Grid>

                            </DialogContentText>
                        </DialogContent>

                    </Grid>
                </Box>

                <DialogActions>
                    <Button variant="contained" color="success" onClick={handleClose} sx={{ width: 400 }}>결과등록</Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}