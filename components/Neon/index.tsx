import { useCallback, useMemo, ReactNode, memo } from 'react';
import { useTheme } from '@emotion/react';
import { StyledNeon } from './style';

type Colors = 'red' | 'blue' | 'yellow' | 'green' | 'orange' | 'violet';

interface NeonProps {
  color?: Colors;
  children: ReactNode;
}
function Neon({ color = 'red', children }: NeonProps) {
  const theme = useTheme();

  const neonColorCode = useMemo(() => {
    switch (color) {
      default:
      case 'red':
        return theme.colors.neonRed;
      case 'blue':
        return theme.colors.neonBlue;
      case 'yellow':
        return theme.colors.neonYellow;
      case 'green':
        return theme.colors.neonGreen;
      case 'orange':
        return theme.colors.neonOrange;
      case 'violet':
        return theme.colors.neonViolet;
    }
  }, []);

  return <StyledNeon neonColorCode={neonColorCode}>{children}</StyledNeon>;
}

export default memo(Neon);
