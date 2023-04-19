import { Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import useCustomTheme from 'hooks/useCustomTheme';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function ThemeProvider(props: Props) {
  const { children } = props;
  const { muiTheme, emotionTheme } = useCustomTheme();

  return (
    <>
      <MuiThemeProvider theme={muiTheme}>
        <EmotionThemeProvider theme={emotionTheme}>
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
      <Global
        styles={{
          body: {
            color: emotionTheme.colors.text,
            backgroundColor: emotionTheme.colors.backgroundColor,
          },
        }}
      />
    </>
  );
}

export default ThemeProvider;
