import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { ReactElement, ReactNode } from 'react';
import { StyledLayout } from './style';

interface Props {
  children: ReactNode;
}
function CommonLayout({ children }: Props): ReactElement {
  return (
    <StyledLayout>
      <Header />
      <div className="content-area">{children}</div>
      <Footer />
    </StyledLayout>
  );
}

export default CommonLayout;
