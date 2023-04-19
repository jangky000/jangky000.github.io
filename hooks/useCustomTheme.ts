import { emotionDarkTheme, emotionLightTheme } from '@theme/emotionTheme';
import { muiDarkTheme, muiLightTheme } from '@theme/muiTheme';
import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeState } from 'stores/theme';

function getNextTheme(currentTheme: 'lightTheme' | 'darkTheme') {
  return currentTheme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
}

function useCustomTheme() {
  const currentTheme = useRecoilValue(themeState);

  const [muiTheme, emotionTheme] = useMemo(() => {
    if (currentTheme === 'lightTheme') {
      return [muiLightTheme, emotionLightTheme];
    }
    return [muiDarkTheme, emotionDarkTheme];
  }, [currentTheme]);

  return { muiTheme, emotionTheme };
}

export function useCustomThemeController() {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);

  const toggleTheme = useCallback(() => {
    const nextTheme = getNextTheme(currentTheme);
    setCurrentTheme(nextTheme);
  }, [currentTheme]);

  return { currentTheme, toggleTheme };
}

export default useCustomTheme;
