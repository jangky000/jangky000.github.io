import Card from '@components/Card';
import { Grid } from '@material-ui/core';
import GalleryListLayout from 'layouts/GalleryListLayout';
import Link from 'next/link';
import { meta as cocoSsdMeta } from './coco-ssd';
import { meta as mobilenetMeta } from './mobilenet';

function ExperimentalList() {
  const list = [mobilenetMeta, cocoSsdMeta];

  return (
    <GalleryListLayout>
      <Grid container spacing={1}>
        {list.map(item => (
          <Grid key={item.title} item xs={6} sm={4} md={3}>
            <Link href={`/experimentals/${item.subUrl}`}>
              <Card {...item} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </GalleryListLayout>
  );
}

export default ExperimentalList;
