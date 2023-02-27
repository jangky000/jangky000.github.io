import styled from '@emotion/styled';
import Link from 'next/link';

export const GithubLink = styled(Link)`
  label: github-link;

  .url {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const GithubIcon = styled.div`
  label: github-icon;
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
