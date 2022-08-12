import styled from '@emotion/styled';
import DIMENS from '@styles/dimens';

export const StyledGalleryListLayout = styled.div`
  label: gallery-list-layout;

  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;

  .gallery-list-content {
    flex: 1;
    margin: 30px auto;
    max-width: ${DIMENS.CONTENT_MAX_WIDTH};
    width: ${DIMENS.CONTENT_WIDTH};
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
