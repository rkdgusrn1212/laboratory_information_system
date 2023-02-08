import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function PatientInformation() {
  return (
    <React.Fragment>
      <Title>환자정보</Title>
      <Typography component="p" variant="h4">
        김동신
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        2022/03/09 ~ 2022/03/13
      </Typography>
     
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          자세히
        </Link>
      </div>
    </React.Fragment>
  );
}