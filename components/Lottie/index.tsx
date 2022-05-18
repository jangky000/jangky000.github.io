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
    if (containerRef.current !== null) {
      lottie.loadAnimation({
        container: containerRef.current as HTMLDivElement,
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: { preserveAspectRatio: 'none' },
      });
      lottie.setSpeed(0.2);
    }
    return () => lottie.destroy();
  }, [containerRef]);
  return <StyledLottie ref={containerRef} width={width} height={height} />;
};

export default Lottie;
