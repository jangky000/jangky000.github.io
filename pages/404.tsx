import Neon from '@components/Neon';
import { Styled404Layout } from '@styles/404/style';
import { ReactElement } from 'react';
import { animated, useSpring } from 'react-spring';

export default function Custom404(): ReactElement {
  const fadeInStyle = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={fadeInStyle}>
      <Styled404Layout>
        <h1>
          <Neon>404</Neon>
        </h1>
        <h2>
          <Neon>Page Not Found</Neon>
        </h2>
      </Styled404Layout>
    </animated.div>
  );
}
