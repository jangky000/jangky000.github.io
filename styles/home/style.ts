import styled from '@emotion/styled';

export const StyledHomeLayout = styled.main`
  label: home-layout;

  margin: 30px auto;
  width: 80%;
  max-width: 850px;

  .introduce {
    padding: 0.5rem;
    margin-bottom: 20px;
  }

  .postlist {
    .tab {
      color: #fff;
      background-color: ${({ theme }) => theme.colors.dark};
      border-radius: 4px;
      margin-bottom: 20px;
      padding: 0.5rem;
      width: fit-content;
    }
  }
`;
