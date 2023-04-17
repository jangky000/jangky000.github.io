import styled from '@emotion/styled';
import DIMENS from '@styles/dimens';

export const StyledAnchorList = styled.ul`
  list-style: none;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;

  display: grid;
  // 좁은 화면
  @media (max-width: ${DIMENS.BREAK_POINTS.md}px) {
    grid-template-columns: minmax(0, 1fr);
  }
  // 넓은 화면
  @media (min-width: ${DIMENS.BREAK_POINTS.md}px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
  gap: 0.5rem;

  li {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    &:hover {
      cursor: pointer;
      color: #77f;
    }
  }
`;
