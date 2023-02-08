import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import ProgressChart from '../components/testResultInput/ProgressChart';
import InputDialog from '../components/testResultInput/InputDialog';
import ResultList from '../components/testResultInput/ResultList'; 

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
                <Grid item xs={10} key={index}>

                    <ThemeProvider theme={theme}>

                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.default',
                                display: 'grid',
                                gridTemplateColumns: { md: '1fr' }, // 한줄에 몇개
                                gap: 2 // 박스간의 간격
                            }}
                        >
                            <Item key={0} elevation={6}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid item xs={12} sx={{ display: 'flex', mx: 2, gap: 2 }}>
                                        <Grid xs={2} sx={{ display: 'flex', ml: 6, my: 4 }}>
                                            <Typography>바코드 수기 입력</Typography>
                                        </Grid>
                                        <Grid xs={8} sx={{ display: 'flex', mx: 2, my: 3 }}>
                                            <TextField
                                                sx={{
                                                    width: 600,
                                                    maxWidth: '80%',
                                                }}
                                                id="outlined-size-small"
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid xs={2} sx={{ display: 'flex', mx: 2, my: 1.5 }}>
                                            <InputDialog></InputDialog>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Item>
                        </Box>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.default',
                                display: 'grid',
                                gridTemplateColumns: { md: '5fr 2fr' }, // 한줄에 몇개 그리고 화면 비율
                                gap: 2 // 박스간의 간격
                            }}
                        >
                            <Item key={1} elevation={6}>
                                <ResultList></ResultList>
                            </Item>
                            <Item key={2} elevation={6}>
                                <ProgressChart></ProgressChart>
                            </Item>
                        </Box>
                    </ThemeProvider>
                </Grid>
            ))}
        </Grid>
    );
}