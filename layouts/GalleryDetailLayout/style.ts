import styled from '@emotion/styled';
import DIMENS from '@styles/dimens';

export const StyledGalleryDetailLayout = styled.div`
  label: gallery-detail-layout;

  .gallery-content {
    margin: 0 auto;
    max-width: ${DIMENS.CONTENT_MAX_WIDTH};
    width: ${DIMENS.CONTENT_WIDTH};
    display: flex;
    justify-content: center;
  }
`;
