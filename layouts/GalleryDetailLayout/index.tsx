import { Footer } from '@components/Footer';
import { GNB } from '@components/GNB';
import { Header } from '@components/Header';
import { ReactElement } from 'react';
import { Utterances } from 'utterances-react-component';
import { StyledGalleryDetailLayout } from './style';

interface Props {
  children: ReactElement;
}
function GalleryDetailLayout({ children }: Props) {
  return (
    <StyledGalleryDetailLayout>
      <GNB />

      <Header />

      <div className="gallery-content">{children}</div>

      <Utterances
        repo="jangky000/jangky000.github.io"
        theme="github-light"
        issueTerm="pathname"
      />
      <Footer />
    </StyledGalleryDetailLayout>
  );
}

export default GalleryDetailLayout;
