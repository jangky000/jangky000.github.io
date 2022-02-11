import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { FC } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import postlist from '@jsons/posts.json';
import { Header } from '@components/organisms/Header';
import { Footer } from '@components/organisms/Footer';
import styles from '@styles/Posts.module.scss';
import { removeSpace } from '@lib/utf8';

const StyledPostLayout = styled.main`
  label: post-layout;

  margin: 30px auto;
  max-width: 850px;
  width: 80%;

  img {
    width: 100%;
  }

  .desc {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.green};
    padding: 20px;
    margin: 20px auto;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.1rem;
  }
`;

const CodeBlock = ({ language, value }: any) => (
  <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>
);

const Posts: FC = ({ postInfo }: any) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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
        {/* <meta property="og:image" content="" /> */}
        <meta property="og:description" content={postInfo.desc} />
        <meta property="og:site_name" content="FE 블로그 | @jangky000" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:width" content="316" />
        <meta property="og:image:height" content="562" />

        {/* 트위터 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={postInfo.title} />
        <meta name="twitter:description" content={postInfo.desc} />
        {/* <meta name="twitter:image" content="" /> */}
      </Head>

      <Header />

      <StyledPostLayout>
        <div>
          <h2>{postInfo.title}</h2>
        </div>
        <small>
          {postInfo.date} 작성 / @{postInfo.author}
        </small>
        <hr />
        <div className="desc">{postInfo.desc}</div>
        <ReactMarkdown
          escapeHtml={false}
          source={postInfo.content}
          renderers={{ code: CodeBlock }}
        />
      </StyledPostLayout>

      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const pathList = postlist.map(post => ({
    params: { title: removeSpace(post.title) },
  }));
  return {
    paths: pathList,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { title } = context.params;
  const post = postlist.find(item => removeSpace(item.title) === title);
  return {
    props: { postInfo: post },
  };
}

export default Posts;
