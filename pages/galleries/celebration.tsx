import Celebration from '@components/Celebration';
import Seo from '@components/Seo';
import { CONFIGS } from 'configs';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'celebration',
  title: 'celebration',
  tagList: ['React', 'css'],
  desc: 'css celebration',
  thumbnail:
    'https://user-images.githubusercontent.com/46799722/231747774-9a913dd4-cf86-4e86-a649-1a0630af7aab.png',
  code: `${CONFIGS.githubComponentPath}/Celebration/index.tsx`,
};

function CelebrationPage(): ReactElement {
  return (
    <GalleryDetailLayout url={meta.code}>
      <Seo seoInfo={meta} />
      <Celebration />
    </GalleryDetailLayout>
  );
}

export default CelebrationPage;
