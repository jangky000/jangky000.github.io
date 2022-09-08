import styled from '@emotion/styled';
import DIMENS from '@styles/dimens';

export const StyledGalleryDetailLayout = styled.div`
  label: gallery-detail-layout;

  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;

  .gallery-content {
    flex: 1;
    margin: 20px auto;
    max-width: ${DIMENS.CONTENT_MAX_WIDTH};
    width: ${DIMENS.CONTENT_WIDTH};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .gallery-reference {
    margin: 0 auto;
    max-width: ${DIMENS.CONTENT_MAX_WIDTH};
    width: ${DIMENS.CONTENT_WIDTH};
    display: flex;
    gap: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
