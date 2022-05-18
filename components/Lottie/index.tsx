import { ReactElement, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { StyledLottie } from './style';

interface LottieProps {
  animationData: unknown;
  width: string;
  height: string;
}

const Lottie = ({
  animationData,
  width,
  height,
}: LottieProps): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: containerRef.current as HTMLDivElement,
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: { preserveAspectRatio: 'none' },
    });
  }, [containerRef]);
  return <StyledLottie ref={containerRef} width={width} height={height} />;
};

export default Lottie;
