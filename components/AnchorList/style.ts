import styled from '@emotion/styled';
import { theme } from '@theme/theme';

export const StyledAnchorList = styled.ul`
  list-style: none;
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  flex-wrap: wrap;
  justify-content: space-around;

  li {
    padding: 0.5rem 1rem;
    flex-shrink: 0;
    background-color: ${theme.colors.green};
    color: #fff;
    border-radius: 0.5rem;
  }
`;
