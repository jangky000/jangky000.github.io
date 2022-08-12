import Card from '@components/Card';
import { Grid } from '@material-ui/core';
import GalleryListLayout from 'layouts/GalleryListLayout';
import Link from 'next/link';
import { meta as d3Meta } from './d3Pie';

function GalleryList() {
  const list = [d3Meta];

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
