const CommonThemeColors = {
  black: '#333',
  dark: '#95998A',
  green: '#BDCC94',
  yellow: '#FFEC67',
  white: '#FFFFFF',
  blue: '#A9B6CC',
  neonRed: '#FF1177',
  neonBlue: '#228DFF',
  neonYellow: '#FFDD1B',
  neonGreen: '#B6FF00',
  neonOrange: '#FF9900',
  neonViolet: '#ff00de',
} as const;

const LightThemeColors = {
  ...CommonThemeColors,
  text: CommonThemeColors.black,
  backgroundColor: CommonThemeColors.white,
} as const;

const DarkThemeColors = {
  ...CommonThemeColors,
  text: CommonThemeColors.white,
  backgroundColor: CommonThemeColors.black,
} as const;

export interface CustomPalette {
  colors: typeof LightThemeColors | typeof DarkThemeColors;
}

// 참조: https://color.adobe.com/ko/explore
export const emotionLightTheme: CustomPalette = {
  colors: LightThemeColors,
};

export const emotionDarkTheme: CustomPalette = {
  colors: DarkThemeColors,
};

export const media = {
  widePc: 'only screen and (min-width : 1288px)',
  mobile: 'only screen and (max-width : 759px)',
  tablet: 'only screen  and (min-width : 760px) and (max-width : 1023px)',
  pc: 'only screen and (min-width : 1024px)',
  notMobile: 'only screen and (min-width : 760px)',
  notPC: 'only screen and (max-width : 1023px)',
  wideTablet: 'only screen  and (min-width : 1024px) and (max-width : 1200px)',
};
