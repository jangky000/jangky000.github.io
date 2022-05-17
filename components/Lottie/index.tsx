import { ReactElement, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { StyledLottie } from './style';

interface LottieProps {
  animationData: unknown;
}

const Lottie = ({ animationData }: LottieProps): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: containerRef.current as HTMLDivElement,
      loop: true,
      autoplay: true,
      animationData,
    });
  }, [containerRef]);
  return <StyledLottie ref={containerRef} />;
};

export default Lottie;
