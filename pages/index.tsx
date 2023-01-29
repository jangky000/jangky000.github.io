import { Footer } from '@components/Footer';
import { GNB } from '@components/GNB';
import { Header } from '@components/Header';
import PostList from '@components/PostList';
import Seo from '@components/Seo';
import { useTheme } from '@emotion/react';
import { getFeNewsRss } from '@libs/rss';
import { Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { StyledHomeLayout } from '@styles/home/style';
import styles from '@styles/Index.module.scss';
import usePostList from 'hooks/usePostList';
import { ReactElement, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

interface Props {
  rss: any;
}

const Home = ({ rss }: Props): ReactElement => {
  const theme = useTheme();
  const fadeInStyle = useSpring({ opacity: 1, from: { opacity: 0 } });
  const postList = usePostList();
  const reviewList = postList.filter(
    post => post.category.indexOf('업무 회고') > -1,
  );
  const etcList = postList.filter(post => post.category.indexOf('기타') > -1);

  const [value, setValue] = useState('1');
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(rss);
  }, [rss]);

  return (
    <div className={styles.container}>
      <Seo />

      <GNB />

      <Header />

      <animated.div style={fadeInStyle}>
        <StyledHomeLayout>
          <div>
            <div className="postlist">
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
          </div>
        </StyledHomeLayout>
      </animated.div>

      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const feNewsRss = await getFeNewsRss();
  const items = feNewsRss.items ?? [];

  return {
    props: { rss: items },
  };
}

export default Home;
