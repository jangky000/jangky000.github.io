import styled from '@emotion/styled';

export const StyledPostLayout = styled.main`
  label: post-layout;

  margin: 30px auto;
  max-width: 850px;
  width: 80%;

  img {
    max-width: 100%;
  }

  .post-desc {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.green};
    padding: 20px;
    margin: 20px auto;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.1rem;
  }
`;
