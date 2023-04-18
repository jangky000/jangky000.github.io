import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { emotionTheme } from './emotionTheme';

const muiTheme = createTheme({
  colors: emotionTheme.colors,
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default muiTheme;
