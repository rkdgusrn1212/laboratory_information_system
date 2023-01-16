import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { indigo, pink } from '@mui/material/colors';

type PatientPickerListProps = {
  data: {
    no: string;
    name: string;
    rnn: string;
    birth: Date;
    male: boolean;
    image: string | null;
  }[];
};

/**주민번호로 나이와 성별을 가져오지 않는 이유 :
 *  19,20,21세기, 성별을 구분하기 위해 사용하는 뒷 첫자리 수는 외국인의 경우 다른 번호 체계를 사용하며
 * , 정책상 주민등록번호의 형식이 변경될 여지(미래의 주민번호를 형식을 바꾸고자 하는 사람들이 있다),
 *  그리고 생물학적 성별과 실제 생일이 다를 수 있다(법정 성별,
 * 생일을 따지자면 문제될건 없다). 하지만 법적으로 성별과 생일을 변경하게 되는 일도 빈번하므로 주민번호와 나이, 성별은 분리해서 보는게 맞다.
 * 가장 중요한 것은 주민번호는 법적으로 변경이 가능한 식별자로 그 설계 목적은 오로지 식별에 있다.*/
const PatientPickerList: React.FC<PatientPickerListProps> = ({ data }) => {
  return (
    <Stack gap={1}>
      {data.map((item) => {
        if (!item.image) {
          if (item.male) {
            item.image = '/image/male_icon.png';
          } else {
            item.image = '/image/female_icon.png';
          }
        }
        console.log(item.birth);
        const age =
          new Date(new Date().getTime() - item.birth.getTime()).getFullYear() -
          1970;
        return (
          <Card key={item.no} elevation={2}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: item.male ? indigo[300] : pink[300] }}
                  alt={item.name}
                  src={item.image}
                />
              }
              title={
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="body1">
                      <small>{item.no}</small>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1" fontWeight="bold">
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">
                      <small>만 {age}세</small>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">
                      <small>{item.male ? '남' : '여'}</small>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      <small>{item.rnn}</small>
                    </Typography>
                  </Grid>
                </Grid>
              }
            />
          </Card>
        );
      })}
    </Stack>
  );
};
export default PatientPickerList;
