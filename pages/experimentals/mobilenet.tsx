import Mobilenet from '@components/Mobilenet';
import Seo from '@components/Seo';
import { NoSsr } from '@mui/material';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'mobilenet',
  title: '이미지 분류',
  tagList: ['Tensorflow.js', 'mobilenet'],
  desc: '이미지 분류 예제',
};

function MobilenetPage(): ReactElement {
  return (
    <GalleryDetailLayout url="">
      <Seo seoInfo={meta} />
      <NoSsr>
        <Mobilenet />
      </NoSsr>
    </GalleryDetailLayout>
  );
}

export default MobilenetPage;
