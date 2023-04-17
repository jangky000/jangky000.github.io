import { Stack, styled } from '@mui/material';

export const StyledPostList = styled(Stack)`
  label: post-list;

  .post-item {
    display: flex;
    flex-direction: column;

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
