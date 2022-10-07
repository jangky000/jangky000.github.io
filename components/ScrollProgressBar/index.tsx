import { optimizeScroll } from '@libs/optimizeEvent';
import { useEffect, useState } from 'react';
import { StyledScrollProgressBar } from './style';

function ScrollProgressBar() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const { scrollHeight } = document.body;
      const { outerHeight } = window;

      setPercent(Math.ceil((scrollTop / (scrollHeight - outerHeight)) * 100));
    };
    const optimizedScroll = optimizeScroll(onScroll);
    window.addEventListener('scroll', optimizedScroll, false);
    return () => window.removeEventListener('scroll', optimizedScroll);
  }, []);

  return (
    <StyledScrollProgressBar>
      <div className="bar" style={{ width: `${100 - percent}%` }} />
    </StyledScrollProgressBar>
  );
}

export default ScrollProgressBar;
