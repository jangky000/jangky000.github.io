import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { StyledPostLayout } from '@styles/posts/style';
import postlist from '@jsons/posts.json';
import { Header } from '@components/organisms/Header';
import { Footer } from '@components/organisms/Footer';
import styles from '@styles/Posts.module.scss';
import { removeSpace } from '@lib/utf8';
import { Post } from 'types/post';

interface PostsProps {
  postInfo: Post;
}

function Posts({ postInfo }: PostsProps): ReactElement {
  const router = useRouter();

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
}

export async function getStaticPaths() {
  const pathList = postlist.map(post => ({
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
  const title = context.params?.title || '';
  const post = postlist.find(item => removeSpace(item.title) === title);
  return {
    props: { postInfo: post },
  };
}

export default Posts;
