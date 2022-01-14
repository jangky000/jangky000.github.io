import styled from '@emotion/styled';
import router from 'next/router';

const StyledLayout = styled.div`
  label: 404-layout;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Custom404() {
  return <StyledLayout>404 - Page Not Found</StyledLayout>;
}
