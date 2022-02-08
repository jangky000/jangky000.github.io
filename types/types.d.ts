import { Palette } from '../theme/Theme';

declare module '@emotion/react' {
  export interface Theme extends Palette {}
}
