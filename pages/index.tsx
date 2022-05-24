import Head from 'next/head';
import { useState, ReactElement } from 'react';
import { StyledHomeLayout } from '@styles/home/style';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import styles from '@styles/Index.module.scss';
import { animated, useSpring } from 'react-spring';
import PostList from '@components/PostList';
import usePostList from 'hooks/usePostList';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Tab } from '@material-ui/core';
import { useTheme } from '@emotion/react';

const Home = (): ReactElement => {
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

  return (
    <div className={styles.container}>
      <Head>
        <title>FE 블로그 | @jangky000</title>
        <meta name="title" content="FE 블로그 | @jangky000" />
        <meta
          name="keywords"
          content="FE, ReactJS, NextJS, javascript, typescript"
        />
        <meta
          name="description"
          content="FE 개발자로 일하면서 겪은 경험담을 정리합니다."
        />
        <meta httpEquiv="Title" content="FE 블로그" />
        <meta
          httpEquiv="Subject"
          content="FE 개발자로 일하면서 겪은 경험담을 정리합니다."
        />

        {/* 기본 설정, 구글, 페이스북, 네이버, 카카오 ... */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jangky000.github.io" />
        <meta property="og:title" content="FE 블로그 | @jangky000" />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
        />
        <meta
          property="og:description"
          content="FE 개발자로 일하면서 겪은 경험담을 정리합니다."
        />
        <meta property="og:site_name" content="FE 블로그 | @jangky000" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:width" content="316" />
        <meta property="og:image:height" content="562" />

        {/* 트위터 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="FE 블로그 | @jangky000" />
        <meta
          name="twitter:description"
          content="FE 개발자로 일하면서 겪은 경험담을 정리합니다."
        />
        <meta
          name="twitter:image"
          content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
        />
      </Head>

      <Header />

      <animated.div style={fadeInStyle}>
        <StyledHomeLayout>
          <div className="introduce">
            <div>Welcome!</div>
            <div>FE 블로그 | @jangky000</div>
            <div>FE 개발자로 일하면서 겪은 경험담을 정리합니다.</div>
          </div>

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

export default Home;
