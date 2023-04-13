import AnchorList from '@components/AnchorList';
import { Footer } from '@components/Footer';
import { GNB } from '@components/GNB';
import { Header } from '@components/Header';
import PostList from '@components/PostList';
import Seo from '@components/Seo';
import SubTitle from '@components/SubTitle';
import { useTheme } from '@emotion/react';
import { getFeNews } from '@libs/feNews';
import { Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { StyledHomeLayout } from '@styles/home/style';
import styles from '@styles/Index.module.scss';
import usePostList from 'hooks/usePostList';
import { ReactElement, useState } from 'react';

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
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <Seo usePersonRichSnippet />

      <GNB />

      <Header />

      <StyledHomeLayout>
        <div>
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

          <div>
            <SubTitle>FE News</SubTitle>
            <AnchorList urls={urls} />
          </div>
        </div>
      </StyledHomeLayout>

      <Footer />
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
