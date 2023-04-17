import { useCallback, useState } from 'react';

interface UseToggle {
  isOn: boolean;
  on: () => void;
  off: () => void;
  toggle: () => void;
}

export default function useToggle(initialValue?: boolean): UseToggle {
  const [isOn, setOn] = useState(initialValue ?? false);
  const on = useCallback((): void => setOn(true), []);
  const off = useCallback((): void => setOn(false), []);
  const toggle = useCallback((): void => setOn(prev => !prev), []);
  return {
    isOn,
    on,
    off,
    toggle,
  };
}
