import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import List from './list';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'flex',
    lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Elevation() {
    return (
        <Grid container spacing={2}>
            {[lightTheme].map((theme, index) => (
                <Grid key={index} item xs={4} >
                    <ThemeProvider theme={theme}>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.default',
                                display: 'grid',
                                gridTemplateColumns: { md: '1fr' },
                                gridTemplateRows: { md: '1fr 4fr' }, // 한줄에 몇개
                                gap: 2 // 박스간의 간격
                            }}
                        >
                            <Item key={0} elevation={6}>

                                <Typography align='left' sx={{ mx: 2, my: 1 }} >바코드 수기 입력</Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { md: '9fr 1fr' }
                                }}>
                                    <Grid >
                                        <TextField
                                            sx={{
                                                minWidth: '80%',
                                                maxWidth: '100%',
                                            }}
                                            id="outlined-size-small"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid>
                                        <Button variant="contained" color="success" sx={{ display: 'center', mr: 1 }}>
                                            입력
                                        </Button>
                                    </Grid>
                                </Box>
                            </Item>
                            <Item key={1} elevation={6}>
                                <Typography align='left' sx={{ mx: 2, my: 1, mt: 2 }} >검체 정보</Typography>
                                <Box sx={{ flexGrow: 1, mb: 3 }}>
                                    <Grid item xs={12} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                                        <TextField label="검체번호" size="small" id="outlined-size-normal" placeholder="검체번호" disabled />
                                        <TextField label="검체명" size="small" id="outlined-size-normal" placeholder="검체명" disabled />
                                        <TextField label="검체량" size="small" id="outlined-size-normal" placeholder="검체량" disabled />
                                        <TextField label="용기명" size="small" id="outlined-size-normal" placeholder="용기명" disabled />
                                    </Grid>
                                </Box>

                                <Typography align='left' sx={{ mx: 2, my: 1 }} >환자 정보</Typography>
                                <Box sx={{ flexGrow: 1, mb: 3 }}>
                                    <Grid item xs={12} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                                        <TextField label="환자번호" size="small" id="outlined-size-normal" placeholder="환자번호" disabled />
                                        <TextField label="환자이름" size="small" id="outlined-size-normal" placeholder="환자이름" disabled />
                                        <TextField label="환자성별" size="small" id="outlined-size-normal" placeholder="환자성별" disabled />
                                        <TextField label="주민번호" size="small" id="outlined-size-normal" placeholder="주민번호" disabled />
                                    </Grid>
                                </Box>

                                <Typography align='left' sx={{ mx: 2, my: 1 }} >검사 정보</Typography>
                                <Box sx={{ flexGrow: 1, mb: 3 }}>
                                    <Grid item xs={12} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                                        <TextField label="검사항목코드" size="small" id="outlined-size-normal" placeholder="검사항목코드" disabled />
                                        <TextField label="검사명" size="small" id="outlined-size-normal" placeholder="검사명" disabled />
                                        <TextField label="검사자" size="small" id="outlined-size-normal" placeholder="검사자" />
                                        <TextField label="검사접수일자" size="small" id="outlined-size-normal" placeholder="검사접수일자" disabled />
                                    </Grid>
                                </Box>

                                <Typography align='left' sx={{ mx: 2, my: 1 }} >채혈/진료 정보</Typography>
                                <Box sx={{ flexGrow: 1, mb: 3 }}>
                                    <Grid item xs={12} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                                        <TextField label="채혈자" size="small" id="outlined-size-normal" placeholder="채혈자" disabled />
                                        <TextField label="채혈일자" size="small" id="outlined-size-normal" placeholder="채혈일자" disabled />
                                        <TextField label="진료의" size="small" id="outlined-size-normal" placeholder="진료의" disabled />
                                        <TextField label="진료일자" size="small" id="outlined-size-normal" placeholder="진료일자" disabled />
                                    </Grid>
                                </Box>
                            </Item>
                        </Box>
                    </ThemeProvider>
                </Grid>
            ))
            }

            {
                [lightTheme].map((theme, index) => (
                    <Grid key={index} item xs={6} >
                        <ThemeProvider theme={theme}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: 'background.default',
                                    display: 'grid',
                                    gridTemplateColumns: { md: '1fr' },
                                }}
                            >
                                <Item key={0} elevation={6}>
                                    <Typography align='left' sx={{ mx: 2, my: 1 }} >접수 목록</Typography>

                                    <Box sx={{ flexGrow: 1, mt:3 }}>
                                        <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                                            <List></List>
                                        </Grid>
                                    </Box>


                                </Item>
                            </Box>
                        </ThemeProvider>
                    </Grid>
                ))
            }
        </Grid >
    );
}