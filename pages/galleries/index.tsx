import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Grid } from '@material-ui/core';
import { StyledGalleryListLayout } from '@styles/galleries/style';
import { meta as d3Meta } from './d3Pie';

function GalleryList() {
  const renderList = () => {
    const list = [d3Meta, d3Meta, d3Meta, d3Meta, d3Meta];

    // const handleImgError = (e) => {
    //   e.target.src = '/favicon.ico';
    // };

    return (
      <Grid container spacing={1}>
        {list.map(item => (
          <Grid key={item.title} item xs={4} sm={3} md={2}>
            <div className="card">
              <img
                className="thumbnail"
                src={item.thumbnail}
                alt={item.title}
                // onError={handleImgError}
              />
              <div className="title">{item.title}</div>
            </div>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <Header />

      <StyledGalleryListLayout>{renderList()}</StyledGalleryListLayout>

      <Footer />
    </>
  );
}

export default GalleryList;
