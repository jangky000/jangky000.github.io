import { Footer } from '@components/Footer';
import { GNB } from '@components/GNB';
import { Header } from '@components/Header';
import { ReactElement, ReactNode } from 'react';
import { StyledLayout } from './style';

interface Props {
  children: ReactNode;
}
function CommonLayout({ children }: Props): ReactElement {
  return (
    <StyledLayout>
      <GNB />
      <Header />
      <div className="content-area">{children}</div>
      <Footer />
    </StyledLayout>
  );
}

export default CommonLayout;
