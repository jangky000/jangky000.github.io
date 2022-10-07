import Card from '@components/Card';
import { Grid } from '@material-ui/core';
import GalleryListLayout from 'layouts/GalleryListLayout';
import Link from 'next/link';
import { meta as d3HorizontalBarChartMeta } from './d3-horizontal-bar-chart';
import { meta as d3LabeledPieChartMeta } from './d3-labeled-pie-chart';
import { meta as nightSkyMeta } from './night-sky';
import { meta as SubmarineMeta } from './submarine';

function GalleryList() {
  const list = [
    d3LabeledPieChartMeta,
    d3HorizontalBarChartMeta,
    nightSkyMeta,
    SubmarineMeta,
  ];

  return (
    <GalleryListLayout>
      <Grid container spacing={1}>
        {list.map(item => (
          <Grid key={item.title} item xs={6} sm={4} md={3}>
            <Link href={`/galleries/${item.subUrl}`}>
              <a>
                <Card {...item} />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </GalleryListLayout>
  );
}

export default GalleryList;
