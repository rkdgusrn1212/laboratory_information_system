import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSigninMutation } from '../../services/authApi';
import { selectPrincipal } from '../../services/authSlice';

type PatientCardProps = {
  name: string;
  age: number;
  rrn: string;
};

const PatientCard: React.FC<PatientCardProps> = ({ name, age, rrn }) => {
  const [signin] = useSigninMutation();
  const principal = useSelector(selectPrincipal);

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
        title="토큰 발급"
        subheader={rrn}
      />
      <CardContent>
        <p>{JSON.stringify(principal)}</p>
        <Button
          onClick={() => {
            signin({
              id: 'abcde',
              password: 'abcde12345!@#',
            }).unwrap();
          }}
        >
          send
        </Button>
      </CardContent>
    </Card>
  );
};
export default PatientCard;
