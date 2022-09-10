import styled from '@emotion/styled';
import DIMENS from '@styles/dimens';

export const StyledLayout = styled.div`
  label: common-layout;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;

  .content-area {
    flex: 1;
    margin: 20px auto;
    max-width: ${DIMENS.CONTENT_MAX_WIDTH};
    width: ${DIMENS.CONTENT_WIDTH};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
