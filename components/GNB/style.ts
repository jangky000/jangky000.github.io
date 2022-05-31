import styled from '@emotion/styled';

export const StyledGNB = styled.div`
  label: gnb;

  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  margin: 0 auto;
  width: 80%;
  max-width: 850px;

  a {
    font-size: 0.8rem;
    color: #333;

    :hover,
    :focus,
    :active {
      color: #777;
    }
  }
`;
