import PieChart from '@components/PieChart';
import Seo from '@components/Seo';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

export const meta = {
  subUrl: 'd3Pie',
  title: '라벨이 있는 파이 차트',
  tagList: ['React', 'D3.js', 'SVG'],
  desc: 'React D3 라벨이 있는 파이 차트',
  thumbnail:
    'https://user-images.githubusercontent.com/46799722/176882471-f396607f-929e-40e1-8057-09892b403db7.png',
  code: 'https://github.com/jangky000/jangky000.github.io/blob/main/components/PieChart/index.tsx',
};

function D3Pie(): ReactElement {
  return (
    <GalleryDetailLayout url={meta.code}>
      <Seo seoInfo={meta} />
      <PieChart />
    </GalleryDetailLayout>
  );
}

export default D3Pie;
