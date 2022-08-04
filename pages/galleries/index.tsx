import { Footer } from '@components/Footer';
import { GNB } from '@components/GNB';
import { Header } from '@components/Header';
import Seo from '@components/Seo';
import { Grid } from '@material-ui/core';
import { StyledGalleryListLayout } from '@styles/galleries/style';
import Link from 'next/link';
import { meta as d3Meta } from './d3Pie';

function GalleryList() {
  const renderList = () => {
    const list = [d3Meta];

    // const handleImgError = (e) => {
    //   e.target.src = '/favicon.ico';
    // };

    return (
      <Grid container spacing={1}>
        {list.map(item => (
          <Grid key={item.title} item xs={6} sm={4} md={3}>
            <div className="card">
              <Link href={`/galleries/${item.subUrl}`}>
                <a>
                  <div className="thumbnail">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      // onError={handleImgError}
                    />
                  </div>
                  <div className="title">{item.title}</div>
                </a>
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <Seo />
      <GNB />
      <Header />
      <StyledGalleryListLayout>{renderList()}</StyledGalleryListLayout>
      <Footer />
    </>
  );
}

export default GalleryList;
