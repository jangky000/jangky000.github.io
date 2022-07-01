import PieChart from '@components/PieChart';
import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

function D3Pie(): ReactElement {
  return (
    <GalleryDetailLayout>
      <PieChart />
    </GalleryDetailLayout>
  );
}

export const meta = {
  subUrl: 'd3Pie',
  title: 'd3.js pie 그래프',
  thumbnail:
    'https://user-images.githubusercontent.com/46799722/176882471-f396607f-929e-40e1-8057-09892b403db7.png',
};

export default D3Pie;
