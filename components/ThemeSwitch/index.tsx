import { Switch } from '@mui/material';
import { useCustomThemeController } from 'hooks/useCustomTheme';

interface Props {
  className?: string;
}

function ThemeSwitch(props: Props) {
  const { currentTheme, toggleTheme } = useCustomThemeController();

  return (
    <Switch
      {...props}
      checked={currentTheme !== 'lightTheme'}
      onClick={toggleTheme}
    />
  );
}

export default ThemeSwitch;
