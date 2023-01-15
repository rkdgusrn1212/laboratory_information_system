import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export interface LogoProps {
  darkMode?: boolean;
  size: number;
  sx?: SxProps<Theme>;
}

const Logo: React.FC<LogoProps> = ({ darkMode, size, sx }) => (
  <Box sx={sx}>
    <Typography
      color={darkMode ? 'light' : 'dark'}
      fontFamily="fantasy"
      textAlign="center"
      fontSize={size}
    >
      <i>KHS</i>
    </Typography>
    <Typography
      color={darkMode ? 'light' : 'dark'}
      mb={3}
      fontFamily="fantasy"
      textAlign="center"
      fontSize={size * 0.618}
    >
      Laboratory Information System
    </Typography>
  </Box>
);
export default Logo;
