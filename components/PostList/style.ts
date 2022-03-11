import styled from '@emotion/styled';

export const StyledPostList = styled.div`
  label: post-list;

  .post-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    h2 {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    small {
      align-self: flex-end;
      margin-left: 0.5rem;
    }

    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #777;
    }
  }
`;
