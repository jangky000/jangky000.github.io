import styled from '@emotion/styled';

export const Styled404Layout = styled.div`
  label: 404-layout;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dark};

  h1,
  h2 {
    text-align: center;
    text-transform: uppercase;
    font-weight: 400;
  }

  h1 {
    font-size: 4.2rem;
  }

  h2 {
    font-size: 1.8rem;
  }
`;
