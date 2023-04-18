import { Footer } from '@components/Footer';
import { GNB } from '@components/GNB';
import { Header } from '@components/Header';
import { Label } from '@components/Label';
import { ReactNode } from 'react';
import { Utterances } from 'utterances-react-component';
import { StyledGalleryDetailLayout } from './style';

interface Props {
  url: string;
  children: ReactNode;
}
function GalleryDetailLayout({ url, children }: Props) {
  return (
    <>
      <StyledGalleryDetailLayout>
        <GNB />
        <Header />
        <div className="gallery-content">{children}</div>
        <div className="gallery-reference">
          <Label label="reference">Source code</Label>
          <a href={url}>{url}</a>
        </div>
      </StyledGalleryDetailLayout>
      <Utterances
        repo="jangky000/jangky000.github.io"
        theme="github-light"
        issueTerm="pathname"
      />
      <Footer />
    </>
  );
}

export default GalleryDetailLayout;
