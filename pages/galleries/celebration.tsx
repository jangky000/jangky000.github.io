import Seo from '@components/Seo';
import { CONFIGS } from 'configs';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'celebration',
  title: 'celebration',
  tagList: ['React', 'css'],
  desc: 'css celebration',
  thumbnail: '',
  code: CONFIGS.githubComponentPath,
};

function CelebrationPage(): ReactElement {
  return (
    <GalleryDetailLayout url={meta.code}>
      <Seo seoInfo={meta} />
      {/* TODO: Add Celebration */}
    </GalleryDetailLayout>
  );
}

export default CelebrationPage;
