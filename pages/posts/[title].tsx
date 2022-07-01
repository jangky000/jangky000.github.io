import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { animated, useSpring } from 'react-spring';
import { StyledPostLayout } from '@styles/posts/style';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import styles from '@styles/Posts.module.scss';
import { removeSpace } from 'libs/utf8';
import { Post } from 'types/post';
import usePostList from 'hooks/usePostList';
import { Utterances } from 'utterances-react-component';
import { GNB } from '@components/GNB';

interface PostsProps {
  postInfo: Post;
}

const Posts = ({ postInfo }: PostsProps): ReactElement => {
  const router = useRouter();
  const fadeInStyle = useSpring({ opacity: 1, from: { opacity: 0 } });

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const CodeBlock = ({ language, value }: any) => (
    <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>FE 블로그 | @jangky000</title>
        <meta name="title" content={postInfo.title} />
        <meta
          name="keywords"
          content="FE, ReactJS, NextJS, javascript, typescript"
        />
        <meta name="description" content={postInfo.desc} />
        <meta httpEquiv="Title" content={postInfo.title} />
        <meta httpEquiv="Subject" content={postInfo.title} />

        {/* 기본 설정, 구글, 페이스북, 네이버, 카카오 ... */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jangky000.github.io" />
        <meta property="og:title" content={postInfo.title} />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
        />
        <meta property="og:description" content={postInfo.desc} />
        <meta property="og:site_name" content="FE 블로그 | @jangky000" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:width" content="316" />
        <meta property="og:image:height" content="562" />

        {/* 트위터 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={postInfo.title} />
        <meta name="twitter:description" content={postInfo.desc} />
        <meta
          name="twitter:image"
          content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
        />
      </Head>

      <GNB />

      <Header />

      <animated.div style={fadeInStyle}>
        <StyledPostLayout>
          <div>
            <h2>{postInfo.title}</h2>
          </div>
          <small>
            {postInfo.date} 작성 / @{postInfo.author}
          </small>
          <hr />
          <div className="post-desc">{postInfo.desc}</div>
          <div className="post-contents">
            <ReactMarkdown
              escapeHtml={false}
              source={postInfo.content}
              renderers={{ code: CodeBlock }}
            />
          </div>
        </StyledPostLayout>
      </animated.div>

      <Utterances
        repo="jangky000/jangky000.github.io"
        theme="github-light"
        issueTerm="pathname"
      />
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const postList = usePostList();
  const pathList = postList.map(post => ({
    params: { title: removeSpace(post.title) },
  }));
  return {
    paths: pathList,
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ title: string }>,
) {
  const postList = usePostList();
  const title = context.params?.title || '';
  const post = postList.find(item => removeSpace(item.title) === title);
  return {
    props: { postInfo: post },
  };
}

export default Posts;
