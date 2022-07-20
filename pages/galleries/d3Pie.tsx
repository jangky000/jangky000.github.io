import PieChart from '@components/PieChart';
import Seo from '@components/Seo';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import Head from 'next/head';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'd3Pie',
  title: '파이 차트',
  desc: 'd3.js를 활용하여 파이 차트 만들기',
  thumbnail:
    'https://user-images.githubusercontent.com/46799722/176882471-f396607f-929e-40e1-8057-09892b403db7.png',
};

function D3Pie(): ReactElement {
  return (
    <GalleryDetailLayout>
      <Head>
        <Seo seoInfo={meta} />
      </Head>

      <PieChart />
    </GalleryDetailLayout>
  );
}

export default D3Pie;
