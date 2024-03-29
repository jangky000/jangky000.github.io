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
`;
