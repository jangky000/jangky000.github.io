import NightSky from '@components/NightSky';
import Seo from '@components/Seo';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'night-sky',
  title: '밤 하늘',
  tagList: ['React', 'css'],
  desc: 'css 밤 하늘 애니메이션',
  thumbnail:
    'https://user-images.githubusercontent.com/46799722/189194421-77b2f7fe-6716-435f-9510-7a5971efbe91.png',
  code: 'https://github.com/jangky000/jangky000.github.io/blob/main/components/NightSky/index.tsx',
};

function NightSkyPage(): ReactElement {
  return (
    <GalleryDetailLayout url={meta.code}>
      <Seo seoInfo={meta} />
      <NightSky />
    </GalleryDetailLayout>
  );
}

export default NightSkyPage;
