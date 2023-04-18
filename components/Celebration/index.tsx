import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import CelebrationSvg from 'public/svg/celebration.svg';
import { ReactElement, useRef } from 'react';
import { useCountUp } from 'react-countup';

const showUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(100px)',
  },
  '30%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const StyledWrapper = styled('div')({
  position: 'relative',
});

const StyledTextPosition = styled('div')({
  position: 'absolute',
  bottom: '30%',
  left: '50%',
  transform: 'translate(-50%, 0)',
});

const StyledText = styled('div')<{ scale: number }>(({ scale }) => ({
  fontSize: `${scale}em`,
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: 'orange',
  lineHeight: 1,
  padding: '4px',
  whiteSpace: 'nowrap',
  animation: `${showUp} 1s`,
  animationDelay: '1s',
}));

interface Props {
  count: number;
  scale?: number;
}

function Celebration(props: Props): ReactElement {
  const { count, scale = 2 } = props;
  const width = 123 * scale;
  const height = 94.09 * scale;
  const ref = useRef<HTMLDivElement>(null);
  useCountUp({
    ref,
    end: count,
    duration: 1,
    prefix: '오늘만 ',
    suffix: '번째 방문',
    delay: 2,
  });

  return (
    <StyledWrapper>
      <StyledTextPosition>
        <StyledText scale={scale}>
          <div ref={ref} />
        </StyledText>
      </StyledTextPosition>
      <CelebrationSvg width={width} height={height} />
    </StyledWrapper>
  );
}

export default Celebration;
