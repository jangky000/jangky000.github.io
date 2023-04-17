import Celebration from '@components/Celebration';
import { readVisitCount } from '@libs/experimentalVisit';
import { Fade, styled } from '@mui/material';
import useToggle from 'hooks/useToggle';
import { ReactElement, useEffect, useRef } from 'react';

const StyledBackDrop = styled('div')({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
});

interface Props {
  isOpen: boolean;
  closeAfterTime?: number;
}
function VisitCelebration(props: Props): ReactElement {
  const { isOpen, closeAfterTime = 5000 } = props;
  const { isOn, on, off } = useToggle();
  const timerAutoHide = useRef<number>();
  useEffect(() => {
    if (isOpen) {
      on();
      timerAutoHide.current = window.setTimeout(off, closeAfterTime);
    }
    return () => window.clearTimeout(timerAutoHide.current);
  }, [isOpen]);
  return (
    <Fade in={isOn} timeout={2000}>
      <StyledBackDrop onClick={off}>
        <Celebration count={readVisitCount() - 1} scale={2} />
      </StyledBackDrop>
    </Fade>
  );
}

export default VisitCelebration;
