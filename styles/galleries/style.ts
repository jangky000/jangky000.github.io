import styled from '@emotion/styled';
import DIMENS from '@styles/dimens';

export const StyledGalleryListLayout = styled.div`
  label: gallery-list-layout;

  margin: 30px auto;
  max-width: ${DIMENS.CONTENT_MAX_WIDTH};
  width: ${DIMENS.CONTENT_WIDTH};

  .card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    :hover {
      img {
        transform: scale(1.02);
        filter: brightness(120%) saturate(120%);
      }
    }

    .thumbnail {
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      overflow: hidden;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: all 0.3s ease-out;
      }
    }

    .tag-list {
      display: flex;
      gap: 0.5rem;
    }
  }
`;
