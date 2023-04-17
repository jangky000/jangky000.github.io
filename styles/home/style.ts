import styled from '@emotion/styled';
import DIMENS from '@styles/dimens';

export const StyledHomeLayout = styled.main`
  label: home-layout;

  margin: 30px auto;
  width: ${DIMENS.CONTENT_WIDTH};
  max-width: ${DIMENS.CONTENT_MAX_WIDTH};

  .introduce {
    padding: 0.5rem;
    margin-bottom: 20px;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
    .MuiTabPanel-root {
      padding: 0 0.5rem;
    }
  }
`;
