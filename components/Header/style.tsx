import styled from '@emotion/styled';
import DIMENS from '@styles/dimens';
import Link from 'next/link';
import css from 'styled-jsx/css';

export const style = css`
  .wrapper {
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    height: 140px;
    justify-content: center;
    padding: 0 16px;
    position: relative;
    margin: 0 auto;
    width: ${DIMENS.CONTENT_WIDTH};
    max-width: ${DIMENS.CONTENT_MAX_WIDTH};
  }

  .lottie-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
  }

  .title {
    margin-bottom: 12px;
    z-index: 1;
  }

  b {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .desc {
    color: #333;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  a {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export const HomeLink = styled(Link)({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
});
