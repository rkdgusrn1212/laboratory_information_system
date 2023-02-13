import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Paper from '@mui/material/Paper';
import { Avatar, ListItemAvatar } from '@mui/material';
import { Doctor } from '../../services/types';

const RenderRow: React.FC<ListChildComponentProps<Doctor>> = ({
  index,
  style,
  data,
}) => {
  return (
    <ListItem style={style} component="div" key={index} disablePadding>
      <Paper sx={{ width: '100%', mr: 2 }} elevation={5}>
        <ListItemButton sx={{ height: 80 }}>
          <ListItemAvatar>
            <Avatar>의사</Avatar>
          </ListItemAvatar>
        </ListItemButton>
      </Paper>
    </ListItem>
  );
};

const StepSelectDoctor: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        maxWidth: 360,
      }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={100}
        itemCount={200}
        overscanCount={5}
      >
        {RenderRow}
      </FixedSizeList>
    </Box>
  );
};
export default StepSelectDoctor;
