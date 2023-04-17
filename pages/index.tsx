import AnchorList from '@components/AnchorList';
import { Footer } from '@components/Footer';
import { GNB } from '@components/GNB';
import { Header } from '@components/Header';
import PostList from '@components/PostList';
import Seo from '@components/Seo';
import SubTitle from '@components/SubTitle';
import VisitCelebration from '@components/VisitCelebration';
import { useTheme } from '@emotion/react';
import {
  canVisitPopup,
  readAndUpdateVisitCount,
} from '@libs/experimentalVisit';
import { getFeNews } from '@libs/feNews';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Divider, Stack, Tab } from '@mui/material';
import { StyledHomeLayout } from '@styles/home/style';
import styles from '@styles/Index.module.scss';
import usePostList from 'hooks/usePostList';
import useToggle from 'hooks/useToggle';
import { ReactElement, useEffect, useState } from 'react';
import { GalleryListSection } from './galleries';

interface Props {
  urls: string[];
}

const Home = ({ urls }: Props): ReactElement => {
  const theme = useTheme();
  const postList = usePostList();
  const reviewList = postList.filter(
    post => post.category.indexOf('업무 회고') > -1,
  );
  const etcList = postList.filter(post => post.category.indexOf('기타') > -1);
  const [value, setValue] = useState('1');
  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
  };
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
            <SubTitle>Posts</SubTitle>
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                aria-label="post tab list"
                TabIndicatorProps={{
                  style: { background: theme.colors.dark },
                }}
              >
                <Tab label={`모든 게시글(${postList.length})`} value="1" />
                <Tab label={`업무 회고(${reviewList.length})`} value="2" />
                <Tab label={`기타(${etcList.length})`} value="3" />
              </TabList>
              <TabPanel value="1">
                <PostList postList={postList} />
              </TabPanel>
              <TabPanel value="2">
                <PostList postList={reviewList} />
              </TabPanel>
              <TabPanel value="3">
                <PostList postList={etcList} />
              </TabPanel>
            </TabContext>
          </div>
          <Divider />
          <div className="galleries">
            <SubTitle>Galleries</SubTitle>
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
