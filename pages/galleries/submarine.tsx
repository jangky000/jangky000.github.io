import Seo from '@components/Seo';
import Submarine from '@components/Submarine';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'submarine',
  title: '잠수함',
  tagList: ['React', 'css'],
  desc: 'css 잠수함 애니메이션',
  thumbnail:
    'https://user-images.githubusercontent.com/46799722/194462003-02369f50-2d27-448f-b989-e1e357ff9650.png',
  code: 'https://github.com/jangky000/jangky000.github.io/blob/main/components/Submarine/index.tsx',
};

function SubmarinePage(): ReactElement {
  return (
    <GalleryDetailLayout url={meta.code}>
      <Seo seoInfo={meta} />
      <Submarine />
    </GalleryDetailLayout>
  );
}

export default SubmarinePage;
