import Grid from '@mui/material/Grid';
import PatientCard from '../components/visit/PatientCard';

const VisitPage: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <PatientCard name="김더존" age={24} rrn="111111-1111111" />
      </Grid>
      <Grid item xs={8}></Grid>
    </Grid>
  );
};
export default VisitPage;
