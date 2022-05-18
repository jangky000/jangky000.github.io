import styled from '@emotion/styled';

export const StyledLottie = styled.div<{ width: string; height: string }>`
  label: styled-lottie;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
