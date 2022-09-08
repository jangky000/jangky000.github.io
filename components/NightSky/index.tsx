import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactElement } from 'react';

const spin = keyframes({
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const StyledLayout = styled.div({
  '.container': {
    backgroundColor: '#113755',
    height: '21.87em',
    width: '21.87em',
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  '.mountains': {
    height: '12.5em',
    width: '7.5em',
    backgroundColor: '#144569',
    position: 'absolute',
    left: '1.9em',
    bottom: '-0.62em',
    transform: 'rotate(-50deg)',
    ':before': {
      content: '""',
      position: 'absolute',
      height: '5em',
      width: '8.75em',
      backgroundColor: '#144569',
      left: '3.12em',
      bottom: '1.25em',
      transform: 'rotate(-90deg)',
    },
    ':after': {
      content: '""',
      position: 'absolute',
      height: '6.25em',
      width: '11em',
      backgroundColor: '#144569',
      left: '4.4em',
      bottom: '-6.7em',
      transform: 'rotate(20deg)',
    },
  },
  '.land': {
    height: '5em',
    width: '28.12em',
    backgroundColor: '#041524',
    position: 'absolute',
    bottom: '-0.31em',
    transform: 'rotate(5em)',
  },
  '.moon': {
    height: '2.2em',
    width: '2.2em',
    backgroundColor: '#fff',
    position: 'absolute',
    left: '5.62em',
    top: '4.4em',
    borderRadius: '50%',
    boxShadow: `
    0 0 0 0.62em rgba(32,105, 149, 0.6),
    0 0 0 1.25em rgba(32,105, 149, 0.5),
    0 0 0 1.9em rgba(32,105, 149, 0.4)
    `,
    ':before': {
      content: '""',
      position: 'absolute',
      backgroundColor: '#ebefe7',
      height: '0.62em',
      width: '0.62em',
      borderRadius: '50%',
      top: '0.5em',
      left: '0.3em',
    },
    ':after': {
      content: '""',
      position: 'absolute',
      backgroundColor: '#ebefe7',
      height: '0.43em',
      width: '0.43em',
      borderRadius: '50%',
      top: '1.25em',
      left: '0.75em',
    },
  },
  '.windmill': {
    boxSizing: 'content-box',
    height: '0',
    width: '1.25em',
    borderBottom: '2.37em solid #041524',
    borderLeft: '0.15em solid transparent',
    borderRight: '0.15em solid transparent',
    position: 'absolute',
    right: '12.5em',
    bottom: '4.87em',
    ':after': {
      content: '""',
      position: 'absolute',
      backgroundColor: '#041524',
      height: '0.62em',
      width: '1.25em',
      bottom: '-0.06em',
      borderRadius: '1.25em 1.25em 0 0',
    },
    ':before': {
      content: '""',
      position: 'absolute',
      width: '1.5em',
      height: '0',
      borderBottom: '0.37em solid #0b2231',
      borderLeft: '0.06em solid transparent',
      borderRight: '0.06em solid transparent',
      right: '-0.2em',
      top: '0.06em',
    },
  },
  '.light': {
    height: '0.25em',
    width: '0.25em',
    backgroundColor: '#8daf76',
    position: 'absolute',
    top: '0.75em',
    left: '0.5em',
    borderRadius: '50%',
    boxShadow: `
    0 0 0.06em 0.12em rgba(141, 175, 118, 0.3),
    0 0 0.06em 0.25em rgba(141, 175, 118, 0.2)
    `,
    ':before': {
      content: '""',
      position: 'absolute',
      backgroundColor: '#0f304f',
      height: '0.5em',
      width: '0.5em',
      bottom: '-1.25em',
      left: '-0.12em',
      borderRadius: '0.25em 0.25em 0 0 ',
    },
  },
  '.blades': {
    height: '3.75em',
    width: '3.75em',
    position: 'absolute',
    bottom: '-1.9em',
    left: '-1.25em',
    animation: `${spin} 5s infinite linear`,
    ':before': {
      position: 'absolute',
      content: '""',
      height: '100%',
      width: '0.5em',
      backgroundColor: '#041524',
      left: '1.62em',
    },
    ':after': {
      position: 'absolute',
      content: '""',
      height: '100%',
      width: '0.5em',
      backgroundColor: '#041524',
      left: '1.62em',
      transform: 'rotate(90deg)',
    },
  },
  '.star, .star:before, .star:after': {
    height: '0.18em',
    width: '0.18em',
    backgroundColor: '#fff',
    position: 'absolute',
    borderRadius: '50%',
  },
  '.star-1': {
    top: '5em',
    left: '19.75em',
    ':before': {
      content: '""',
      top: '1.9em',
      left: '-16.4em',
    },
    ':after': {
      content: '""',
      left: '-12.8em',
      top: '5em',
    },
  },
  '.star-2': {
    top: '3.12em',
    left: '11.25em',
    ':before': {
      content: '""',
      top: '8.75em',
      left: '2.5em',
    },
    ':after': {
      content: '""',
      left: '7.8em',
      top: '6em',
    },
  },
  '.star-3': {
    top: '2em',
    left: '15em',
    ':before': {
      content: '""',
      top: '5em',
      left: '-1em',
    },
    ':after': {
      content: '""',
      left: '7.8em',
      top: '6em',
    },
  },
});

function NightSky(): ReactElement {
  return (
    <StyledLayout>
      <div className="container">
        <div className="star star-1" />
        <div className="star star-2" />
        <div className="star star-3" />
        <div className="moon" />
        <div className="mountains" />
        <div className="land">
          <div className="windmill">
            <div className="light" />
            <div className="blades" />
          </div>
        </div>
      </div>
    </StyledLayout>
  );
}

export default NightSky;
