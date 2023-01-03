import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type PatientCardProps = {
  name: string;
  age: number;
  rrn: string;
};

const PatientCard: React.FC<PatientCardProps> = ({ name, age, rrn }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${name} (${age}세)`}
        subheader={rrn}
      />
    </Card>
  );
};
export default PatientCard;
