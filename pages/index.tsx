import AnchorList from '@components/AnchorList';
import { Footer } from '@components/Footer';
import { GNB } from '@components/GNB';
import { Header } from '@components/Header';
import Seo from '@components/Seo';
import SubTitle from '@components/SubTitle';
import VisitCelebration from '@components/VisitCelebration';
import {
  canVisitPopup,
  readAndUpdateVisitCount,
} from '@libs/experimentalVisit';
import { getFeNews } from '@libs/feNews';
import { Divider, Stack } from '@mui/material';
import { StyledHomeLayout } from '@styles/home/style';
import styles from '@styles/Index.module.scss';
import useToggle from 'hooks/useToggle';
import Link from 'next/link';
import { ReactElement, useEffect } from 'react';
import { GalleryListSection } from './galleries';
import { PostListSection } from './posts';

interface Props {
  urls: string[];
}

const Home = ({ urls }: Props): ReactElement => {
  const { isOn, on } = useToggle();
  useEffect(() => {
    const visitCount = readAndUpdateVisitCount();
    if (canVisitPopup(visitCount)) on();
  }, []);
  return (
    <div className={styles.container}>
      <Seo usePersonRichSnippet />
      <GNB />
      <Header />
      <StyledHomeLayout>
        <Stack spacing={4}>
          <div className="postlist">
            <Link href="/posts">
              <SubTitle>Posts</SubTitle>
            </Link>
            <PostListSection />
          </div>
          <Divider />
          <div className="galleries">
            <Link href="/galleries">
              <SubTitle>Galleries</SubTitle>
            </Link>
            <GalleryListSection />
          </div>
          <Divider />
          <div>
            <SubTitle>FE News</SubTitle>
            <AnchorList urls={urls.slice(0, 10)} />
          </div>
        </Stack>
      </StyledHomeLayout>
      <Footer />
      <VisitCelebration isOpen={isOn} />
    </div>
  );
};

export async function getStaticProps() {
  const urls = await getFeNews();
  return {
    props: { urls },
  };
}

export default Home;
