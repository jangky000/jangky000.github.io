import styled from '@emotion/styled';

export const StyledAnchorList = styled.ul`
  list-style: none;
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-start;

  li {
    padding: 0.5rem 1rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    &:hover {
      cursor: pointer;
      color: #77f;
    }
  }
`;

export const StyledGithubIcon = styled.div`
  label: styled-github-icon;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.1rem;

  img {
    width: 1rem;
    height: 1rem;
  }

  .title {
    font-weight: bold;
  }
`;
