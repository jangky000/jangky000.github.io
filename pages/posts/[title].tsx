import { Footer } from '@components/Footer';
import { GNB } from '@components/GNB';
import { Header } from '@components/Header';
import Seo from '@components/Seo';
import styles from '@styles/Posts.module.scss';
import { StyledPostLayout } from '@styles/posts/style';
import usePostList from 'hooks/usePostList';
import { removeSpace } from 'libs/utf8';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { animated, useSpring } from 'react-spring';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Post } from 'types/post';
import { Utterances } from 'utterances-react-component';

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
      <Seo seoInfo={postInfo} />

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
