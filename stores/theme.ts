import { atom } from 'recoil';

export const themeState = atom<'lightTheme' | 'darkTheme'>({
  key: 'themeState',
  default: 'lightTheme',
});
