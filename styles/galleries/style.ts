import styled from '@emotion/styled';
import DIMENS from '@styles/dimens';

export const StyledGalleryListLayout = styled.div`
  label: gallery-list-layout;

  margin: 30px auto;
  max-width: ${DIMENS.CONTENT_MAX_WIDTH};
  width: ${DIMENS.CONTENT_WIDTH};

  .card {
    border: 1px solid #ddd;

    .thumbnail {
      aspect-ratio: 1 / 1;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    .title {
      padding: 16px;
    }
  }
`;
