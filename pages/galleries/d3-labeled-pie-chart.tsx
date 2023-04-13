import LabeledPieChart from '@components/LabeledPieChart';
import Seo from '@components/Seo';
import { CONFIGS } from 'configs';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'd3-labeled-pie-chart',
  title: '라벨이 있는 파이 차트',
  tagList: ['React', 'D3.js', 'SVG'],
  desc: 'React D3 라벨이 있는 파이 차트',
  thumbnail:
    'https://user-images.githubusercontent.com/46799722/176882471-f396607f-929e-40e1-8057-09892b403db7.png',
  code: `${CONFIGS.githubComponentPath}/LabeledPieChart/index.tsx`,
};

function D3LabeledPieChart(): ReactElement {
  return (
    <GalleryDetailLayout url={meta.code}>
      <Seo seoInfo={meta} />
      <LabeledPieChart />
    </GalleryDetailLayout>
  );
}

export default D3LabeledPieChart;
