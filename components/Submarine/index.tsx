import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactElement } from 'react';

const shineMove = keyframes({
  '100%': {
    transform: 'rotate(135deg) translate(-30px)',
  },
});

const spin = keyframes({
  '100%': {
    transform: 'rotateX(180deg)',
  },
});

const bubbleMove1 = keyframes({
  '100%': {
    transform: 'translate(50px, -20px)',
    opacity: 0,
  },
});
const bubbleMove2 = keyframes({
  '100%': {
    transform: 'translate(30px, -20px)',
    opacity: 0,
  },
});
const bubbleMove3 = keyframes({
  '100%': {
    transform: 'translate(50px)',
    opacity: 0,
  },
});

const waveMove = keyframes({
  '100%': {
    right: '-100%',
  },
});

const StyledLayout = styled.div({
  '*': { boxSizing: 'content-box' },
  position: 'relative',
  width: '100%',
  flex: 1,
  margin: 0,
  padding: 0,
  backgroundColor: '#000065',
  overflow: 'hidden',

  '.submarine': {
    zIndex: 1,
    backgroundColor: '#dd0e49',
    height: '80px',
    width: '200px',
    borderRadius: '80px',
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    ':before': {
      content: '""',
      position: 'absolute',
      height: '5px',
      width: '80px',
      backgroundColor: '#ee689e',
      borderRadius: '5px',
      top: '7px',
      left: '28px',
    },
    ':after': {
      content: '""',
      position: 'absolute',
      height: '15px',
      width: '15px',
      border: '5px solid transparent',
      borderRight: '5px solid #ee689e',
      borderRadius: '50%',
      transform: 'rotate(45deg)',
      bottom: '10px',
      right: '14px',
    },
  },
  '.top': {
    height: 0,
    width: '65px',
    borderBottom: '25px solid #dd0e49',
    borderRight: '18px solid transparent',
    position: 'relative',
    bottom: '25px',
    left: '50px',
    ':before': {
      content: '""',
      position: 'absolute',
      height: 0,
      width: '81px',
      borderBottom: '3px solid #a30036',
      borderRight: '2px solid transparent',
      top: '22px',
    },
    ':after': {
      position: 'absolute',
      content: '""',
      height: '3px',
      width: '30px',
      backgroundColor: '#ee689e',
      borderRadius: '30px',
      right: '5px',
      top: '5px',
    },
  },
  '.pipe': {
    height: '17px',
    width: '10px',
    borderRight: '5px solid #dd0e49',
    borderTop: '5px solid #dd0e49',
    borderRadius: '0 5px 0 0',
    position: 'relative',
    bottom: '22px',
    left: '4px',
    ':before': {
      position: 'absolute',
      content: '""',
      height: '2px',
      width: '5px',
      backgroundColor: '#a30036',
      top: '15px',
      left: '10px',
    },
    ':after': {
      position: 'absolute',
      content: '""',
      height: '8px',
      width: '4px',
      backgroundColor: '#f8d02e',
      bottom: '16px',
    },
  },
  '.light': {
    height: '5px',
    width: 0,
    borderLeft: '115px solid #ffffff',
    borderTop: '22px solid transparent',
    borderBottom: '22px solid transparent',
    position: 'relative',
    right: '115px',
    bottom: '28px',
    opacity: 0.15,
  },
  '.window': {
    height: '20px',
    width: '20px',
    backgroundColor: '#2adab7',
    border: '4px solid #a30036',
    borderRadius: '50%',
    position: 'absolute',
    overflow: 'hidden',
  },
  '.window-1': {
    left: '20px',
  },
  '.window-2': {
    left: '65px',
  },
  '.shine': {
    height: '35px',
    width: '4px',
    backgroundColor: '#fff',
    transform: 'rotate(135deg)',
    position: 'relative',
    top: '2px',
    animation: `${shineMove} 2s infinite`,
  },
  '.shadow': {
    height: '7px',
    width: '60px',
    backgroundColor: '#a30036',
    borderRadius: '60px',
    position: 'relative',
    top: '9px',
    left: '100px',
  },
  '.propeller': {
    perspective: '1200px',
  },
  '.back': {
    height: '20px',
    width: '5px',
    backgroundColor: '#a30036',
    position: 'relative',
    left: '198px',
  },
  '.wing': {
    backgroundColor: '#f8d02e',
    height: '30px',
    width: '17px',
    transformStyle: 'preserve-3d',
    position: 'relative',
    bottom: '25px',
    left: '202px',
    animation: `${spin} 0.5s infinite linear`,
  },
  '.bubble': {
    backgroundColor: '#ffffff',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    position: 'absolute',
    left: '200px',
    bottom: '35px',
    opacity: '0.4',
  },
  '.bubble-1': {
    animation: `${bubbleMove1} 3s 2s infinite`,
  },
  '.bubble-2': {
    animation: `${bubbleMove2} 3s 0.5s infinite`,
  },
  '.bubble-3': {
    animation: `${bubbleMove3} 4s 1s infinite`,
  },
  '.wave': {
    height: '100px',
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  '.wave1, .wave2': {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '5000px',
    height: '100px',
    backgroundSize: '100px 180px',
    animation: `${waveMove} 20s linear infinite`,
  },
  '.wave1': {
    backgroundImage: `radial-gradient(
      circle at 50px 120px,
      rgba(0, 0, 0, 0.2) 60px,
      #000065 60px
    ) `,
  },
  '.wave2': {
    backgroundImage: `radial-gradient(
      circle at 50px 85px,
      rgba(0, 0, 0, 0.2) 60px,
      #000065 60px
    )`,
    backgroundPosition: '55px 0',
  },
});

function Submarine(): ReactElement {
  return (
    <StyledLayout>
      <div className="submarine">
        <div className="top">
          <div className="pipe">
            <div className="light" />
          </div>
        </div>
        <div className="window window-1">
          <div className="shine" />
        </div>
        <div className="window window-2">
          <div className="shine" />
        </div>
        <div className="shadow" />
        <div className="propeller">
          <div className="back" />
          <div className="wing" />
          <div className="bubble bubble-1" />
          <div className="bubble bubble-2" />
          <div className="bubble bubble-3" />
        </div>
      </div>
      <div className="wave">
        <div className="wave1" />
        <div className="wave2" />
      </div>
    </StyledLayout>
  );
}

export default Submarine;
