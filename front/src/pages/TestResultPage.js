import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import ResultSearchList from '../components/testresult/ResultSearchList';
import {
  ResultSearchName,
  ResultSearchDate,
} from '../components/testresult/ResultSearch';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 'flex',
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function TestResultPage() {
  return (
    <Grid container spacing={2}>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={12} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 6,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr' }, // 한줄에 몇개
                gap: 2, // 박스간의 간격
              }}
            >
              <Item key={0} elevation={6}>
                <Grid container spacing={3}>
                  <Grid item xs={1} sx={{ ml: 2 }}>
                    <h4>환자 이름</h4>
                  </Grid>
                  <Grid item xs={3}>
                    <ResultSearchName></ResultSearchName>
                  </Grid>
                  <Grid item xs={1} sx={{ ml: 2 }}>
                    <h4>접수 기간</h4>
                  </Grid>
                  <Grid item xs={5}>
                    <ResultSearchDate></ResultSearchDate>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      mx: 2,
                      mt: 2,
                    }}
                  >
                    <Button variant="contained" color="success">
                      검색
                    </Button>
                  </Grid>
                </Grid>
              </Item>
              <Item key={1} elevation={6}>
                <ResultSearchList></ResultSearchList>
              </Item>
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
