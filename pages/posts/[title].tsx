import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { FC } from 'react';
import postlist from '../../jsons/posts.json';
import { Header } from '../../components/organisms/Header';
import { Footer } from '../../components/organisms/Footer';
import styles from '../../styles/Posts.module.scss';
import { encodeURL, removeSpace } from '../../lib/utf8';

const CodeBlock = ({ language, value }:any) => (
  <SyntaxHighlighter language={language}>
    {value}
  </SyntaxHighlighter>
);

const Posts:FC = ({ post }: any) => (
  <div className={styles.container}>
    <Head>
      <title>FE 블로그 | @jangky000</title>
      <meta name="title" content="FE 블로그 | @jangky000" />
      <meta name="keywords" content="FE, ReactJS, NextJS, javascript, typescript" />
      <meta name="description" content="FE 개발자로 일하면서 겪은 경험담을 정리합니다." />
      <meta httpEquiv="Title" content="FE 블로그" />
      <meta httpEquiv="Subject" content="FE 개발자로 일하면서 겪은 경험담을 정리합니다." />

      {/* 기본 설정, 구글, 페이스북, 네이버, 카카오 ... */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jangky000.github.io/blog" />
      <meta property="og:title" content="FE 블로그 | @jangky000" />
      {/* <meta property="og:image" content="" /> */}
      <meta property="og:description" content="FE 개발자로 일하면서 겪은 경험담을 정리합니다." />
      <meta property="og:site_name" content="FE 블로그 | @jangky000" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="316" />
      <meta property="og:image:height" content="562" />

      {/* 트위터 */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="FE 블로그 | @jangky000" />
      <meta name="twitter:description" content="FE 개발자로 일하면서 겪은 경험담을 정리합니다." />
      {/* <meta name="twitter:image" content="" /> */}

    </Head>

    <Header />

    <main className={styles.main}>
      <div>
        <h2>{post.title}</h2>
      </div>
      <small>
        {post.date}
        {' '}
        발행.
        {' '}
        @
        {' '}
        {post.author}
      </small>
      <hr />
      <ReactMarkdown
        escapeHtml={false}
        source={post.content}
        renderers={{ code: CodeBlock }}
      />
    </main>

    <Footer />
  </div>
);

export async function getStaticPaths() {
  const pathList = postlist.map((post) => ({ params: { title: encodeURL(post.title.replace(/[\r,\n]/g, '')) } }));
  return {
    paths: pathList,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context:any) {
  const { title } = context.params;
  const post = postlist.find((item) => removeSpace(item.title) === decodeURIComponent(title));
  return {
    props: { post },
  };
}

export default Posts;
