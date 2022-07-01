import styled from '@emotion/styled';
import DIMENS from '@styles/dimens';

export const StyledGNB = styled.div`
  label: gnb;

  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  margin: 0 auto;
  width: ${DIMENS.CONTENT_WIDTH};
  max-width: ${DIMENS.CONTENT_MAX_WIDTH};

  a {
    font-size: 0.8rem;
    color: #333;

    :hover,
    :focus,
    :active {
      color: #777;
    }
  }
`;
