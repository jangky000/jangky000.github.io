import { Palette } from '@theme/emotionTheme';

declare module '@emotion/react' {
  export interface Theme extends Palette {}
}
