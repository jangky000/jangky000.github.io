import Seo from '@components/Seo';
import Submarine from '@components/Submarine';
import { CONFIGS } from 'configs';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'submarine',
  title: '잠수함',
  tagList: ['React', 'css'],
  desc: 'css 잠수함 애니메이션',
  thumbnail:
    'https://user-images.githubusercontent.com/46799722/194462003-02369f50-2d27-448f-b989-e1e357ff9650.png',
  code: `${CONFIGS.githubComponentPath}/Submarine/index.tsx`,
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
