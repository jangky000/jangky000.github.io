import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import Seo from '@components/Seo';
import { ReactNode } from 'react';
import { StyledGalleryListLayout } from './style';

interface Props {
  children: ReactNode;
}
function GalleryListLayout({ children }: Props) {
  return (
    <StyledGalleryListLayout>
      <Seo />
      <Header />
      <div className="gallery-list-content">{children}</div>
      <Footer />
    </StyledGalleryListLayout>
  );
}

export default GalleryListLayout;
