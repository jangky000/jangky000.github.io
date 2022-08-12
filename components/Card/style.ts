import styled from '@emotion/styled';

export const StyledCard = styled.div`
  label: card;

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
`;
