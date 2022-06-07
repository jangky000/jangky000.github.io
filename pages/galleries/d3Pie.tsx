import GalleryDetailLayout from 'layouts/GalleryDetailLayout';
import { ReactElement } from 'react';

function D3Pie(): ReactElement {
  return (
    <GalleryDetailLayout>
      <>d3 pie</>
    </GalleryDetailLayout>
  );
}

export const meta = {
  title: 'd3.js pie 그래프',
  thumbnail: '/',
};

export default D3Pie;
