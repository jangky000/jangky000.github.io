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

  .post-contents {
    a {
      color: ${({ theme }) => theme.colors.dark};
      text-decoration: underline;
      &:hover {
        color: #000;
        cursor: pointer;
      }
    }

    code {
      background: rgba(135, 131, 120, 0.15);
      color: #eb5757;
      border-radius: 3px;
      font-size: 85%;
      padding: 0.2em 0.4em;
    }
  }
`;
