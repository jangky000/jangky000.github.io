import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { emotionDarkTheme, emotionLightTheme } from './emotionTheme';

export const muiLightTheme = createTheme({
  colors: emotionLightTheme.colors,
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
    text: { primary: emotionLightTheme.colors.text },
    background: { default: emotionLightTheme.colors.backgroundColor },
  },
});

export const muiDarkTheme = createTheme({
  colors: emotionDarkTheme.colors,
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
    text: { primary: emotionDarkTheme.colors.text },
    background: { default: emotionDarkTheme.colors.backgroundColor },
  },
});
