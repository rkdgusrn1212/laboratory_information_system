import Box from '@mui/material/Box';
import { Avatar, Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

const MemberTypeForm = () => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ display: 'block', p: 1 }}
          >
            <Avatar
              src="/images/doctor_icon.png"
              sx={{
                margin: 'auto',
                p: 1,
                bgcolor: 'yellow',
                width: 56,
                height: 56,
              }}
            />
            의사
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            color="secondary"
            variant="outlined"
            fullWidth
            sx={{ display: 'block', p: 1 }}
          >
            <Avatar
              src="/images/nurse_icon.png"
              sx={{
                margin: 'auto',
                p: 1,
                bgcolor: 'skyblue',
                width: 56,
                height: 56,
              }}
            />
            간호사
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MemberTypeForm;
