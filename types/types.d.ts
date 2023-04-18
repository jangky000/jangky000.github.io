import { CustomPalette } from '@theme/emotionTheme';

declare module '@emotion/react' {
  interface Theme extends CustomPalette {}
}

// https://mui.com/material-ui/customization/palette/#adding-new-colors
declare module '@mui/material/styles' {
  interface Theme {
    colors: CustomPalette['colors'];
  }

  interface ThemeOptions {
    colors: CustomPalette['colors'];
  }
}
