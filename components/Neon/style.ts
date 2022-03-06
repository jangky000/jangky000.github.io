import styled from '@emotion/styled';

export const StyledNeon = styled.div<{ neonColorCode: string }>`
  label: neon;

  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 15px ${({ neonColorCode }) => neonColorCode},
    0 0 30px ${({ neonColorCode }) => neonColorCode},
    0 0 45px ${({ neonColorCode }) => neonColorCode};
`;
