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

  .postlist .tab {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.dark};
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 0.5rem;
    width: fit-content;
  }

  .post-card {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    h2 {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    small {
      align-self: flex-end;
      margin-left: 0.5rem;
    }

    .desc {
      color: #777;
    }
  }
`;
