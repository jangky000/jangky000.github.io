import HorizontalBarChart from '@components/HorizontalBarChart';
import Seo from '@components/Seo';
import { CONFIGS } from 'configs';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'd3-horizontal-bar-chart',
  title: '가로형 바 차트',
  tagList: ['React', 'D3.js', 'SVG'],
  desc: 'React D3 가로형 바 차트',
  thumbnail:
    'https://user-images.githubusercontent.com/46799722/184296969-de0542a3-d093-45c6-882f-579429cc6656.png',
  code: `${CONFIGS.githubComponentPath}/HorizontalBarChart/index.tsx`,
};

function D3HorizontalBarChart(): ReactElement {
  return (
    <GalleryDetailLayout url={meta.code}>
      <Seo seoInfo={meta} />
      <HorizontalBarChart />
    </GalleryDetailLayout>
  );
}

export default D3HorizontalBarChart;
