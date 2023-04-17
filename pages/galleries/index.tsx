import Card from '@components/Card';
import { Grid } from '@material-ui/core';
import GalleryListLayout from 'layouts/GalleryListLayout';
import Link from 'next/link';
import { meta as CelebrationMeta } from './celebration';
import { meta as d3HorizontalBarChartMeta } from './d3-horizontal-bar-chart';
import { meta as d3LabeledPieChartMeta } from './d3-labeled-pie-chart';
import { meta as nightSkyMeta } from './night-sky';
import { meta as SubmarineMeta } from './submarine';

export function GalleryListSection() {
  const metaList = [
    d3LabeledPieChartMeta,
    d3HorizontalBarChartMeta,
    nightSkyMeta,
    SubmarineMeta,
    CelebrationMeta,
  ];
  return (
    <Grid container spacing={1}>
      {metaList.map(item => (
        <Grid key={item.title} item xs={6} sm={4} md={3}>
          <Link href={`/galleries/${item.subUrl}`}>
            <Card {...item} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

function GalleryListPage() {
  return (
    <GalleryListLayout>
      <GalleryListSection />
    </GalleryListLayout>
  );
}

export default GalleryListPage;
