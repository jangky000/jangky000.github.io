import styled from '@emotion/styled';

export const StyledScrollProgressBar = styled.div`
  label: scroll-progress-bar;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(
    110deg,
    red,
    orange,
    yellow,
    green,
    indigo,
    purple,
    black
  );
  opacity: 0.5;
  z-index: 10;

  .bar {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 3px;
    background: #fff;
  }
`;
