import Typography from '@mui/material/Typography';
import * as React from 'react';
import Title from './Title';
import moment from 'moment';

export default function PatientInformation(props) {


  const name = props.c ;
  
  const startdate = moment(props.e).format('YYYY년MM월DD일') ;
  
  const enddate = moment(props.f).format('YYYY년MM월DD일') ;
  
  return (
    <React.Fragment>
      <Title>환자정보</Title>
      <Typography component="p" variant="h4">
        {name}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {startdate} ~ {enddate}
      </Typography>
    </React.Fragment>
  );
}