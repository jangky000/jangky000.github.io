import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { ReactElement } from 'react';
import CountUp from 'react-countup';

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
  scale?: number;
}

function Celebration(props: Props): ReactElement {
  const { scale = 2 } = props;
  const width = 123 * scale;
  const height = 94.09 * scale;

  return (
    <StyledWrapper>
      <StyledTextPosition>
        <CountUp start={0} end={5} duration={1} suffix="번째 방문" delay={2}>
          {({ countUpRef }) => (
            <StyledText scale={scale}>
              <span ref={countUpRef} />
            </StyledText>
          )}
        </CountUp>
      </StyledTextPosition>
      <Image
        src="/svg/celebration.svg"
        alt="celebration"
        width={width}
        height={height}
      />
    </StyledWrapper>
  );
}

export default Celebration;
