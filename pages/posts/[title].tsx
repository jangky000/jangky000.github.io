import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { FC } from 'react';
import postlist from '../../jsons/posts.json';
import { Header } from '../../components/organisms/Header';
import { Footer } from '../../components/organisms/Footer';
import styles from '../../styles/Posts.module.scss';

const CodeBlock = ({ language, value }:any) => (
  <SyntaxHighlighter language={language}>
    {value}
  </SyntaxHighlighter>
);

const getPost = (title: string | string[] | undefined) => {
  const initPost = {
    id: 0,
    title: '제목 없음',
    date: '알 수 없음',
    author: 'jangky000',
    content: '내용 없음',
  };

  if (typeof title !== 'string') return initPost;
  if (!Array.isArray(postlist) && typeof title === 'string') return initPost;

  const decodedTitle = decodeURIComponent(title);

  const currentPost = postlist.find(
    (post) => post.title.replace('\r', '') === decodedTitle.replace(/-/g, ' '),
  );
  const fetchedPost = { ...initPost, ...currentPost };
  return fetchedPost;
};

const Posts:FC = () => {
  const router = useRouter();
  const { title } = router.query;
  const fetchedPost = getPost(title);

  return (
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
          <h2>{fetchedPost.title}</h2>
        </div>
        <small>
          {fetchedPost.date}
          {' '}
          발행.
          {' '}
          @
          {' '}
          {fetchedPost.author}
        </small>
        <hr />
        <ReactMarkdown
          escapeHtml={false}
          source={fetchedPost.content}
          renderers={{ code: CodeBlock }}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Posts;
