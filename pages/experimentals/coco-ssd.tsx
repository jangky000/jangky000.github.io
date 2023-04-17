import CocoSsd from '@components/CocoSsd';
import Seo from '@components/Seo';
import { NoSsr } from '@mui/material';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'coco-ssd',
  title: '객체 인식',
  tagList: ['Tensorflow.js', 'coco-ssd'],
  desc: '객체 인식 예제',
};

function CocoSsdPage(): ReactElement {
  return (
    <GalleryDetailLayout url="">
      <Seo seoInfo={meta} />
      <NoSsr>
        <CocoSsd />
      </NoSsr>
    </GalleryDetailLayout>
  );
}

export default CocoSsdPage;
